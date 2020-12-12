package com.movie.site.dto.response;

import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveMovieDtoResponse {

    private String engTitle;
    private String rusTitle;
    private Set<String> countries;
    private int year;
    private byte[] poster;
    private byte[] background;
    private String pageColor1;
    private String pageColor2;
    private String tagline;
    private String plot;
    private Set<Language> audio;
    private Set<Language> subtitles;
    private Set<Long> genres;
    private AgeRating ageRating;
    private String trailerUrl;
    private int price;
    private String kinopoiskUrl;
    private String imdbUrl;
    private LocalTime time;
    private Set<Long> actors;
    private Set<Long> directors;
}
