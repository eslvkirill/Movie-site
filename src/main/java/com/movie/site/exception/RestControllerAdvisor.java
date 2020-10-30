package com.movie.site.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Object> handleMaxUploadSizeExceededException(
            MaxUploadSizeExceededException ex) {
        return ResponseEntity.badRequest()
                .body(Collections.singletonMap("message", ex.getMostSpecificCause().getMessage()));
    }

    @Override
    protected ResponseEntity<Object> handleBindException(
            BindException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        MultiValueMap<String, String> errors = new LinkedMultiValueMap<>();
        ex.getFieldErrors()
                .forEach(fieldError -> errors.add(fieldError.getField(),
                        fieldError.getDefaultMessage()));
        return ResponseEntity.badRequest()
                .headers(headers)
                .body(Collections.singletonMap("errors", errors));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        MultiValueMap<String, String> errors = new LinkedMultiValueMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(fieldError -> errors.add(fieldError.getField(),
                        fieldError.getDefaultMessage()));
        return ResponseEntity.badRequest()
                .headers(headers)
                .body(Collections.singletonMap("errors", errors));
    }
}
