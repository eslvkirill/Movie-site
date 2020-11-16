package com.movie.site.mapper;

import com.movie.site.dto.response.SourceDataDtoResponse;
import com.movie.site.model.SourceData;
import org.mapstruct.Mapper;

@Mapper
public interface SourceDataMapper {

    SourceDataDtoResponse toDto(SourceData sourceData);
}
