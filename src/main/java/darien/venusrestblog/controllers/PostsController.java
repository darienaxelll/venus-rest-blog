package darien.venusrestblog.controllers;

import darien.venusrestblog.data.Category;
import darien.venusrestblog.data.Post;
import darien.venusrestblog.data.User;
import darien.venusrestblog.repository.CategoriesRepository;
import darien.venusrestblog.repository.PostsRepository;
import darien.venusrestblog.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping (value = "/api/posts", produces = "application/json")
public class PostsController {
    private final PostsRepository postsRepository;
    private final UsersRepository usersRepository;
    private CategoriesRepository categoriesRepository;

    @GetMapping("")
    public List<Post> fetchPosts() {
        return postsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        return postsRepository.findById(id);
    }

    @PostMapping(path = "")
    private void createPost(@RequestBody Post newPost, OAuth2Authentication auth){
        newPost.setCategories(new ArrayList<>());

        String username = auth.getName();
        User author = usersRepository.findByUsername(username);
        newPost.setAuthor(author);

        // use first 2 categories for the post by default
        Category cat1 = categoriesRepository.findById(1L).get();
        Category cat2 = categoriesRepository.findById(2L).get();

        newPost.getCategories().add(cat1);
        newPost.getCategories().add(cat2);

        postsRepository.save(newPost);
    }

    @PutMapping("/{id}")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id) {
        // in case id  is not in req body set it with path var id
        updatedPost.setId(id);
        postsRepository.save(updatedPost);
    }

    @DeleteMapping ("/{id}")
    public void DeletePostById(@PathVariable long id) {
        postsRepository.deleteById(id);
    }
}
