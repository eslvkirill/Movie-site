package com.movie.site.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDtoResponse {

    private Long id;
    private String title;
    private String message;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd MMM yyyy г., HH:mm:ss")
    private LocalDateTime datetime;

    private String username;
}
