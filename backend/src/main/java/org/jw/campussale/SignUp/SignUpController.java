package org.jw.campussale.SignUp;

import org.jw.campussale.AppUser.AppUserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public interface SignUpController {
    /**
     * Sign up a new user (It may fail)
     * @param appUserEntity - AppUser object from client
     * @return - AppUser object in database
     */
    ResponseEntity<?> signUp(@RequestBody AppUserEntity appUserEntity);

    ResponseEntity<?> checkUsernameExists(@RequestParam String username);

    ResponseEntity<?> checkEmailExists(@RequestParam String email);
}
