package com.andersonmalheiro.productsapi.service

import arrow.core.Either
import com.andersonmalheiro.productsapi.model.Category
import com.andersonmalheiro.productsapi.repository.CategoryRepository
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

@Service
class CategoryService(private val repository: CategoryRepository) {
    fun createCategory(data: Category): Either<IllegalArgumentException, Category>  {
        return try {
            val result = repository.save(data)
            Either.Right(result)
        } catch (e: IllegalArgumentException) {
            Either.Left(e)
        }
    }

    fun getAllCategories(): List<Category> {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"))
    }

    fun getCategoryById(id: Long): Either<Nothing?, Category> {
        val category = repository.findById(id)

        return when (category.isPresent) {
            true -> Either.Right(category.get())
            false -> Either.Left(null)
        }
    }

    fun deleteCategory(id: Long) = repository.deleteById(id)

    fun deleteCategoryInBatch(ids: List<Long>) = repository.deleteAllByIdInBatch(ids)
}