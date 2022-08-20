package org.jw.campussale.AppUser.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserMessage;
import org.jw.campussale.AppUser.UserController;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.AppUser.UserService;
import org.jw.campussale.Post.PostMessageText;
import org.jw.campussale.Validation.ValidationService;
import org.jw.campussale.enums.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class UserControllerImpl implements UserController {

    private final UserService userService;
    private final ValidationService validationService;

//    @GetMapping("/path")
//    public String forTest(Principal principal) {
//        return principal.getName();
//    }



    /**
     * 1. Used in user login (get the AppUser object from the username)
     * Potential edge cases:
     * 1. username not in the database (handled in controller)
     * 2. username is null (handled in controller)
     *
     * @param username String of username collected from the client
     * @return - AppUser object in database or error
     */
    @Override
    @GetMapping("/user")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        try {
            // Edge case 2
            if (username == null) {
                throw new RuntimeException("Key field is null!");
            }

            // Edge case 1
            AppUserEntity appUserEntity = userService.getUser(username);

            return ResponseEntity.ok().body(appUserEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/userid")
    public ResponseEntity<?> getUserById(@RequestParam Long userId) {
        try {
            if (userId == null) {
                throw new RuntimeException("Key field is null!");
            }

            AppUserEntity appUserEntity = userService.getUserById(userId);

            return ResponseEntity.ok().body(appUserEntity);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/logout")
    public ResponseEntity<?> logout(Principal principal) {
        try {
            userService.logout(principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * 1. Used when user need to change its profile (AppUserEntity has fields cannot be null)
     * 2. User is allowed to change (firstname, lastname, username, password, email, phoneNumber) (handled in UserService)
     * Potential edge cases:
     * 1. All fields are null (handled in controller)
     * 2. Some fields are null (handled in UserService)
     * 3. Username or email already exist (handled in UserService)
     * 4. Format error for username... (handled in controller)
     * 5. User alter its id!!! (handled in Controller)
     *
     * @param userMessage AppUser object parsed from user request
     * @return updated AppUser object or error (AppUser)
     */
    @Override
    @PutMapping("/user")
    public ResponseEntity<?> updateUserInfo(@RequestBody AppUserMessage userMessage, Principal principal) {
        try {

            // Edge case 1
            if (userMessage.getFirstname() == null
                    && userMessage.getLastname() == null
                    && userMessage.getUsername() == null
                    && userMessage.getPassword() == null
                    && userMessage.getEmail() == null
                    && userMessage.getPhoneNumber() == null) {
                throw new RuntimeException("Empty request");
            }

            // Edge case 4
            if (userMessage.getUsername() != null) {
                validationService.validateUsername(userMessage.getUsername());
            }

            if (userMessage.getPassword() != null) {
                validationService.validatePassword(userMessage.getPassword());
            }

            if (userMessage.getEmail() != null) {
                validationService.validateEmail(userMessage.getEmail());
            }

            if (userMessage.getPhoneNumber() != null && !userMessage.getPhoneNumber().equals("")) {
                validationService.validatePhoneNumber(userMessage.getPhoneNumber());
            }

            // UserService handle edge case 2, 3
            AppUserEntity updatedUser = userService.updateUser(userMessage, principal.getName());

            return ResponseEntity.ok().body(updatedUser);
        } catch (Exception e) {
            if (e.getMessage().equals("Unauthorized!")) {
                return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.UNAUTHORIZED);
            }

            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * @param userId      - user id
     * @param category    - category (in enums)
     * @param title       - title (length >= 1)
     * @param description - can be null
     * @param price       - >= 0
     * @param files       - can be empty
     * @param principal   - for authorization
     * @return new post
     */
    @Override
    @PostMapping("/post")
    public ResponseEntity<?> addAPost(@RequestParam Long userId, @RequestParam String category,
                                      @RequestParam String title, @RequestParam String description,
                                      @RequestParam Double price, @RequestParam(required = false) MultipartFile[] files,
                                      Principal principal) {
        try {
            if (principal == null) {
                throw new RuntimeException("Token is not valid!");
            }

            if (userId == null
                    || category == null
                    || title == null
                    || price == null) {
                throw new RuntimeException("Key field is null!");
            }

            if (title.length() == 0) {
                throw new RuntimeException("Invalid title!");
            }

            if (price < 0) {
                throw new RuntimeException("Invalid price!");
            }

            Category categoryEnum = switch (category) {
                case "TEXTBOOKS" -> Category.TEXTBOOKS;
                case "BOOKS" -> Category.BOOKS;
                case "ELECTRONICS" -> Category.ELECTRONICS;
                case "FURNITURE" -> Category.FURNITURE;
                case "CLOTHING" -> Category.CLOTHING;
                case "OTHERS" -> Category.OTHERS;
                default -> throw new RuntimeException("Invalid category!");
            };

            PostMessageText postMessageText = new PostMessageText(userId, categoryEnum, title, description, price);

            PostEntity addedPost = userService.addAPost(userId, postMessageText, files, principal.getName());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/post").toString());
            return ResponseEntity.created(uri).body(addedPost);
        } catch (Exception e) {
            if (e.getMessage().equals("Unauthorized!")) {
                return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.UNAUTHORIZED);
            }

            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @PutMapping("/post")
    public ResponseEntity<?> modifyAPost(@RequestParam Long postId, @RequestBody PostMessageText postMessageText, Principal principal) {
        try {

            if (postId == null || postMessageText == null) {
                throw new RuntimeException("Key field is null!");
            }

            if (postMessageText.getCategory() == null
                    && postMessageText.getDescription() == null
                    && postMessageText.getPrice() == null
                    && postMessageText.getTitle() == null
                    && postMessageText.getUserId() == null) {
                throw new RuntimeException("Empty request");
            }

            if (postMessageText.getTitle() != null && postMessageText.getTitle().length() == 0) {
                throw new RuntimeException("Invalid title!");
            }

            if (postMessageText.getPrice() != null && postMessageText.getPrice() < 0) {
                throw new RuntimeException("Invalid price!");
            }

            return ResponseEntity.ok().body(userService.modifyAPostText(postId, postMessageText, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }


    // Post
    @Override
    @DeleteMapping("/post")
    public ResponseEntity<?> deleteAPost(@RequestParam Long userId, @RequestParam Long postId, Principal principal) {
        try {
            if (userId == null || postId == null) {
                throw new RuntimeException("Key field is null!");
            }

            PostEntity deletedPostEntity = userService.deleteAPost(userId, postId, principal.getName());
            return ResponseEntity.ok().body(deletedPostEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // List
    @Override
    @GetMapping("/saved")
    public ResponseEntity<?> getUserSavedPost(@RequestParam Long userId) {
        try {
            if (userId == null) {
                throw new RuntimeException("Key field is null!");
            }

            AppUserEntity appUserEntity = userService.getUserById(userId);
            List<PostEntity> savedPost = appUserEntity.getSaved();

            return ResponseEntity.ok().body(savedPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // OK
    @Override
    @PutMapping("/saved")
    public ResponseEntity<?> saveAPost(@RequestParam Long userId, @RequestParam Long postId, Principal principal) {
        try {
            if (userId == null || postId == null) {
                throw new RuntimeException("Key field is null!");
            }

            userService.addToSavedList(userId, postId, principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // OK
    @Override
    @DeleteMapping("/saved")
    public ResponseEntity<?> removeFromSaved(@RequestParam Long userId, @RequestParam Long postId, Principal principal) {
        try {
            if (userId == null || postId == null) {
                throw new RuntimeException("Key field is null!");
            }

            userService.removeFromSavedList(userId, postId, principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }


    // List
    @Override
    @GetMapping("/posts")
    public ResponseEntity<?> getUserPosts(@RequestParam Long userId) {
        try {
            if (userId == null) {
                throw new RuntimeException("Key field is null!");
            }

            AppUserEntity appUserEntity = userService.getUserById(userId);
            List<PostEntity> postedPostIds = appUserEntity.getPostEntities();
            return ResponseEntity.ok().body(postedPostIds);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/comment")
    public ResponseEntity<?> addACommentSection(@RequestParam Long userId, @RequestParam Long postId, @RequestParam String comment, Principal principal) {
        try {
            if (userId == null || postId == null || comment == null) {
                throw new RuntimeException("Key field is null!");
            }
            return ResponseEntity.ok().body(userService.leaveACommentSection(postId, userId, comment, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/comment")
    @Override
    public ResponseEntity<?> deleteComment(@RequestParam Long userId, @RequestParam Long commentSectionId, @RequestParam Long commentId, Principal principal) {
        try {
            log.error("called");
            if (userId == null || commentId == null) {
                throw new RuntimeException("Key field is null!");
            }

            userService.deleteAComment(userId, commentSectionId, commentId, principal.getName());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}
