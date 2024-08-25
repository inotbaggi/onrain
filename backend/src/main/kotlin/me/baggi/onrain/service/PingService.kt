package me.baggi.onrain.service

import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.dto.ServerPing
import me.baggi.onrain.repository.ServerOnlineRepository
import me.baggi.onrain.repository.ServerRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.util.*
import java.util.concurrent.TimeUnit

@Service
class PingService(
    private val serverService: ServerService,
    private val serverRepository: ServerRepository,
    private val serverOnlineRepository: ServerOnlineRepository
) {
    val pingerClient = WebClient.builder()
        .baseUrl("https://api.ismcserver.online")
        .defaultHeader("Authorization", "eb0ce0c8-1a3d-486a-bbfb-8eee7005a1d6")
        .build()

    fun recordOnlineCheck(ip: String, serverPing: ServerPing) {
        val server = serverService.getServerByIp(ip) ?: return

        if (serverPing.players != null && serverPing.players.online > server.peakOnline) {
            server.peakOnline = serverPing.players.online
        }
        server.online = serverPing.players?.online ?: 0
        server.imageHash = serverPing.favicon
        serverRepository.save(server)

        val record = ServerOnlineRecord(
            serverInfo = server,
            online = serverPing.online,
            time = LocalDateTime.now(),
            onlineCount = serverPing.players?.online ?: 0,
            max = serverPing.players?.max ?: 0
        )
        serverOnlineRepository.save(record)
    }

    @Scheduled(fixedDelay = 60000 * 5)
    fun pingServers() {
        serverService.getServers().forEach {
            fetchServerInfo(it.ip).subscribe { data ->
                recordOnlineCheck(it.ip, data)
            }
        }
    }

    fun fetchServerInfo(ip: String): Mono<ServerPing> {
        return pingerClient.get()
            .uri("/$ip")
            .retrieve()
            .bodyToMono(ServerPing::class.java)
    }
}