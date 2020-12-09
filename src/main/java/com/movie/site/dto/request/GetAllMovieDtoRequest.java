package com.movie.site.dto.request;

import com.movie.site.annotation.Zero;
import com.movie.site.model.CategoryItem;
import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllMovieDtoRequest {

    private Set<String> countries;
    private Set<Long> genres;

    @Size(max = 1)
    private Set<Long> directors;

    @Null
    private Long id;

    @Null
    private String engTitle;

    @Null
    private String rusTitle;

    @Zero
    private int year;

    @Null
    private String posterKey;

    @Null
    private String backgroundKey;

    @Null
    private String pageColor1;

    @Null
    private String pageColor2;

    @Null
    private String tagline;

    @Null
    private String plot;

    @Null
    private Set<Long> sourceData;

    @Null
    private Set<Language> audio;

    @Null
    private Set<Language> subtitles;

    @Null
    private AgeRating ageRating;

    @Null
    private String trailerUrl;

    @Zero
    private int oscars;

    @Zero
    private int price;

    @AssertFalse
    private boolean active;

    @Null
    private LocalTime time;

    @Null
    private Set<Long> reviews;

    @Null
    private Set<Long> ratings;

    @Zero
    private float totalRating;

    @Null
    private Set<Long> actors;

    @Null
    private Set<Long> possibleBuyers;

    @Null
    private Set<CategoryItem> categoryItems;
}
