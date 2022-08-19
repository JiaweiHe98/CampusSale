package org.jw.campussale.Post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.Post.PostRepository;
import org.jw.campussale.Post.SuperPostService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SuperPostServiceImpl implements SuperPostService {

    private final PostRepository postRepository;
    @Override
    public PostEntity savePost(PostEntity postEntity) {
        return postRepository.save(postEntity);
    }

}
