package org.jw.campussale.Post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jw.campussale.AppUser.AppUserEntity;
import org.jw.campussale.enums.Category;
import org.jw.campussale.Comment.CommentEntity;
import org.jw.campussale.Image.ImageLocationEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @NotNull
    private AppUserEntity appUserEntity;

    @NotNull
    private Category category;

    @NotNull
    private String title;

    private String description;

    @NotNull
    private Double price;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ImageLocationEntity> images = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<AppUserEntity> liked = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<CommentEntity> commentEntityList = new ArrayList<>();

    @NotNull
    private Date postedTime;



}
