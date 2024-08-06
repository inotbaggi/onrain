package me.baggi.onrain.model.response

import java.time.LocalDateTime
import java.util.*

data class ServerInfoResponse(
    val id: String,
    val serverName: String,
    val port: Int,
    val imageHash: String?,
    val online: Int,
    val peakOnline: Int,
  //  val onlineRecords: List<OnlineRecordResponse>
)

data class OnlineRecordResponse(
    val online: Boolean,
    val time: LocalDateTime,
    val onlineCount: Int?,
    val max: Int?
)