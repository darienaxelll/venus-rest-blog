package darien.venusrestblog.controllers;

import darien.venusrestblog.data.Category;
import darien.venusrestblog.repository.CategoriesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(value = "/api/categories", produces = "application/json")
public class CategoriesController {
    private CategoriesRepository categoriesRepository;

    @GetMapping("")
    private List<Category> fetchPostsByCategory(@RequestParam String categoryName) {


        return categoriesRepository.findAll();
    }

}
