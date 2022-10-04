package com.andersonmalheiro.productsapi.dto

import com.andersonmalheiro.productsapi.model.Category

class CategoryDTO {
    data class Create(
        val description: String
    ) {
        companion object {
            fun from(category: Category) = Create(description = category.description)
            fun to(data: Create) = Category(description = data.description)
        }
    }


}