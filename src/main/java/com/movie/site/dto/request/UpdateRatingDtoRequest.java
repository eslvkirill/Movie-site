package com.movie.site.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRatingDtoRequest {

    @Range(min = 1, max = 10)
    private int value;
}
