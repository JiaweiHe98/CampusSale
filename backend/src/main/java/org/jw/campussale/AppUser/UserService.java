package org.jw.campussale.AppUser;

import org.jw.campussale.Comment.CommentEntity;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.Post.PostMessageText;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    boolean checkExistsByUsername(String username);

    void logout(String username);

    void runtimeExceptionIfExistsByUsername(String username, String methodName);

    boolean checkExistsByEmail(String email);

    void runtimeExceptionIfExistByEmail(String email, String methodName);

    boolean checkExistsById(Long userId);

    AppUserEntity updateUser(AppUserMessage user, String tokenUsername);

    AppUserEntity getUser(String username);

    AppUserEntity getUserById(Long userId);

    PostEntity addAPost(Long userId, PostMessageText postMessageText, MultipartFile[] images, String tokenUsername);

    PostEntity deleteAPost(Long userId, Long postId, String tokenUsername);

    PostEntity modifyAPostText(Long postId, PostMessageText postMessageText, String tokenUsername);

//    Post addAnImageToPost(Long userId, Long postId, image?)

    List<PostEntity> getSavedPosts(Long userId, String tokenUsername);

    void addToSavedList(Long userId, Long postId, String tokenUsername);

    void removeFromSavedList(Long userId, Long postId, String tokenUsername);

    AppUserEntity deleteUser(Long userId);

    List<CommentEntity> leaveACommentSection(Long postId, Long userId, String comment, String tokenUsername);

    CommentEntity addAComment(Long commentId, Long userId, String comment, String tokenUsername);

    void deleteAComment(Long userId, Long commentSectionId, Long commentContentId, String tokenUsername);

    String getToken(String username);

    void saveToken(String username, String token);

}
