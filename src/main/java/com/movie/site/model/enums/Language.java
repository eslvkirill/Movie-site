package com.movie.site.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.movie.site.exception.EnumNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter(onMethod=@__(@JsonValue))
@AllArgsConstructor
public enum Language {

    RUSSIAN("Русский"),
    ENGLISH("Английский"),
    FRENCH("Французский"),
    ITALIAN("Итальянский"),
    GERMAN("Немецкий"),
    KOREAN("Корейский"),
    SPANISH("Испанский");

    private final String name;

    public static Language of(String name) {
        return Arrays.stream(values())
                .filter(language -> language.name
                        .equals(name))
                .findFirst()
                .orElseThrow(() -> new EnumNotFoundException(Language.class, name));
    }
}
