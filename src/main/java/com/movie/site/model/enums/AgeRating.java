package com.movie.site.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.movie.site.exception.EnumNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter(onMethod=@__(@JsonValue))
@AllArgsConstructor
public enum AgeRating {

    PG13("12+"), R("16+"), NC17("18+");

    private final String russianEquivalent;

    public static AgeRating of(String russianEquivalent) {
        return Arrays.stream(values())
                .filter(ageRating -> ageRating.russianEquivalent
                        .equals(russianEquivalent))
                .findFirst()
                .orElseThrow(() ->
                        new EnumNotFoundException(AgeRating.class, russianEquivalent));
    }
}
