package org.jw.campussale.Role;

import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.enums.RoleType;

public interface RoleService {

    void addRoleIfNotInDatabase();

    RoleEntity getByRoleType(RoleType roleType);

    void addUserToRole(RoleType roleType, AppUserEntity appUserEntity);
}
