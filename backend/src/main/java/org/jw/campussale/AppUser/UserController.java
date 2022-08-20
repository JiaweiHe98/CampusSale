package org.jw.campussale.AppUser;

import org.jw.campussale.Post.PostMessageText;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

public interface UserController {

    ResponseEntity<?> getUserByUsername(@RequestParam String username);

    ResponseEntity<?> getUserById(@RequestParam Long userId);

    ResponseEntity<?> logout(Principal principal);

    ResponseEntity<?> updateUserInfo(@RequestBody AppUserMessage userFromClient, Principal principal);

    ResponseEntity<?> addAPost(@RequestParam Long userId, @RequestParam String category,
                               @RequestParam String title, @RequestParam String description,
                               @RequestParam Double price, @RequestParam MultipartFile[] images,
                               Principal principal);

    ResponseEntity<?> modifyAPost(@RequestParam Long postId, @RequestBody PostMessageText postMessageText, Principal principal);

    ResponseEntity<?> deleteAPost(@RequestParam Long userId, @RequestParam Long postId, Principal principal);

    ResponseEntity<?> saveAPost(@RequestParam Long userId, @RequestParam Long postId, Principal principal);

    ResponseEntity<?> removeFromSaved(@RequestParam Long userId, @RequestParam Long postId, Principal principal);

    ResponseEntity<?> getUserSavedPost(@RequestParam Long userId);

    ResponseEntity<?> getUserPosts(@RequestParam Long userId);

    ResponseEntity<?> addACommentSection(@RequestParam Long userId, @RequestParam Long postId, @RequestParam String comment, Principal principal);

    ResponseEntity<?> deleteComment(@RequestParam Long userId, @RequestParam Long commentSectionId, @RequestParam Long commentId, Principal principal);

}
