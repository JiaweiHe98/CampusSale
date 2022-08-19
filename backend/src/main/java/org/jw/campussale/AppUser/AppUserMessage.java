package org.jw.campussale.AppUser;

import lombok.Data;

@Data
public class AppUserMessage {
    private Long id;

    private String firstname;

    private String lastname;

    private String username;

    private String password;

    private String phoneNumber;

    private String email;

}
