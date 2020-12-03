package com.movie.site.dto.response;

import com.movie.site.model.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllMovieDtoResponse {

    private Long id;
    private String engTitle;
    private String rusTitle;
    private int year;
    private byte[] poster;
    private String pageColor1;
    private Set<Genre> genres;
    private int price;
    private LocalTime time;
    private float totalRating;
    private Set<GetAllPersonDtoResponse> directors;
}
