package com.movie.site.service.impl;

import com.movie.site.dto.request.CreatePersonDtoRequest;
import com.movie.site.dto.request.UpdatePersonDtoRequest;
import com.movie.site.dto.response.GetAllPersonDtoResponse;
import com.movie.site.exception.GenreNotFoundException;
import com.movie.site.exception.PersonNotFoundException;
import com.movie.site.mapper.PersonMapper;
import com.movie.site.model.Genre;
import com.movie.site.model.Person;
import com.movie.site.repository.PersonRepository;
import com.movie.site.service.AmazonS3ClientService;
import com.movie.site.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonServiceImpl implements PersonService {

    private final AmazonS3ClientService amazonS3ClientService;
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    private static final String PEOPLE_PREFIX_PATTERN = "/people/%d/";

    @Override
    public Person create(CreatePersonDtoRequest personDto) {
        Person persistedPerson = personRepository.save(personMapper.toEntity(personDto));
        String prefix = String.format(PEOPLE_PREFIX_PATTERN, persistedPerson.getId());

        persistedPerson.setImageKey(amazonS3ClientService.upload(personDto.getImage(), prefix));

        return personRepository.save(persistedPerson);
    }

    @Override
    public void update(Long id, UpdatePersonDtoRequest personDto) {
        Person person = findPersonById(id);

        personMapper.update(personDto, person);
        amazonS3ClientService.update(personDto.getImage(), person.getImageKey());
        personRepository.save(person);
    }

    @Override
    @Transactional(readOnly = true)
    public Collection<GetAllPersonDtoResponse> findAll() {
        return personMapper.toGetAllDtoList(personRepository.findAll(Sort.by("lastName", "firstName")));
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Person> findAllByIds(Iterable<Long> ids) {
        Set<Person> people = personRepository.findAllByIds(ids);

        if (people.isEmpty()) {
            throw new PersonNotFoundException(ids);
        }

        return people;
    }

    private Person findPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new PersonNotFoundException(id));
    }
}
