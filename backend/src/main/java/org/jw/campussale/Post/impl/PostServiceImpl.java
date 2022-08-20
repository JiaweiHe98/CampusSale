package org.jw.campussale.Post.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.Post.PostRepository;
import org.jw.campussale.Post.PostService;
import org.jw.campussale.Post.SuperPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final SuperPostService superPostService;

    @Override
    public List<PostEntity> findPosts() {
        return postRepository.findAll();
    }

    @Override
    public PostEntity getPostById(Long postId) {
        PostEntity postEntity = postRepository.findById(postId).orElse(null);

        if (postEntity == null) {
            log.error("Cannot find post: {} in getPostById(Long postId)!", postId);
            throw new RuntimeException("Cannot find post id: " + postId);
        }

        return postEntity;
    }


    // do not directly call from the outsize (go through user service)
    @Override
    public PostEntity addAPost(PostEntity postEntity) {
//        PostEntity toAdd = new PostEntity();
//        toAdd.setAppUserEntity(postEntity.getAppUserEntity());
//        toAdd.setCategory(postEntity.getCategory());
//        toAdd.setTitle(postEntity.getTitle());
//        toAdd.setDescription(postEntity.getDescription());
//        toAdd.setPrice(postEntity.getPrice());
        postEntity.setPostedTime(new Date());

        return superPostService.savePost(postEntity);
    }

    @Override
    public PostEntity getPostByTitle(String title) {
        PostEntity postEntity = postRepository.findByTitle(title);

        if (postEntity == null) {
            log.error("Cannot find post: {} in getPostByTitle(String title)!", title);
            throw new RuntimeException("Cannot find post title: " + title);
        }

        return postEntity;
    }

    @Override
    public void deleteAPost(Long postId) {

        PostEntity toDelete = getPostById(postId);

        for (AppUserEntity appUserEntity : toDelete.getLiked()) {
            appUserEntity.getSaved().remove(toDelete);
        }

        postRepository.deleteById(postId);
    }

}
