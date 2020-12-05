package com.movie.site.validator;

import com.movie.site.annotation.Unique;
import com.movie.site.service.UniquenessService;
import com.movie.site.util.ValidationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Map;

@RequiredArgsConstructor
public class UniqueValidator implements ConstraintValidator<Unique, Object> {

    private final ApplicationContext context;

    private UniquenessService service;

    @Override
    public void initialize(Unique unique) {
        Class<? extends UniquenessService> clazz = unique.service();
        String serviceQualifier = unique.serviceQualifier();

        if (!serviceQualifier.equals("")) {
            this.service = context.getBean(serviceQualifier, clazz);
        } else {
            this.service = context.getBean(clazz);
        }
    }

    @Override
    public boolean isValid(Object dto, ConstraintValidatorContext ctx) {
        Map<String, String> errors = service.checkUniqueness(dto);

        errors.forEach((k, v) -> ValidationUtils.addConstraintViolation(v, k, ctx));

        return errors.isEmpty();
    }
}
