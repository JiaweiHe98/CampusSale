package org.jw.campussale.Role;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.enums.RoleType;

import javax.persistence.*;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private RoleType roleType = RoleType.RESTRICTED;

    @ManyToMany
    private List<AppUserEntity> users;

}
