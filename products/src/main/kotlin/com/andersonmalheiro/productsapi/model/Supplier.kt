package com.andersonmalheiro.productsapi.model

import javax.persistence.*

@Entity
@Table(name = "SUPPLIER")
data class Supplier(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long,

    @Column(name = "NAME", nullable = false)
    val name: String
)
