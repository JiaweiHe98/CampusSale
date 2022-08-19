package org.jw.campussale.Validation.impl;

import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.pattern.FieldPatterns;
import org.jw.campussale.Validation.ValidationService;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@Slf4j
public class ValidationServiceImpl implements ValidationService {

    private final Pattern firstnamePattern = Pattern.compile(FieldPatterns.firstnamePattern);
    private final Pattern lastnamePattern = Pattern.compile(FieldPatterns.lastnamePattern);
    private final Pattern emailPattern = Pattern.compile(FieldPatterns.emailPattern);
    private final Pattern usernamePattern = Pattern.compile(FieldPatterns.usernamePattern);
    private final Pattern phoneNumberPattern = Pattern.compile(FieldPatterns.phoneNumberPattern);

    @Override
    public void validateFirstname(String firstname) {
        if (!firstnamePattern.matcher(firstname).matches()) {
            throw new RuntimeException("Firstname format error!");
        }
    }

    @Override
    public void validateLastname(String lastname) {
        if (!lastnamePattern.matcher(lastname).matches()) {
            throw new RuntimeException("Lastname format error!");
        }
    }

    @Override
    public void validateEmail(String email) {
        if (!emailPattern.matcher(email).matches()) {
            throw new RuntimeException("Email format error!");
        }
    }

    @Override
    public void validateUsername(String username) {
        if (username.length() < 6) {
            throw new RuntimeException("Username too short! Valid length: 6 ~ 48 (included).");
        }

        if (username.length() > 48) {
            throw new RuntimeException("Username too long! Valid length: 6 ~ 48 (included).");
        }

        if (!usernamePattern.matcher(username).matches()) {
            throw new RuntimeException("Username should be alphanumeric!");
        }
    }

    @Override
    public void validatePassword(String password) {
        if (password.length() < 8) {
            throw new RuntimeException("Password should be at least 8 characters.");
        }

        if (password.length() > 100) {
            throw new RuntimeException("Password too long! Valid length: 8 ~ 100 (included).");
        }
    }

    @Override
    public void validatePhoneNumber(String phoneNumber) {
        if (!phoneNumberPattern.matcher(phoneNumber).matches()) {
            throw new RuntimeException("Invalid phone number format!");
        }
    }
}
