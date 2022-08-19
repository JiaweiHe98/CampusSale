package org.jw.campussale.Validation;

public interface ValidationService {

    void validateFirstname(String firstname);

    void validateLastname(String lastname);

    void validateEmail(String email);

    void validateUsername(String username);

    void validatePassword(String password);

    void validatePhoneNumber(String phoneNumber);

}
