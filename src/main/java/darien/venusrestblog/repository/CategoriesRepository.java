package darien.venusrestblog.repository;

import darien.venusrestblog.data.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, Long> {

}
