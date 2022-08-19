package org.jw.campussale.Post;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;

public interface PostController {
    ResponseEntity<?> getPostById(@RequestParam Long id);

    ResponseEntity<?> addACommentSection(Long postId, Long userId, String comment);

    ResponseEntity<?> addAComment(Long commentSectionId, Long userId, String comment);
}
