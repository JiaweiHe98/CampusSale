package org.jw.campussale.Post.impl;

import lombok.RequiredArgsConstructor;
import org.jw.campussale.Post.PostController;
import org.jw.campussale.Post.PostService;
import org.jw.campussale.AppUser.UserService;
import org.jw.campussale.Storage.StorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/post")
@CrossOrigin(origins = "*")
public class PostControllerImpl implements PostController {

    private final PostService postService;
    private final UserService userService;
    private final StorageService storageService;

    /**
     * 1. Used when user want to see a post
     * Every user has the right to see all post
     *
     * @param postId - post id, may not exist
     * @return - post
     */
    @Override
    @GetMapping("/post")
    public ResponseEntity<?> getPostById(@RequestParam Long postId) {
        try {
            if (postId == null) {
                throw new RuntimeException("Please specify post id!");
            }

            return ResponseEntity.ok().body(postService.getPostById(postId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/recent")
    public ResponseEntity<?> getRecent() {
        try {
            return ResponseEntity.ok().body(postService.findPosts());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Override
    @PostMapping("/comments")
    public ResponseEntity<?> addACommentSection(@RequestParam Long postId, @RequestParam Long userId, @RequestParam String comment, Principal principal) {
        try {
            if (postId == null || userId == null || comment == null) {
                throw new RuntimeException("Please specify post id!");
            }

            userService.leaveACommentSection(postId, userId, comment, principal.getName());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/comments").toString());
            return ResponseEntity.created(uri).body(userService.leaveACommentSection(postId, userId, comment, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @PostMapping("/comment")
    public ResponseEntity<?> addAComment(@RequestParam Long commentSectionId, @RequestParam Long userId, @RequestParam String comment, Principal principal) {
        try {
            if (commentSectionId == null || userId == null || comment == null) {
                throw new RuntimeException("Please specify post id!");
            }

            userService.addAComment(commentSectionId, userId, comment, principal.getName());
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post/comment").toString());
            return ResponseEntity.created(uri).body(userService.addAComment(commentSectionId, userId, comment, principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @Override
    @GetMapping("/image/{name}")
    public ResponseEntity<?> getImage(@PathVariable("name") String name) {
        try {
            if (name.toLowerCase().endsWith(".png")) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG)
                        .body(storageService.getImage(name));
            } else if (name.toLowerCase().endsWith(".jpg")) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(storageService.getImage(name));
            } else {
                throw new RuntimeException("Image format error!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Download image fail");
        }
    }
}