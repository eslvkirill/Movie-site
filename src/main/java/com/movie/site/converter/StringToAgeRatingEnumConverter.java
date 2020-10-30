package com.movie.site.converter;

import com.movie.site.model.enums.AgeRating;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToAgeRatingEnumConverter implements Converter<String, AgeRating> {

    @Override
    public AgeRating convert(String russianEquivalent) {
        return AgeRating.of(russianEquivalent);
    }
}
