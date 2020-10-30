package com.movie.site.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Source {

    KINOPOISK("Kinopoisk"),
    IMDB("Internet Movie Database"),
    ROTTEN_TOMATOES("Rotten Tomatoes"),
    METACRITIC("Metacritic");

    private final String name;

    public static Source of(String name) {
        return Arrays.stream(values())
                .filter(source -> source.name.equals(name))
                .findFirst()
                .orElse(null);
    }
}
