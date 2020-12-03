package com.movie.site.api;

import com.movie.site.dto.request.CreatePersonDtoRequest;
import com.movie.site.dto.request.UpdatePersonDtoRequest;
import com.movie.site.model.Person;
import com.movie.site.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/people")
public class PersonRestController {

    private final PersonService personService;

    @PostMapping
    public ResponseEntity<Void> create(@Valid CreatePersonDtoRequest personDto) {
        Person person = personService.create(personDto);

        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(person.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/{id}")
    public void update(@PathVariable Long id,
                       @Valid @ModelAttribute UpdatePersonDtoRequest personDto) {
        personService.update(id, personDto);
    }
}
