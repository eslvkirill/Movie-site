package com.movie.site.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.site.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final RestTemplate restClient;
    private final ObjectMapper objectMapper;

    private static final String COUNTRY_API = "http://web.flippost.com/fp/client/api.php?dbAct=getCountries";
    private static final String COUNTRIES_NODE = "data";
    private static final String COUNTRY_NAME_NODE = "country";

    @Override
    @SneakyThrows
    public List<String> findAll() {
        String result = restClient.getForObject(COUNTRY_API, String.class);
        JsonNode countriesNode = objectMapper.readTree(result).get(COUNTRIES_NODE);
        List<String> countries = new ArrayList<>();

        countriesNode
                .forEach(countryNode -> countries.add(countryNode.get(COUNTRY_NAME_NODE).asText()));

        return countries;
    }
}
