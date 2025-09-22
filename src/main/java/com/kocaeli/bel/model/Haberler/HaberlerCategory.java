package com.kocaeli.bel.model.Haberler;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "HABERLER_CATEGORY")
@Getter
@Setter
@ToString(exclude = "haberlerList")
public class HaberlerCategory {


    @Id
    @Column(name = "category_id")
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "haberlercategory_seq_gen")
    //@SequenceGenerator(name = "haberlercategory_seq_gen", sequenceName = "HABERLERCATEGORY_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;


    @Column(name = "category_name",nullable = false,unique = true)
    private String categoryName;

    @OneToMany(mappedBy = "haberCategory", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private List<Haberler> haberlerList = new ArrayList<>();
}
