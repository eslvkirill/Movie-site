package com.movie.site.converter;

import com.movie.site.model.enums.Language;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToLanguageEnumConverter implements Converter<String, Language> {

    @Override
    public Language convert(String name) {
        return Language.of(name);
    }
}
