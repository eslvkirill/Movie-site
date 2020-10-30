package com.movie.site.validator;

import com.movie.site.annotation.File;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileValidator implements ConstraintValidator<File, MultipartFile> {

    private Set<String> fileExtensions;

    private static final String EXTENSION_REG_EXP = "\\.([a-z]{3,4})$";

    @Override
    public void initialize(File constraintAnnotation) {
        fileExtensions = Set.of(constraintAnnotation.extensions());
    }

    @Override
    public boolean isValid(MultipartFile multipartFile,
                           ConstraintValidatorContext ctx) {
        ctx.disableDefaultConstraintViolation();
        boolean isValid = true;

        if (multipartFile == null || multipartFile.isEmpty()) {
            addConstraintViolation("не должно быть пустым", ctx);

            isValid = false;
        } else {
            Matcher matcher = Pattern.compile(EXTENSION_REG_EXP)
                    .matcher(Objects.requireNonNull(multipartFile.getOriginalFilename()));

            if (!matcher.find() || !fileExtensions.contains(matcher.group(1))) {
                addConstraintViolation("должно иметь допустимое разрешение", ctx);

                isValid = false;
            }
        }

        return isValid;
    }

    private static void addConstraintViolation(String message,
                                               ConstraintValidatorContext ctx) {
        ctx.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation();
    }
}
