package me.baggi.onrain.model.dto

data class ServerPing(
    val online: Boolean,
    val ip: String?,
    val port: Int?,
    val version: String?,
    val software: String?,
    val players: PlayersPing?
)

data class PlayersPing(
    val online: Int,
    val max: Int,
)