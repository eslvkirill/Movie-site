package com.movie.site.dto.response;

import com.movie.site.model.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetCartMovieDtoResponse {

    private Long id;
    private String engTitle;
    private String rusTitle;
    private int year;
    private byte[] poster;
    private Set<Genre> genres;
    private int price;
    private Set<GetAllPersonDtoResponse> directors;
    private Map<Long, Boolean> relationToCategories;
}
