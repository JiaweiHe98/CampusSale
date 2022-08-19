package org.jw.campussale.repository;

import org.jw.campussale.Comment.CommentContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentContentRepository extends JpaRepository<CommentContentEntity, Long> {
}
