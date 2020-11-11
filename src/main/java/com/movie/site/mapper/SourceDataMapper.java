package com.movie.site.mapper;

import com.movie.site.dto.response.SourceDataDto;
import com.movie.site.model.SourceData;
import org.mapstruct.Mapper;

@Mapper
public interface SourceDataMapper {

    SourceDataDto toDto(SourceData sourceData);
}
