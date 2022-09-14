package darien.venusrestblog.repository;

import darien.venusrestblog.data.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
