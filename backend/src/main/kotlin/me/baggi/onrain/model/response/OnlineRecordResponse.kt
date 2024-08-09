package me.baggi.onrain.model.response

import java.util.*

data class OnlineRecordResponse(
    val time: Date,
    val onlineCount: Int?,
    val max: Int?
)
