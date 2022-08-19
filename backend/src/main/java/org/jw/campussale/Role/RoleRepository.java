package org.jw.campussale.Role;

import org.jw.campussale.Role.RoleEntity;
import org.jw.campussale.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    boolean existsByRoleType(RoleType roleType);
    RoleEntity findByRoleType(RoleType roleType);
}
