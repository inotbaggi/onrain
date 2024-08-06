package me.baggi.onrain.controller

import me.baggi.onrain.mapper.OnlineMapper
import me.baggi.onrain.model.response.ServerInfoResponse
import me.baggi.onrain.service.ServerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/top")
class TopController(
    private val serverService: ServerService
) {
    @GetMapping("/online")
    fun getOnlineTop(@RequestParam count: Int): List<ServerInfoResponse> {
        return serverService.getTopByOnline(count).map {
            OnlineMapper.INSTANCE.toResponse(it)
        }
    }

    @GetMapping("/peak-online")
    fun getPeakOnlineTop(@RequestParam count: Int): List<ServerInfoResponse> {
        return serverService.getTopByPeakOnline(count).map {
            OnlineMapper.INSTANCE.toResponse(it)
        }
    }
}