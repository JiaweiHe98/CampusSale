package org.jw.campussale.Post;


import java.util.List;

public interface PostService {

    List<PostEntity> findPosts();

    PostEntity getPostById(Long postId);

    PostEntity addAPost(PostEntity postEntity);

    PostEntity getPostByTitle(String title);

    void deleteAPost(Long postId);

}
