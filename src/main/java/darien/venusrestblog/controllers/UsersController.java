package darien.venusrestblog.controllers;


import darien.venusrestblog.data.User;
import darien.venusrestblog.data.UserRole;
import darien.venusrestblog.repository.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users", produces = "application/json")
public class UsersController {

    private final PasswordEncoder passwordEncoder;

    private final UsersRepository usersRepository;

    public UsersController(PasswordEncoder passwordEncoder, UsersRepository usersRepository) {
        this.passwordEncoder = passwordEncoder;
        this.usersRepository = usersRepository;
    }

    @GetMapping("")
    public List<User> fetchUsers() {
        return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> fetchUserById(@PathVariable long id) {
        Optional <User>  user = usersRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User" + id + " not found");
        }
        return user;
    }

    @GetMapping("/me")
    private Optional<User> fetchMe(OAuth2Authentication auth) {
        if(auth ==  null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login");
        }
        String username = auth.getName();
        User user = usersRepository.findByUsername(username);
        return Optional.of(user);
    }

    @PostMapping(path = "/create")
    private void createUser(@RequestBody User newUser){
        newUser.setRole(UserRole.USER);
        String password = newUser.getPassword();
        password = passwordEncoder.encode(password);
        newUser.setPassword(password);

        newUser.setCreatedAt(LocalDate.now());
        usersRepository.save(newUser);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
        updatedUser.setId(id);
        usersRepository.save(updatedUser);
    }

    @GetMapping("/username/{username}")
    private User fetchUserByUsername(@PathVariable String username) {
        return usersRepository.findByUsername(username);
    }

    @GetMapping("/email/{email}")
    private User fetchUserByEmail(@PathVariable String email) {
        return usersRepository.findByEmail(email);
    }

    @DeleteMapping ("/{id}")
    public void DeleteUserById(@PathVariable long id) {
        usersRepository.deleteById(id);
    }

    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 8, max = 20) @RequestParam String newPassword) {
        User  user = usersRepository.findById(id).get();
//        if(user == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id " + id + " not found");
//        }

        // compare old password with saved pw
        if(!user.getPassword().equals(oldPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Intruder!");
        }

        // validate new password
        if(newPassword.length() < 8 || newPassword.length() > 20) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "new password length must be at least 8 characters");
        }
        user.setPassword(newPassword);
        usersRepository.save(user);
    }
}
