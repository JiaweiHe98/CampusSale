package org.jw.campussale.AppUser;

import org.jw.campussale.AppUser.AppUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUserEntity, Long> {
    AppUserEntity findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
