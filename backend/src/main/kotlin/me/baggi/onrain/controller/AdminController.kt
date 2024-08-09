package me.baggi.onrain.controller

import me.baggi.onrain.mapper.OnlineMapper
import me.baggi.onrain.model.request.AddServerRequest
import me.baggi.onrain.service.PingService
import me.baggi.onrain.service.ServerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/admin")
class AdminController(
    private val serverService: ServerService,
    private val pingService: PingService,
) {
    @PostMapping("/server/add")
    fun addServer(@RequestBody addServerRequest: AddServerRequest) {
        serverService.addServer(addServerRequest)
    }

    @GetMapping("/server/list")
    fun listServers() = serverService.getServers().map { OnlineMapper.INSTANCE.toResponse(it) }

    @PostMapping("/server/ping")
    fun update() {
        pingService.pingServers()
    }
}