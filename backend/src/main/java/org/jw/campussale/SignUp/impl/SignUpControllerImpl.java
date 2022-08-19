package org.jw.campussale.SignUp.impl;

import lombok.RequiredArgsConstructor;
import org.jw.campussale.SignUp.SignUpController;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.SignUp.SignUpService;
import org.jw.campussale.AppUser.UserService;
import org.jw.campussale.Validation.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/signup")
@CrossOrigin(origins = "*")
public class SignUpControllerImpl implements SignUpController {

    private final SignUpService signUpService;
    private final UserService userService;
    private final ValidationService validationService;

    @Override
    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody AppUserEntity appUserEntity) {
        try {
            System.out.println(appUserEntity);

            // validation
            if (appUserEntity == null
                    || appUserEntity.getFirstname() == null
                    || appUserEntity.getLastname() == null
                    || appUserEntity.getUsername() == null
                    || appUserEntity.getPassword() == null) {
                throw new RuntimeException("At least one key field is missing!");
            }

            // required fields ()
            validationService.validateFirstname(appUserEntity.getFirstname());
            validationService.validateLastname(appUserEntity.getLastname());
            validationService.validateUsername(appUserEntity.getUsername());
            validationService.validatePassword(appUserEntity.getPassword());
            validationService.validateEmail(appUserEntity.getEmail());

            if (appUserEntity.getPhoneNumber().strip().equals("")) {
                appUserEntity.setPhoneNumber(null);
            }

            if (appUserEntity.getPhoneNumber() != null) {
                validationService.validatePhoneNumber(appUserEntity.getPhoneNumber());
            }

            // registration
            AppUserEntity appUserEntityAdded = signUpService.signUp(appUserEntity);
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/signup").toString());
            return ResponseEntity.created(uri).body(appUserEntityAdded);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/username")
    public ResponseEntity<?> checkUsernameExists(@RequestParam String username) {
        try {
            return ResponseEntity.ok().body(Map.of("exists", userService.checkExistsByUsername(username)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/email")
    public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
        try {
            return ResponseEntity.ok().body(Map.of("exists", userService.checkExistsByEmail(email)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}
