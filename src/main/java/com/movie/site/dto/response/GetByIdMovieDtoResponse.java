package com.movie.site.dto.response;

import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import com.movie.site.model.enums.MovieOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalTime;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetByIdMovieDtoResponse {

    private Long id;
    private String engTitle;
    private String rusTitle;
    private Set<String> countries;
    private int year;
    private byte[] background;
    private String pageColor1;
    private String pageColor2;
    private String tagline;
    private String plot;
    private Set<SourceDataDtoResponse> sourceData;
    private Set<Language> audio;
    private Set<Language> subtitles;
    private Set<GenreDtoResponse> genres;
    private AgeRating ageRating;
    private String trailerUrl;
    private int oscars;
    private int price;
    private LocalTime time;
    private Page<ReviewDtoResponse> reviews;
    private boolean userHasAlreadyWrittenReview;
    private float totalRating;
    private int numberOfRatings;
    private RatingDtoResponse userRating;
    private Set<GetAllPersonDtoResponse> actors;
    private Set<GetAllPersonDtoResponse> directors;
    private MovieOperation operation;
    private Map<CategoryDtoResponse, Boolean> relationToCategories;
}
