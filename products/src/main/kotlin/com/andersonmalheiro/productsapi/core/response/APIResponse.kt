package com.andersonmalheiro.productsapi.core.response

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

class APIResponse<T>(
    val statusCode: Int,
    val message: String? = null,
    val data: T? = null,
    val stack: String? = null
) {

    companion object Factory {
        fun <T> create(
            statusCode: HttpStatus,
            message: String? = null,
            data: T? = null,
            stack: String? = null
        ): ResponseEntity<String> {
            val mapper = ObjectMapper()
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)

            val response = APIResponse(
                statusCode = statusCode.value(),
                message = message,
                data = data,
                stack = stack
            )

            return ResponseEntity.status(statusCode).body(mapper.writeValueAsString(response))
        }
    }
}