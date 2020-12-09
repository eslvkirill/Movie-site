package com.movie.site.service;

import com.movie.site.dto.request.CreateCategoryDtoRequest;
import com.movie.site.dto.request.UpdateCategoryDtoRequest;
import com.movie.site.dto.response.CategoryDtoResponse;

import java.util.Collection;

public interface CategoryService extends UniquenessService {

    CategoryDtoResponse create(CreateCategoryDtoRequest categoryDto);

    CategoryDtoResponse update(Long id, UpdateCategoryDtoRequest categoryDto);

    Collection<CategoryDtoResponse> findAll();
}
