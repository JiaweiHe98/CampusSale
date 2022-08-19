package org.jw.campussale.testingData;

import lombok.RequiredArgsConstructor;
import org.jw.campussale.Post.PostMessageText;
import org.jw.campussale.enums.Category;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.SignUp.SignUpService;
import org.jw.campussale.AppUser.UserService;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class TestingDataInjector {

    private final SignUpService signUpService;
    private final UserService userService;

    public void addTestingData() {
        AppUserEntity appUserEntity = new AppUserEntity();

        appUserEntity.setFirstname("Albert");
        appUserEntity.setLastname("Smith");
        appUserEntity.setUsername("alberts01");
        appUserEntity.setPassword("12345678");
        appUserEntity.setEmail("alberts@gmail.com");
        appUserEntity.setPhoneNumber("1233211234");

        appUserEntity = signUpService.signUp(appUserEntity);

        AppUserEntity appUserEntity2 = new AppUserEntity();

        appUserEntity2.setFirstname("Tom");
        appUserEntity2.setLastname("Edison");
        appUserEntity2.setUsername("tomedison");
        appUserEntity2.setPassword("11111111");
        appUserEntity2.setEmail("tomed@gmail.com");
        appUserEntity2.setPhoneNumber("3211231234");

        appUserEntity2 = signUpService.signUp(appUserEntity2);

        PostMessageText postMessageText = new PostMessageText();

        postMessageText.setUserId(appUserEntity.getId());
        postMessageText.setCategory(Category.BOOKS);
        postMessageText.setTitle("C++ Primer");
        postMessageText.setDescription("A great way to learn c++");
        postMessageText.setPrice(19.99);

        PostMessageText postMessageText2 = new PostMessageText();

        postMessageText2.setUserId(appUserEntity.getId());
        postMessageText2.setCategory(Category.TEXTBOOKS);
        postMessageText2.setTitle("Calculus 1");
        postMessageText2.setDescription("Textbook for calc 1");
        postMessageText2.setPrice(180.00);

        userService.addAPost(appUserEntity.getId(), postMessageText, new MultipartFile[]{}, appUserEntity.getUsername());
        userService.addAPost(appUserEntity2.getId(), postMessageText2, new MultipartFile[]{}, appUserEntity2.getUsername());
    }

}
