package com.andersonmalheiro.productsapi.controllers

import arrow.core.Either
import com.andersonmalheiro.productsapi.core.response.APIResponse
import com.andersonmalheiro.productsapi.dto.CategoryDTO
import com.andersonmalheiro.productsapi.service.CategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/category")
class CategoryController(private val service: CategoryService) {

    @GetMapping("{id}")
    fun getById(@PathVariable("id") id: Long): ResponseEntity<String> {
        try {
            if (id < 0) {
                return APIResponse.create<Nothing>(
                    statusCode = HttpStatus.BAD_REQUEST,
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
                    APIResponse.create(HttpStatus.OK, data = result.value)
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            return APIResponse.create<Nothing>(
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
                message = e.message ?: "Something went wrong",
                stack = e.stackTraceToString()
            )
        }
    }

    @PostMapping
    fun createCategory(@RequestBody data: CategoryDTO.Create): ResponseEntity<String> {
        if (data.description.isEmpty()) {
            return APIResponse.create<Nothing>(
                statusCode = HttpStatus.BAD_REQUEST,
                message = "Description field is required"
            )
        }

        try {
            return when (val result = service.createCategory(CategoryDTO.Create.to(data))) {
                is Either.Left -> {
                    val error = result.value
                    APIResponse.create<Nothing>(
                        statusCode = HttpStatus.BAD_REQUEST,
                        message = error.message ?: "Something went wrong"
                    )
                }

                is Either.Right -> {
                    APIResponse.create(HttpStatus.CREATED, data = result.value)
                }
            }

        } catch (e: Exception) {
            e.printStackTrace()
            return APIResponse.create<Nothing>(
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
                message = e.message ?: "Something went wrong",
                stack = e.stackTraceToString()
            )
        }
    }

    @GetMapping
    fun listCategories(): ResponseEntity<String> {
        return try {
            val result = service.getAllCategories()
            APIResponse.create(statusCode = HttpStatus.OK, data = result)
        } catch (e: Exception) {
            e.printStackTrace()
            APIResponse.create<Nothing>(
                statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
                message = e.message ?: "Something went wrong",
                stack = e.stackTraceToString()
            )
        }
    }
}