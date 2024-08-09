package me.baggi.onrain.repository

import io.lettuce.core.dynamic.annotation.Param
import me.baggi.onrain.model.ServerOnlineRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface ServerOnlineRepository : JpaRepository<ServerOnlineRecord, Long> {
    @Query("SELECT r FROM ServerOnlineRecord r WHERE r.time >= :startTime AND r.serverInfo.id = :serverId")
    fun findRecordsByServerIdAndTimestampAfter(
        @Param("serverId") serverId: Long,
        @Param("startTime") startTime: LocalDateTime
    ): List<ServerOnlineRecord>

    @Query("SELECT ServerOnlineRecord(FUNCTION('date_trunc', :interval, r.time), AVG(r.onlineCount)) FROM ServerOnlineRecord r " +
                "WHERE r.serverInfo.id = :serverId AND r.time >= :startTime " +
                "GROUP BY FUNCTION('date_trunc', :interval, r.time) " +
                "ORDER BY FUNCTION('date_trunc', :interval, r.time)")
    fun findAggregatedRecordsByServerIdAndTimestampAfter(
        @Param("serverId") serverId: Long,
        @Param("startTime") startTime: LocalDateTime,
        @Param("interval") interval: String?
    ): List<ServerOnlineRecord>
}