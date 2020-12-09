package com.movie.site.service;

import com.movie.site.dto.request.CreateCategoryDtoRequest;
import com.movie.site.dto.request.UpdateCategoryDtoRequest;
import com.movie.site.dto.response.CategoryDtoResponse;
import com.movie.site.model.Category;

import java.util.Collection;

public interface CategoryService extends UniquenessService {

    CategoryDtoResponse create(CreateCategoryDtoRequest categoryDto);

    CategoryDtoResponse update(Long id, UpdateCategoryDtoRequest categoryDto);

    Collection<CategoryDtoResponse> findAll();

    Category findByIdLocal(Long id);

    Collection<Category> findAllLocal();
}
