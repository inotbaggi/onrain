package me.baggi.onrain.model

import jakarta.persistence.*

@Entity
data class ServerInfo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = -1,

    val ip: String,
    val port: Int,

    val serverName: String,
    @Column(name = "image_hash", length = 16384)
    var imageHash: String?,
    var online: Int?,
    var peakOnline: Int,
    var hideIp: Boolean = false,

    @OneToMany(mappedBy = "serverInfo", cascade = [CascadeType.ALL])
    val onlineRecords: List<ServerOnlineRecord> = listOf()
)