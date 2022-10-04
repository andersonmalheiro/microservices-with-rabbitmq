package com.andersonmalheiro.productsapi.model

import javax.persistence.*

@Entity
@Table(name = "CATEGORY")
data class Category(
    @Column(name = "DESCRIPTION", nullable = false)
    val description: String,

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long? = null,
)
