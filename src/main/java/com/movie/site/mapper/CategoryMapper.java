package com.movie.site.mapper;

import com.movie.site.dto.request.CreateCategoryDtoRequest;
import com.movie.site.dto.request.UpdateCategoryDtoRequest;
import com.movie.site.dto.response.CategoryDtoResponse;
import com.movie.site.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface CategoryMapper {

    Category toEntity(CreateCategoryDtoRequest categoryDto);

    CategoryDtoResponse toDto(Category category);

    Category update(UpdateCategoryDtoRequest categoryDto, @MappingTarget Category genre);

    List<CategoryDtoResponse> toDtoList(Iterable<Category> categories);
}
