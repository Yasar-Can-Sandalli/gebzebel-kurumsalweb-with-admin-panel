package com.kocaeli.bel.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "ILETISIM_SIKAYET")
public class IletisimSikayet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "iletisim_seq")
    @SequenceGenerator(name = "iletisim_seq", sequenceName = "ILETISIM_SIKAYET_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Integer Id;

    @Column(name = "first_name")
    private  String firstName;

    @Column(name = "last_name")
    private  String lastName;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;

    @Column(name = "description",length = 500)
    private String description;

    @Column(name = "tckn" ,length = 11)
    private String tckn;

    // ---- TEK YÖNLÜ Many-To-Many: Şikayet --> Etiket ----
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "SIKAYET_ETIKET",
            joinColumns = @JoinColumn(name = "SIKAYET_ID"),
            inverseJoinColumns = @JoinColumn(name = "ETIKET_ID")
    )
    private Set<Etiket> etiketler = new HashSet<>();
}
