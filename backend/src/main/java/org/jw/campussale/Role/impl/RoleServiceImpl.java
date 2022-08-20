package org.jw.campussale.Role.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.Role.RoleEntity;
import org.jw.campussale.Role.RoleRepository;
import org.jw.campussale.enums.RoleType;
import org.jw.campussale.Role.RoleService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public void addRoleIfNotInDatabase() {
        if (!roleRepository.existsByRoleType(RoleType.RESTRICTED)) {
            RoleEntity roleEntity = new RoleEntity();
            roleEntity.setRoleType(RoleType.RESTRICTED);
            roleRepository.save(roleEntity);
        }

        if (!roleRepository.existsByRoleType(RoleType.USER)) {
            RoleEntity roleEntity = new RoleEntity();
            roleEntity.setRoleType(RoleType.USER);
            roleRepository.save(roleEntity);
        }

        if (!roleRepository.existsByRoleType(RoleType.ADMIN)) {
            RoleEntity roleEntity = new RoleEntity();
            roleEntity.setRoleType(RoleType.ADMIN);
            roleRepository.save(roleEntity);
        }

        if (!roleRepository.existsByRoleType(RoleType.SUPER_ADMIN)) {
            RoleEntity roleEntity = new RoleEntity();
            roleEntity.setRoleType(RoleType.SUPER_ADMIN);
            roleRepository.save(roleEntity);
        }
    }

    @Override
    public RoleEntity getByRoleType(RoleType roleType) {
        RoleEntity roleEntity = roleRepository.findByRoleType(roleType);

        if (roleEntity == null) {
            log.error("Cannot find role: {}", roleType);
            return null;
        }

        return roleEntity;
    }

    public void addUserToRole(RoleType roleType, AppUserEntity appUserEntity) {
        RoleEntity roleEntity = getByRoleType(roleType);
        roleEntity.getUsers().add(appUserEntity);
    }
}
