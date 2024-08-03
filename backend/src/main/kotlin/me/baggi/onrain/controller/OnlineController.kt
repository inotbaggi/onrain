package me.baggi.onrain.controller

import me.baggi.onrain.service.ServerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/")
class OnlineController(
    private val serverService: ServerService
) {
    @GetMapping("online/{server}")
    fun online(@PathVariable server: String): String {
        serverService.fetchServerInfo(server)
            .subscribe {
                println(it)
            }
        return "ok"
    }
}