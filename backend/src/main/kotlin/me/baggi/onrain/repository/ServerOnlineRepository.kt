package me.baggi.onrain.repository

import io.lettuce.core.dynamic.annotation.Param
import me.baggi.onrain.model.ServerOnlineRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface ServerOnlineRepository : JpaRepository<ServerOnlineRecord, Long> {
    fun findByServerInfoIdAndTimeAfter(serverInfoId: Long, last24Hours: LocalDateTime): List<ServerOnlineRecord>
}