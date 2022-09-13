package darien.venusrestblog;


import darien.venusrestblog.data.User;
import darien.venusrestblog.data.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/users", produces = "application/json")
public class UsersController {

    private final List<User> users = new ArrayList<>(List.of(new User(1, "darienaxell", "darien.axell@icloud.com", "12345", LocalDate.now(), UserRole.ADMIN, new ArrayList<>())));
    private long nextId = 2;

    @GetMapping("")
    public List<User> fetchUsers() {
        return users;
    }

    @GetMapping("/{id}")
    public User fetchUserById(@PathVariable long id) {
        User user = findUserById(id);
        if (user == null) {
            throw new RuntimeException("Sorry I'm lost");
        }
        return user;
    }

    @GetMapping("/me")
    private User fetchMe() {
        return users.get(0);
    }

    private User findUserById(long id) {
        for (User user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    @PostMapping(path = "/create")
    private void createUser(@RequestBody User newUser){
        System.out.println(newUser);
        newUser.setId(nextId);
        nextId++;
        users.add(newUser);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User updatedUser, @PathVariable long id) {
        User user = findUserById(id);
        if(user == null) {
            System.out.println("User not found");
        } else {
            if(updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            return;
        }
        throw new RuntimeException("User not found");
    }

    @GetMapping("/username/{username}")
    private User fetchUserByUsername(@PathVariable String username) {
        User user = findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException();
        }
        return user;
    }

    private User findUserByUsername(String username) {
        for (User user: users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }

    @GetMapping("/email/{email}")
    private User fetchUserByEmail(@PathVariable String email) {
        User user = findUserByEmail(email);
        if (user == null) {
            throw new RuntimeException();
        }
        return user;
    }

    private User findUserByEmail(String email) {
        for (User user: users) {
            if (user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    @DeleteMapping ("/{id}")
    public void DeleteUserById(@PathVariable long id) {
        User user = findUserById(id);
        if (user != null) {
            users.remove(user);
            return;
        }
        throw new RuntimeException("Sorry I'm lost");
    }

    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 8, max = 20) @RequestParam String newPassword) {
        User user = findUserById(id);
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id " + id + " not found");
        }

        // compare old password with saved pw
        if(!user.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Intruder!");
        }

        // validate new password
        if(newPassword.length() < 8 || newPassword.length() > 20) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "new pw length must be at least 8 characters");
        }

        user.setPassword(newPassword);
    }
}
