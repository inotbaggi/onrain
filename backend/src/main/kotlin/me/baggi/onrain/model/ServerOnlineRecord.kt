package me.baggi.onrain.model

import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.Date

@Entity
data class ServerOnlineRecord(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = -1,

    @ManyToOne(fetch = FetchType.LAZY)
    val serverInfo: ServerInfo,

    val online: Boolean,
    val time: LocalDateTime,
    val onlineCount: Int?, // nullable if offline
    val max: Int?
)
