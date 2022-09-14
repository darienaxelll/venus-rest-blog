package darien.venusrestblog.controllers;

import darien.venusrestblog.data.Post;
import darien.venusrestblog.repository.PostsRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping (value = "/api/posts", produces = "application/json")
public class PostsController {

    private final PostsRepository postsRepository;

    public PostsController(PostsRepository postRepository) {
        this.postsRepository = postRepository;
    }

    @GetMapping("")
    public List<Post> fetchPosts() {
        return postsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        return postsRepository.findById(id);
    }

    @PostMapping(path = "")
    private void createPost(@RequestBody Post newPost){
//        System.out.println(newPost);
//        newPost.setId(nextId);
//
//        User fakeAuthor = new User();
//        fakeAuthor.setId(1);
//        fakeAuthor.setUsername("darienaxell");
//        fakeAuthor.setEmail("darien.axell@icloud.com");
//        newPost.setAuthor(fakeAuthor);
//
//        nextId++;
//        posts.add(newPost);
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
