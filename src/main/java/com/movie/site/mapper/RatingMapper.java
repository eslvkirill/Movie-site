package com.movie.site.mapper;

import com.movie.site.dto.request.CreateRatingDtoRequest;
import com.movie.site.dto.request.UpdateRatingDtoRequest;
import com.movie.site.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper
public interface RatingMapper {

    Rating toEntity(CreateRatingDtoRequest ratingDto);

    Rating update(UpdateRatingDtoRequest ratingDto, @MappingTarget Rating rating);
}
