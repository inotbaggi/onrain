package me.baggi.onrain.controller

import me.baggi.onrain.mapper.OnlineMapper
import me.baggi.onrain.mapper.PingMapper
import me.baggi.onrain.model.dto.ServerPing
import me.baggi.onrain.model.response.ServerInfoResponse
import me.baggi.onrain.model.response.ServerPingResponse
import me.baggi.onrain.service.PingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/ping")
class PingController(
    private val pingService: PingService
) {
    @GetMapping("/{ip}")
    fun getServer(@PathVariable ip: String): ServerPingResponse? {
        return pingService.fetchServerInfo(ip, 25565).block()?.let { PingMapper.INSTANCE.toResponse(it) }
    }

    @GetMapping("/{ip}/{port}")
    fun getServerWithPort(@PathVariable ip: String, @PathVariable port: Int): ServerPingResponse? {
        return pingService.fetchServerInfo(ip, port).block()?.let { PingMapper.INSTANCE.toResponse(it) }
    }
}