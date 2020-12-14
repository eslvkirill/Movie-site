package com.movie.site.dto.request;

import com.movie.site.annotation.Unique;
import com.movie.site.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Unique(service = CategoryService.class)
public class CreateCategoryDtoRequest {

    @NotBlank
    @Size(max = 255)
    private String name;
}
