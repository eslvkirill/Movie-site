package com.movie.site.dto.request;

import com.movie.site.annotation.Country;
import com.movie.site.annotation.File;
import com.movie.site.model.enums.AgeRating;
import com.movie.site.model.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMovieDtoRequest {

    @NotBlank
    @Size(max = 255)
    private String engTitle;

    @NotBlank
    @Size(max = 255)
    private String rusTitle;

    @NotEmpty
    @Country
    private Set<String> countries;

    @Min(1888)
    private int year;

    @File(extensions = {"jpg", "jpeg", "png", "svg", "gif", "webp"})
    private MultipartFile poster;

    @File(extensions = {"jpg", "jpeg", "png", "svg", "gif", "webp"})
    private MultipartFile background;

    @NotBlank
    @Pattern(regexp = "#[a-z\\d]{3,}")
    @Size(max = 20)
    private String pageColor1;

    @NotBlank
    @Pattern(regexp = "#[a-z\\d]{3,}")
    @Size(max = 20)
    private String pageColor2;

    @NotBlank
    @Size(max = 255)
    private String tagline;

    @NotBlank
    private String plot;

    @NotEmpty
    private Set<Language> audio;

    @NotEmpty
    private Set<Language> subtitles;

    @NotEmpty
    private Set<Long> genres;

    @NotNull
    private AgeRating ageRating;

    @NotBlank
    @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/embed\\/)([\\w\\-]*)(&(amp;)?[\\w\\?=]*)?")
    private String trailerUrl;

    @Positive
    private int price;

    @NotBlank
    @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?kinopoisk.ru\\/film\\/[\\d]+\\/?")
    private String kinopoiskUrl;

    @NotBlank
    @URL(regexp = "http(?:s?):\\/\\/(?:www\\.)?imdb.com\\/title\\/tt[\\d]+\\/?[\\w\\?=\\-&]*")
    private String imdbUrl;

    @NotNull
    private LocalTime time;

    @NotEmpty
    private Set<Long> actors;

    @NotEmpty
    private Set<Long> directors;
}
