package org.jw.campussale.Post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jw.campussale.enums.Category;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostMessageText {
    private Long userId;

    private Category category;

    private String title;

    private String description;

    private Double price;

}
