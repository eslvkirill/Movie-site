package com.movie.site.config;

import com.movie.site.converter.StringToAgeRatingEnumConverter;
import com.movie.site.converter.StringToLanguageEnumConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToAgeRatingEnumConverter());
        registry.addConverter(new StringToLanguageEnumConverter());
    }
}
