package com.andersonmalheiro.productsapi.model

import javax.persistence.*

@Entity
@Table(name = "PRODUCT")
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long,

    @Column(name = "NAME", nullable = false)
    val name: String,

    @ManyToOne
    @JoinColumn(name = "FK_CATEGORY", nullable = false)
    val category: Category,

    @ManyToOne
    @JoinColumn(name = "FK_SUPPLIER", nullable = false)
    val supplier: Supplier,

    @Column(name = "QUANTITY", nullable = false)
    val quantity: Int,
)
