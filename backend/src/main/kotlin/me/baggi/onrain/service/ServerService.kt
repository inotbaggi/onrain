package me.baggi.onrain.service

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.dto.ServerPing
import me.baggi.onrain.model.request.AddServerRequest
import me.baggi.onrain.repository.ServerOnlineRepository
import me.baggi.onrain.repository.ServerRepository
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import reactor.core.publisher.Mono
import java.time.LocalDateTime
import java.util.*


@Service
class ServerService(
    private val serverRepository: ServerRepository,
    private val serverOnlineRepository: ServerOnlineRepository
) {
    val pingerClient = WebClient.builder().baseUrl("https://api.mcsrvstat.us/").build()
    val logger = LoggerFactory.getLogger(ServerService::class.java)!!

    fun addServer(server: AddServerRequest): Boolean {
        val data = serverRepository.findById(server.ip)
        if (data != null) {
            logger.warn("Found duplicate ip in database")
            return false
        }

        serverRepository.save(ServerInfo(server.ip, server.port, 0))
        return true
    }

    fun getServers(): List<ServerInfo> = serverRepository.findAll().toList()

    fun getServer(ip: String): ServerInfo? {
        return serverRepository.findById(ip)
    }

    fun getOnlineRecordsForLastMinutes(serverId: String, minutes: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusMinutes(minutes)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(serverId, startTime)
        return records.toList()
    }

    fun getOnlineRecordsForLastDays(serverId: String, days: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusDays(days)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(serverId, startTime)
        return records.toList()
    }

    fun getOnlineRecordsForLastMonth(serverId: String, months: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusMonths(months)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(serverId, startTime)
        return records.toList()
    }

    fun recordOnlineCheck(ip: String, online: Boolean, date: Date, onlineCount: Int?, max: Int?) {
        val server = getServer(ip) ?: return

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
        getServers().forEach {
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