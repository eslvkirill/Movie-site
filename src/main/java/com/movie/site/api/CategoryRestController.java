package com.movie.site.api;

import com.movie.site.dto.request.CreateCategoryDtoRequest;
import com.movie.site.dto.request.UpdateCategoryDtoRequest;
import com.movie.site.dto.response.CategoryDtoResponse;
import com.movie.site.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryRestController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@Valid @RequestBody CreateCategoryDtoRequest categoryDto) {
        CategoryDtoResponse category = categoryService.create(categoryDto);

        return category.getId();
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @Valid @RequestBody UpdateCategoryDtoRequest categoryDto) {
        categoryService.update(id, categoryDto);
    }

    @GetMapping
    public Collection<CategoryDtoResponse> getAll() {
        return categoryService.findAll();
    }
}
