package com.movie.site.mapper;

import com.movie.site.dto.request.CreateReviewDtoRequest;
import com.movie.site.dto.request.UpdateReviewDtoRequest;
import com.movie.site.dto.response.ReviewDtoResponse;
import com.movie.site.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Mapper(imports = LocalDateTime.class)
public interface ReviewMapper {

    @Mapping(target = "datetime", expression = "java(LocalDateTime.now())")
    Review toEntity(CreateReviewDtoRequest reviewDto);

    @Mapping(target = "username",
            expression = "java(review.getUser().getUsername())")
    ReviewDtoResponse toDto(Review review);

    Review update(UpdateReviewDtoRequest reviewDto, @MappingTarget Review review);

    default Page<ReviewDtoResponse> toDtoPage(Page<Review> reviews) {
        return reviews.map(this::toDto);
    }
}
