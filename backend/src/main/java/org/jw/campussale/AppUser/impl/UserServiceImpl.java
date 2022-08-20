package org.jw.campussale.AppUser.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.AppUser.AppUserMessage;
import org.jw.campussale.Comment.CommentEntity;
import org.jw.campussale.Comment.CommentContentEntity;
import org.jw.campussale.Image.ImageLocationEntity;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.AppUser.UserRepository;
import org.jw.campussale.Comment.CommentService;
import org.jw.campussale.Post.PostMessageText;
import org.jw.campussale.Post.PostService;
import org.jw.campussale.AppUser.UserService;
import org.jw.campussale.Storage.StorageService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PostService postService;
    private final CommentService commentService;
    private final PasswordEncoder passwordEncoder;
    private final StorageService storageService;
    private final String baseUrl = "";

    private void checkTokenUser(String username, String tokenUsername) {
        if (!username.equals(tokenUsername)) {
            throw new RuntimeException("Unauthorized!");
        }
    }

    @Override
    public boolean checkExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public void logout(String username) {
        AppUserEntity appUserEntity = getUser(username);
        appUserEntity.setToken(null);
    }

    public void runtimeExceptionIfExistsByUsername(String username, String methodName) {
        if (checkExistsByUsername(username)) {
            log.error("Username {} already exist in {}", username, methodName);
            throw new RuntimeException("Username: " + username + " already exist");
        }
    }

    @Override
    public boolean checkExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void runtimeExceptionIfExistByEmail(String email, String methodName) {
        if (checkExistsByEmail(email)) {
            log.error("Email {} already exist in {}", email, methodName);
            throw new RuntimeException("Email: " + email + " already exist");
        }
    }

    @Override
    public boolean checkExistsById(Long userId) {
        return userRepository.existsById(userId);
    }


    /**
     * Update userMessage's firstname, lastname, username, password, email or phone number
     * Other fields are not able to update
     * Allow userMessage to set email or phone number to null
     *
     * @param userMessage A userMessage object contains all new information
     * @return Updated userMessage information
     */
    @Override
    public AppUserEntity updateUser(AppUserMessage userMessage, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userMessage.getId());

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        if (userMessage.getFirstname() != null) {
            appUserEntity.setFirstname(userMessage.getFirstname());
        }

        if (userMessage.getLastname() != null) {
            appUserEntity.setLastname(userMessage.getLastname());

        }

        if (userMessage.getUsername() != null) {
            // Cannot have same username for two users
            runtimeExceptionIfExistsByUsername(userMessage.getUsername(), "updateUser(AppUser userMessage)");
            appUserEntity.setUsername(userMessage.getUsername());
        }

        if (userMessage.getPassword() != null) {
            appUserEntity.setPassword(passwordEncoder.encode(appUserEntity.getPassword()));
        }

        if (userMessage.getEmail() != null) {
            // One email can only be bind to one userMessage
            runtimeExceptionIfExistByEmail(userMessage.getEmail(), "updateUser(AppUser userMessage)");
            appUserEntity.setEmail(userMessage.getEmail());
        }

        if (userMessage.getPhoneNumber() != null) {
            if (userMessage.getPhoneNumber().equals("")) {
                appUserEntity.setPhoneNumber(null);
            } else {
                appUserEntity.setPhoneNumber(userMessage.getPhoneNumber());
            }
        }

        // appUser after updates
        return appUserEntity;
    }

    /**
     * Get user by username
     * 1. Used in login section
     *
     * @param username - String of username (may not exist)
     * @return - AppUser object in database
     */
    @Override
    public AppUserEntity getUser(String username) {
        AppUserEntity appUserEntity = userRepository.findByUsername(username);

        if (appUserEntity == null) {
            log.error("Get user fail in getUser(String username)! Not able to find user: '{}'", username);
            throw new RuntimeException(String.format("Cannot get user '%s'", username));
        }

        // The user in the database
        return appUserEntity;
    }

    /**
     * Get user by id
     * Throw RuntimeException when userId does not exist
     *
     * @param userId - userId (may not exist)
     * @return - AppUser object in database
     */
    @Override
    public AppUserEntity getUserById(Long userId) {
        AppUserEntity appUserEntity = userRepository.findById(userId).orElse(null);

        if (appUserEntity == null) {
            log.error("Get user fail in getUserById(Long userId)! Not able to find user, id '{}'", userId);
            throw new RuntimeException(String.format("User id: '%d' does not exist", userId));
        }

        // The user in the database
        return appUserEntity;
    }

    @Override
    public PostEntity addAPost(Long userId, PostMessageText postMessageText, MultipartFile[] images, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        log.info("Trying to add a post userId {} tokenUsername {}", userId, tokenUsername);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity postEntity = new PostEntity();

        postEntity.setAppUserEntity(appUserEntity);
        postEntity.setCategory(postMessageText.getCategory());
        postEntity.setTitle(postMessageText.getTitle());
        postEntity.setDescription(postMessageText.getDescription());
        postEntity.setPrice(postMessageText.getPrice());

        postEntity = postService.addAPost(postEntity);
        String postIdStr = "" + postEntity.getId();
        List<ImageLocationEntity> imageList = postEntity.getImages();

        if (images != null) {
            for (int i = 0; i < images.length; i++) {
                // image must be png or jpg
                String originalImageName = images[i].getOriginalFilename();
                if (originalImageName == null) {
                    throw new RuntimeException("At least one image name is null");
                }

                try {
                    log.error(originalImageName);
                    String fileName;
                    ImageLocationEntity imageLocationEntity = new ImageLocationEntity();
                    if (originalImageName.endsWith(".jpg")) {
                        fileName = postIdStr + "_" + i + ".jpg";
                    } else if (originalImageName.endsWith(".png")) {
                        fileName = postIdStr + "_" + i + ".png";
                    } else {
                        throw new RuntimeException();
                    }
                    imageLocationEntity.setUrl(fileName);
                    imageList.add(imageLocationEntity);
                    storageService.store(images[i], fileName);
                } catch (Exception e) {
                    postService.deleteAPost(postEntity.getId());
                    throw new RuntimeException("Image upload fail!");
                }

            }
        }

        appUserEntity.getPostEntities().add(postEntity);

        log.info("Add post: {} to user: {}", postEntity.getTitle(), appUserEntity.getUsername());
        return postEntity;
    }

    /**
     * User wants to delete a post
     *
     * @param userId - userId (may not exist)
     * @param postId - postId (may not belong to that user)
     * @return - deleted post
     */
    @Override
    public PostEntity deleteAPost(Long userId, Long postId, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity toDelete = postService.getPostById(postId);

        if (appUserEntity.getId().equals(toDelete.getAppUserEntity().getId())) {
            postService.deleteAPost(toDelete.getId());
        } else {
            throw new RuntimeException("This user is not the owner of the post");
        }

        return toDelete;
    }

    @Override
    public PostEntity modifyAPostText(Long postId, PostMessageText postMessageText, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(postMessageText.getUserId());

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity toModify = postService.getPostById(postId);

        boolean isOwner = toModify.getAppUserEntity().getId().equals(appUserEntity.getId());

        if (isOwner) {
            if (postMessageText.getCategory() != null) {
                toModify.setCategory(postMessageText.getCategory());
            }

            if (postMessageText.getTitle() != null) {
                toModify.setTitle(postMessageText.getTitle());
            }

            if (postMessageText.getDescription() != null) {
                if (postMessageText.getDescription().equals("")) {
                    toModify.setDescription(null);
                } else {
                    toModify.setDescription(postMessageText.getDescription());
                }
            }

            if (postMessageText.getPrice() != null) {
                toModify.setPrice(postMessageText.getPrice());
            }

            log.info("Update post in modifyAPost(Long userId, Long postId, Post modifiedTo)! User: {}, Post(after): {}", appUserEntity.getUsername(), toModify.getTitle());
            return toModify;
        } else {
            log.error("User id: {} is not the owner of post id: {}", postMessageText.getUserId(), postId);
            throw new RuntimeException("This user is not the owner of the post");
        }
    }

    /**
     * Get user's post in a list
     *
     * @param userId - userId (may not exist)
     * @return List of all post of that user
     */
    @Override
    public List<PostEntity> getSavedPosts(Long userId, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        return appUserEntity.getPostEntities();
    }

    @Override
    public void addToSavedList(Long userId, Long postId, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity postEntity = postService.getPostById(postId);

        for (PostEntity saved : appUserEntity.getSaved()) {
            if (saved.getId().equals(postEntity.getId())) {
                throw new RuntimeException("Already saved");
            }
        }

        appUserEntity.getSaved().add(postEntity);
        postEntity.getLiked().add(appUserEntity);
    }

    @Override
    public void removeFromSavedList(Long userId, Long postId, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity toRemove = postService.getPostById(postId);
        appUserEntity.getSaved().remove(toRemove);
        toRemove.getLiked().remove(appUserEntity);
    }

    /**
     * Used to delete a user
     *
     * @param userId - userId (may not exist)
     * @return - user before deletion
     */
    @Override
    public AppUserEntity deleteUser(Long userId) {
        AppUserEntity appUserEntity = getUserById(userId);

        log.info("Delete user: {}", appUserEntity.getUsername());
        userRepository.delete(appUserEntity);
        return appUserEntity;
    }

    @Override
    public List<CommentEntity> leaveACommentSection(Long postId, Long userId, String comment, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        PostEntity postEntity = postService.getPostById(postId);

        CommentEntity newCommentSectionEntity = new CommentEntity();
        newCommentSectionEntity.setPostEntity(postEntity);
        CommentContentEntity newComment = new CommentContentEntity();
        newComment.setComment(comment);

        newComment.setUser(appUserEntity);
        newComment.setPostedTime(new Date());

        newCommentSectionEntity.getComments().add(newComment);
        postEntity.getCommentEntityList().add(newCommentSectionEntity);

        log.info("Add new comment section in post: {}, comment: {}", postEntity.getTitle(), comment);
        return postEntity.getCommentEntityList();
    }

    @Override
    public CommentEntity addAComment(Long commentId, Long userId, String comment, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        CommentEntity commentEntitySection = commentService.getCommentSectionById(commentId);

        CommentContentEntity commentContentEntity = new CommentContentEntity();
        commentContentEntity.setComment(comment);
        commentContentEntity.setUser(appUserEntity);
        commentContentEntity.setPostedTime(new Date());
        commentEntitySection.getComments().add(commentContentEntity);

        return commentEntitySection;
    }

    @Override
    public void deleteAComment(Long userId, Long commentSectionId, Long commentContentId, String tokenUsername) {
        AppUserEntity appUserEntity = getUserById(userId);

        checkTokenUser(appUserEntity.getUsername(), tokenUsername);

        commentService.deleteAComment(commentContentId);
        CommentEntity commentEntitySection = commentService.getCommentSectionById(commentSectionId);

        if (commentEntitySection.getComments().size() == 0) {
            commentService.deleteACommentSection(commentSectionId);
        }
    }

    @Override
    public String getToken(String username) {
        return getUser(username).getToken();
    }

    @Override
    public void saveToken(String username, String token) {
        getUser(username).setToken(token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUserEntity appUserEntity = getUser(username);

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        appUserEntity.getRoleEntities().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRoleType().name()));
        });

        return new User(appUserEntity.getUsername(), appUserEntity.getPassword(), authorities);
    }
}
