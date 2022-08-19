package org.jw.campussale;

import org.jw.campussale.Role.RoleService;
import org.jw.campussale.testingData.TestingDataInjector;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@SpringBootApplication
public class CampusSaleApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusSaleApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(RoleService roleService, TestingDataInjector testingData) {
        return args -> {
            // Initialize all roles
            roleService.addRoleIfNotInDatabase();

            // Add testing data
            testingData.addTestingData();
        };
    }

}
