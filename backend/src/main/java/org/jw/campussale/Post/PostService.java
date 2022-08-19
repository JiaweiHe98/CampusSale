package org.jw.campussale.Post;


public interface PostService {

    PostEntity getPostById(Long postId);

    PostEntity addAPost(PostEntity postEntity);

    PostEntity getPostByTitle(String title);

    void deleteAPost(Long postId);

}
