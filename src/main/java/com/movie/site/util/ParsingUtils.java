package com.movie.site.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ParsingUtils {

    private static final ExpressionParser PARSER = new SpelExpressionParser();

    public static String find(String regExp, String input) {
        Matcher matcher = Pattern.compile(regExp).matcher(input);

        if (matcher.find()) {
            return matcher.group(matcher.groupCount());
        }

        return null;
    }

    public static <T> T parseObjectField(Object o, String fieldName, Class<T> fieldType) {
        return PARSER.parseExpression(fieldName).getValue(o, fieldType);
    }
}
