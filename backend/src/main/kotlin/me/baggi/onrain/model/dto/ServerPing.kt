package me.baggi.onrain.model.dto

data class ServerPing(
    val online: Boolean,
    val host: String?,
    val port: Int?,
    val favicon: String?,
    //val version: String?,
    val software: String?,
    val players: PlayersPing?
)

data class PlayersPing(
    val online: Int,
    val max: Int,
)