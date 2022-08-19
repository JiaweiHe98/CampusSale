package org.jw.campussale.SignUp.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.Role.RoleEntity;
import org.jw.campussale.enums.RoleType;
import org.jw.campussale.Role.RoleService;
import org.jw.campussale.SignUp.SignUpService;
import org.jw.campussale.AppUser.SuperUserService;
import org.jw.campussale.AppUser.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class SignUpServiceImpl implements SignUpService {

    private final RoleService roleService;
    private final UserService userService;
    private final SuperUserService superUserService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AppUserEntity signUp(AppUserEntity appUserEntity) {

        userService.runtimeExceptionIfExistsByUsername(appUserEntity.getUsername(), "signUp(AppUser appUser)");
        userService.runtimeExceptionIfExistByEmail(appUserEntity.getEmail(), "signUp(AppUser appUser)");

        AppUserEntity toSave = new AppUserEntity();
        toSave.setUsername(appUserEntity.getUsername());
        toSave.setFirstname(appUserEntity.getFirstname());
        toSave.setLastname(appUserEntity.getLastname());
        toSave.setPassword(passwordEncoder.encode(appUserEntity.getPassword()));
        toSave.setEmail(appUserEntity.getEmail());
        toSave.setPhoneNumber(appUserEntity.getPhoneNumber());

        RoleEntity roleEntity = roleService.getByRoleType(RoleType.USER);
        roleEntity.setRoleType(RoleType.USER);
        toSave.getRoleEntities().add(roleEntity);

        toSave.setRegisteredTime(new Date());

        return superUserService.saveUser(toSave);
    }
}
