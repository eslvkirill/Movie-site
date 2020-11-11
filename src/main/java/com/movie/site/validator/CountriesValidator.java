package com.movie.site.validator;

import com.movie.site.annotation.Country;
import com.movie.site.service.CountryService;
import lombok.RequiredArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Collection;

@RequiredArgsConstructor
public class CountriesValidator implements ConstraintValidator<Country, Collection<String>> {

    private final CountryService countryService;

    @Override
    public boolean isValid(Collection<String> countries, ConstraintValidatorContext ctx) {
        Collection<String> validCountries = countryService.findAll();

        return validCountries.containsAll(countries);
    }
}
