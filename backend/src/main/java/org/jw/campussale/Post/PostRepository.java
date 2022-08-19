package org.jw.campussale.Post;

import org.jw.campussale.Post.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    PostEntity findByTitle(String title);
}
