package org.jw.campussale.AppUser.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.AppUser.UserRepository;
import org.jw.campussale.AppUser.SuperUserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class SuperUserServiceImpl implements SuperUserService {

    final UserRepository userRepository;

    public AppUserEntity saveUser(AppUserEntity user) {
        log.info("New save user: '{}'", user.getUsername());
        return userRepository.save(user);
    }
}
