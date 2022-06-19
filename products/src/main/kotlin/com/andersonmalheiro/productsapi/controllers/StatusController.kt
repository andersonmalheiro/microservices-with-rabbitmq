package com.andersonmalheiro.productsapi.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api")
class StatusController {
    @GetMapping("status")
    public fun getApiStatus(): ResponseEntity<HashMap<String, Any>> {
        val response = HashMap<String, Any>()

        response["service"] = "products-api"
        response["status"] = "up"
        response["httpStatus"] = HttpStatus.OK.value()

        return ResponseEntity.ok(response)
    }
}