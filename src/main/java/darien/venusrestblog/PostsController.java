package darien.venusrestblog;

import darien.venusrestblog.data.Post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping (value = "/api/posts", headers = "Accept=application/json")
public class PostsController {
    @GetMapping("/")
    public List<Post> fetchPosts() {
        //TODO: Get some post and  return them
        List<Post> posts = new ArrayList<>();
        posts.add(new Post(1L, "Post 1", "This  is post one."));
        posts.add(new Post(2L, "Post 2", "This  is post two."));
        return posts;
    }

    @GetMapping("/{id}")
    public Post fetchPostsById(@PathVariable long id) {
        //TODO: Get some post and  return them
        return switch ((int) id) {
            case 1 -> new Post(1L, "Post 1", "This  is post one.");
            case 2 -> new Post(2L, "Post 2", "This  is post two.");
            default -> throw new RuntimeException("Page not found");
        };
    }
}
