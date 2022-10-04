package com.andersonmalheiro.productsapi.controllers

import arrow.core.Either
import com.andersonmalheiro.productsapi.core.response.APIResponse
import com.andersonmalheiro.productsapi.model.Category
import com.andersonmalheiro.productsapi.service.CategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/category")
class CategoryController(private val service: CategoryService) {

    @GetMapping("{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<String> {
        try {
            if (id < 0) {
                return APIResponse.create<Nothing>(
                    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
                    message = "Invalid ID value"
                )
            }

            return when (val result = service.getCategoryById(id)) {
                is Either.Left -> {
                    APIResponse.create<Nothing>(
                        statusCode = HttpStatus.NOT_FOUND,
                        message = "Category not found"
                    )
                }

                is Either.Right -> {
                    APIResponse.create<Category>(HttpStatus.OK, data = result.value)
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return APIResponse.create<Nothing>(statusCode = HttpStatus.OK, stack = e.stackTraceToString())
        }
    }
}