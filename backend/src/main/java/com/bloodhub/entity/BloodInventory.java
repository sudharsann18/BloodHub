package com.bloodhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "blood_inventory",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_bloodbank_bloodgroup",
                        columnNames = {"blood_bank_id", "blood_group"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(nullable = false)
    private Integer units;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_bank_id")
    private User bloodBank;
}