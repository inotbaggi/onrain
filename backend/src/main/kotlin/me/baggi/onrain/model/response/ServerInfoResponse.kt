package me.baggi.onrain.model.response

import java.util.*

data class ServerInfoResponse(
    val id: String,
    val port: Int,
    var peakOnline: Int,
    val onlineRecords: List<OnlineRecordResponse>
)

data class OnlineRecordResponse(
    val online: Boolean,
    val date: Date,
    val onlineCount: Int?,
    val max: Int?
)