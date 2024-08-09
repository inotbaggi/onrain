package me.baggi.onrain.model.request

data class AddServerRequest(
    val ip: String,
    val port: Int,
    val serverName: String,
    val hideIp: Boolean
)
