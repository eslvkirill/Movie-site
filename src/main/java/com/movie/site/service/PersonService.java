package com.movie.site.service;

import com.movie.site.dto.request.CreatePersonDtoRequest;
import com.movie.site.dto.request.UpdatePersonDtoRequest;
import com.movie.site.dto.response.GetAllPersonDtoResponse;
import com.movie.site.model.Person;

import java.util.Collection;

public interface PersonService {

    Person create(CreatePersonDtoRequest personDto);

    void update(Long id, UpdatePersonDtoRequest personDto);

    Collection<GetAllPersonDtoResponse> findAll();
}
