package com.movie.site.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ParsingUtils {

    public static String find(String regExp, String input) {
        Matcher matcher = Pattern.compile(regExp).matcher(input);

        if (matcher.find()) {
            return matcher.group(matcher.groupCount());
        }

        return null;
    }
}
