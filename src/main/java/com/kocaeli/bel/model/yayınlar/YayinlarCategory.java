package com.kocaeli.bel.model.yayınlar;

import com.kocaeli.bel.model.raporlar.Raporlar;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "YAYINLAR_CATEGORY")
@Getter
@Setter
@ToString(exclude = "yayinlarList")
public class YayinlarCategory {

    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;


    @Column(name = "category_name",nullable = false,unique = true)
    private String categoryName;

    @OneToMany(mappedBy = "yayinCategory", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private List<Yayinlar> yayinlarList = new ArrayList<>();
}
