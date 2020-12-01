package com.movie.site.mapper;

import com.movie.site.dto.request.CreatePersonDtoRequest;
import com.movie.site.dto.request.UpdatePersonDtoRequest;
import com.movie.site.dto.response.GetAllPersonDtoResponse;
import com.movie.site.model.Person;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface PersonMapper {

    @Mapping(target = "imageKey", ignore = true)
    Person toEntity(CreatePersonDtoRequest personDto);

    @Mapping(target = "imageKey", ignore = true)
    Person update(UpdatePersonDtoRequest personDto, @MappingTarget Person person);

    @Mapping(target = "name", expression = "java(person.getFullName())")
    GetAllPersonDtoResponse toGetAllDto(Person person);

    List<GetAllPersonDtoResponse> toGetAllDtoList(List<Person> people);
}
