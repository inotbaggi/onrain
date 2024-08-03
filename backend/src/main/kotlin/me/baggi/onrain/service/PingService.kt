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

@Service
class PingService(
    private val serverService: ServerService,
    private val serverRepository: ServerRepository,
    private val serverOnlineRepository: ServerOnlineRepository
) {
    val pingerClient = WebClient.builder().baseUrl("https://api.mcsrvstat.us/").build()

    fun recordOnlineCheck(ip: String, online: Boolean, date: Date, onlineCount: Int?, max: Int?) {
        val server = serverService.getServer(ip) ?: return

        if (onlineCount != null && onlineCount > server.peakOnline) {
            server.peakOnline = onlineCount
        }
        serverRepository.save(server)

        val record = ServerOnlineRecord(
            serverInfo = server,
            online = online,
            time = LocalDateTime.now(),
            onlineCount = onlineCount,
            max = max
        )
        serverOnlineRepository.save(record)
    }

    @Scheduled(fixedDelay = 5000)
    fun pingServers() {
        println("test")
        serverService.getServers().forEach {
            println("Fetching ${it.id}")
            fetchServerInfo(it.id).subscribe { data ->
                println("Fetched info: $data")
                recordOnlineCheck(it.id,
                    data.online,
                    Date(),
                    data.players?.online,
                    data.players?.max)
            }
        }
    }

    fun fetchServerInfo(ip: String): Mono<ServerPing> {
        return pingerClient.get()
            .uri("/3/$ip")
            .retrieve()
            .bodyToMono(ServerPing::class.java)
    }
}