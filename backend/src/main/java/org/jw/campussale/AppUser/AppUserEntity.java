package org.jw.campussale.AppUser;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jw.campussale.Post.PostEntity;
import org.jw.campussale.Role.RoleEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String phoneNumber;

    @Column(unique = true)
    @NotNull
    private String email;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    private List<PostEntity> saved = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostEntity> postEntities = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<RoleEntity> roleEntities = new ArrayList<>();

    @NotNull
    private Date registeredTime;

    @JsonIgnore
    private String token;

}
