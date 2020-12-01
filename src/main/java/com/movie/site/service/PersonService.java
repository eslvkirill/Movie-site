package com.movie.site.service;

import com.movie.site.dto.request.CreatePersonDtoRequest;
import com.movie.site.dto.request.UpdatePersonDtoRequest;
import com.movie.site.dto.response.GetAllPersonDtoResponse;
import com.movie.site.model.Person;
import org.mapstruct.Named;

import java.util.Collection;
import java.util.Set;

public interface PersonService {

    Person create(CreatePersonDtoRequest personDto);

    void update(Long id, UpdatePersonDtoRequest personDto);

    Collection<GetAllPersonDtoResponse> findAll();

    @Named("findPeopleByIds")
    Set<Person> findAllByIds(Iterable<Long> ids);
}
