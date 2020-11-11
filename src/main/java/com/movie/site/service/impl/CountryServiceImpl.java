package com.movie.site.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.site.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@CacheConfig(cacheNames = "countries")
public class CountryServiceImpl implements CountryService {

    private final RestTemplate restClient;
    private final ObjectMapper objectMapper;

    private static final String COUNTRIES_API = "https://namaztimes.kz/ru/api/country";
    private static final Map<String, String> MUST_BE_CHANGED =
            Map.of("Российская Федерация", "Россия");

    @Override
    @SneakyThrows
    @Cacheable
    public Collection<String> findAll() {
        String result = restClient.getForObject(COUNTRIES_API, String.class);
        JsonNode countriesNode = objectMapper.readTree(result);
        Set<String> countries = new TreeSet<>();

        countriesNode
                .forEach(countryNode -> countries.add(countryNode.asText().trim()));

        MUST_BE_CHANGED.forEach((key, value) -> {
            if (countries.remove(key)) {
                countries.add(value);
            }
        });

        return countries;
    }
}
