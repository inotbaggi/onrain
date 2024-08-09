package me.baggi.onrain.service

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.request.AddServerRequest
import me.baggi.onrain.repository.ServerOnlineRepository
import me.baggi.onrain.repository.ServerRepository
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import kotlin.jvm.optionals.getOrNull

@Service
class ServerService(
    private val serverRepository: ServerRepository,
    private val serverOnlineRepository: ServerOnlineRepository
) {
    val logger = LoggerFactory.getLogger(ServerService::class.java)!!

    fun addServer(server: AddServerRequest): Boolean {
        val data = serverRepository.findServerInfoByIp(server.ip)
        if (data != null) {
            logger.warn("Found duplicate ip in database")
            return false
        }

        serverRepository.save(ServerInfo(
            ip = server.ip,
            port = server.port,
            serverName = server.serverName,
            imageHash = null,
            online = 0,
            hideIp = server.hideIp,
            peakOnline = 0
        ))
        return true
    }

    fun getServers(): List<ServerInfo> = serverRepository.findAll().toList()

    fun getServerByIp(ip: String): ServerInfo? {
        return serverRepository.findServerInfoByIp(ip)
    }

    fun getServer(id: Long): ServerInfo? {
        return serverRepository.findById(id).getOrNull()
    }

    fun getTopByOnline(count: Int): List<ServerInfo> {
        val pageable = PageRequest.of(0, count, Sort.by(Sort.Order.desc("online")))
        return serverRepository.findAll(pageable).toList()
    }

    fun getTopByPeakOnline(count: Int): List<ServerInfo> {
        val pageable = PageRequest.of(0, count, Sort.by(Sort.Order.desc("peakOnline")))
        return serverRepository.findAll(pageable).toList()
    }

    fun getOnlineRecordsForLastMinutes(id: Long, minutes: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusMinutes(minutes)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(id, startTime)
        return records.toList()
    }

    fun getOnlineRecordsForLastDays(id: Long, days: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusDays(days)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(id, startTime)
        return records.toList()
    }

    fun getOnlineRecordsForLastMonth(id: Long, months: Long): List<ServerOnlineRecord> {
        val startTime = LocalDateTime.now().minusMonths(months)
        val records = serverOnlineRepository.findRecordsByServerIdAndTimestampAfter(id, startTime)
        return records.toList()
    }

}