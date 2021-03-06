package com.movie.site.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReviewDtoRequest {

    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    private String message;
}
