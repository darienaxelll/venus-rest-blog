package darien.venusrestblog;

import darien.venusrestblog.data.Post;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping (value = "/api/posts", produces = "application/json")
public class PostsController {

    private final List<Post> posts = new ArrayList<>();
    private long nextId = 1;

    @GetMapping("")
    public List<Post> fetchPosts() {
        return posts;
    }

    @GetMapping("/id")
    public Post fetchPostById(@PathVariable long id) {
        Post post = findPostById(id);
        if (post == null) {
            throw new RuntimeException("Sorry I'm lost");
        }
        return post;
    }

    private Post findPostById(long id) {
        for (Post post: posts) {
            if (post.getId() == id) {
                return post;
            }
        }
        return null;
    }

    @PostMapping(path = "")
    private void createPost(@RequestBody Post newPost){
        System.out.println(newPost);
        newPost.setId(nextId);
        nextId++;
        posts.add(newPost);
    }

    @PutMapping("/{id}")
    public void updatePost(@RequestBody Post updatedPost, @PathVariable long id) {
        Post post = findPostById(id);
        if(post == null) {
            System.out.println("Post not found");
        } else {
            if(updatedPost.getTitle() != null) {
                post.setTitle(updatedPost.getTitle());
            }
            if(updatedPost.getContent() != null) {
                post.setContent(updatedPost.getContent());
            }
            return;
        }
        throw new RuntimeException("Post not found");
    }

    @DeleteMapping ("/{id}")
    public void DeletePostById(@PathVariable long id) {
        Post post = findPostById(id);
        if (post != null) {
            posts.remove(post);
            return;
        }
        throw new RuntimeException("Sorry I'm lost");
    }
}
