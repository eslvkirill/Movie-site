package com.movie.site.service.impl;

import com.movie.site.dto.request.CreateCategoryDtoRequest;
import com.movie.site.dto.request.UpdateCategoryDtoRequest;
import com.movie.site.dto.response.CategoryDtoResponse;
import com.movie.site.exception.CategoryNotFoundException;
import com.movie.site.mapper.CategoryMapper;
import com.movie.site.model.Category;
import com.movie.site.model.QCategory;
import com.movie.site.repository.CategoryRepository;
import com.movie.site.service.CategoryService;
import com.movie.site.util.ParsingUtils;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@PropertySource(value = "classpath:validation.properties", encoding = "UTF-8")
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Value("${unique.category.name}")
    private String uniqueNameMessage;

    private static final String NAME_FIELD = "name";

    @Override
    public CategoryDtoResponse create(CreateCategoryDtoRequest categoryDto) {
        Category category = categoryMapper.toEntity(categoryDto);

        return categoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public CategoryDtoResponse update(Long id, UpdateCategoryDtoRequest categoryDto) {
        Category category = findCategoryById(id);

        categoryMapper.update(categoryDto, category);

        return categoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<CategoryDtoResponse> findAll() {
        return categoryMapper.toDtoList(categoryRepository.findAll(Sort.by("id")));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, String> checkUniqueness(Object dto) {
        String name = ParsingUtils.parseObjectField(dto, NAME_FIELD, String.class);
        QCategory category = QCategory.category;

        BooleanExpression hasName = category.name.equalsIgnoreCase(name);

        return categoryRepository.findOne(hasName)
                .map(c -> Map.of(NAME_FIELD, uniqueNameMessage))
                .orElse(Map.of());
    }

    private Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }
}
