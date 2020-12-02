package com.movie.site.dto.request;

import com.movie.site.annotation.Step;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRatingDtoRequest {

    @Range(min = 1, max = 10)
    @Step(0.5F)
    private float value;
}
