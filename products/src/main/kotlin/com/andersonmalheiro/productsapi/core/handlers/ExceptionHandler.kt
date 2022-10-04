package com.andersonmalheiro.productsapi.core.handlers

import com.andersonmalheiro.productsapi.core.response.APIResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ExceptionHandler {
    @ExceptionHandler(NumberFormatException::class)
    fun handleInternalError(e: NumberFormatException): ResponseEntity<String> {
        return APIResponse.create<Nothing>(
            statusCode = HttpStatus.BAD_REQUEST,
            message = e.message ?: "The given value can't be parsed to a number",
            stack = e.stackTraceToString(),
        )
    }
}