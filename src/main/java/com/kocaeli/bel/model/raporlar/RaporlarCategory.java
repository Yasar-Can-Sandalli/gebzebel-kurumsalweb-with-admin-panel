// RaporlarCategory.java
package com.kocaeli.bel.model.raporlar;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

//YCS
@Entity
@Table(name = "RAPORLAR_CATEGORY")
@Getter @Setter
@ToString(exclude = "raporlarList")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RaporlarCategory {

    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer categoryId;

    @Column(name = "category_name", nullable = false, length = 50, unique = true)
    private String categoryName;

    @OneToMany(mappedBy = "raporCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Raporlar> raporlarList = new ArrayList<>();
}
