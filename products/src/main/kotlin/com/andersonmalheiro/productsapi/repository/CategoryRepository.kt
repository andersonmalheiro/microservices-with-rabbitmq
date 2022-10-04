package com.andersonmalheiro.productsapi.repository

import com.andersonmalheiro.productsapi.model.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository: JpaRepository<Category, Long>