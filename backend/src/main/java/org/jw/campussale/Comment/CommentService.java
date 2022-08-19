package org.jw.campussale.Comment;

public interface CommentService {

    CommentEntity getCommentSectionById(Long commentId);

    void deleteACommentSection(Long commentId);

    void deleteAComment(Long commentContentId);

}
