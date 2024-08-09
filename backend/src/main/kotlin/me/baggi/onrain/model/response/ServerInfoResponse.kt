package me.baggi.onrain.model.response

data class ServerInfoResponse(
    val id: Long,
    val ip: String,
    val serverName: String,
    val port: Int,
    val imageHash: String?,
    val online: Int,
    val peakOnline: Int,
    val hideIp: Boolean
)