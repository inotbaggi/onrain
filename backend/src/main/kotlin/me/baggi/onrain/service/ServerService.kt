package me.baggi.onrain.service

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.request.AddServerRequest
import me.baggi.onrain.repository.ServerOnlineRepository
import me.baggi.onrain.repository.ServerRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.LocalDateTime


@Service
class ServerService(
    private val serverRepository: ServerRepository,
    private val serverOnlineRepository: ServerOnlineRepository
) {
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

}