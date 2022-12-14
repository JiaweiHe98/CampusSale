package org.jw.campussale.redirect;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class redirect {
    @GetMapping(value = {"/profile", "/about", "/market", "/home", "/about", "/signup"})
    public RedirectView defaultRoute() {
        return new RedirectView("/");
    }
}
