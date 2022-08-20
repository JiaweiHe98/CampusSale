package org.jw.campussale.security;

import lombok.RequiredArgsConstructor;
import org.jw.campussale.security.filter.CustomAuthenticationFilter;
import org.jw.campussale.security.filter.CustomAuthorizationFilter;
import org.jw.campussale.AppUser.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean(), userService);
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        http.authorizeRequests().antMatchers(GET, "/**/").permitAll();
//        http.authorizeRequests().antMatchers(GET, "/static/**").permitAll();
//        http.authorizeRequests().antMatchers("/api/user/user").permitAll();
//        http.authorizeRequests().antMatchers(GET,"/api/post/post").permitAll();
//        http.authorizeRequests().antMatchers("/api/login/**").permitAll();
//        http.authorizeRequests().antMatchers("/api/signup/**").permitAll();

//        http.authorizeRequests().antMatchers(PUT, "/api/user/logout").hasAnyAuthority("USER", "ADMIN", "SUPER_ADMIN");
//        http.authorizeRequests().antMatchers(POST, "/api/user/post").hasAnyAuthority("USER", "ADMIN", "SUPER_ADMIN");
//        http.authorizeRequests().antMatchers(PUT, "/api/user/post").hasAnyAuthority("USER", "ADMIN", "SUPER_ADMIN");
//        http.authorizeRequests().antMatchers(DELETE, "/api/user/post").hasAnyAuthority("USER", "ADMIN", "SUPER_ADMIN");
//        http.authorizeRequests().anyRequest().authenticated();
        http.authorizeRequests().anyRequest().permitAll();

        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(userService), UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
