package me.baggi.onrain.model

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
data class ServerInfo(
    @Id
    val id: String,
    val port: Int,

    val serverName: String,
    @Column(name = "image_hash", length = 16384)
    var imageHash: String?,
    var online: Int?,
    var peakOnline: Int,

    @OneToMany(mappedBy = "serverInfo", cascade = [CascadeType.ALL])
    val onlineRecords: List<ServerOnlineRecord> = listOf()
)