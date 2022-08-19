package org.jw.campussale.Comment.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.Comment.CommentEntity;
import org.jw.campussale.repository.CommentContentRepository;
import org.jw.campussale.repository.CommentRepository;
import org.jw.campussale.Comment.CommentService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentContentRepository commentContentRepository;

    @Override
    public CommentEntity getCommentSectionById(Long commentId) {
        CommentEntity commentEntity = commentRepository.findById(commentId).orElse(null);
        if (commentEntity == null) {
            log.error("Cannot find comment id: {}", commentId);
            throw new RuntimeException("Cannot find comment id: " + commentId);
        }

        return commentEntity;
    }

    @Override
    public void deleteACommentSection(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            log.error("Comment does not exist id: {}, in {}", commentId, "deleteACommentSection(Long commentId)");
            throw new RuntimeException("Comment id: " + commentId + " does not exist!");
        }

        commentRepository.deleteById(commentId);
    }

    @Override
    public void deleteAComment(Long commentContentId) {
        if (!commentContentRepository.existsById(commentContentId)) {
            log.error("Comment does not exist id: {}, in {}", commentContentId, "deleteAComment(Long commentContentId)");
            throw new RuntimeException("Comment id: " + commentContentId + " does not exist!");
        }

        commentContentRepository.deleteById(commentContentId);
    }
}
