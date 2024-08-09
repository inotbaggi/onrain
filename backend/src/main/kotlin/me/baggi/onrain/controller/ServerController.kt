package me.baggi.onrain.controller

import me.baggi.onrain.mapper.OnlineMapper
import me.baggi.onrain.model.response.OnlineRecordResponse
import me.baggi.onrain.model.response.ServerInfoResponse
import me.baggi.onrain.service.ServerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/server")
class ServerController(
    private val serverService: ServerService
) {
    @GetMapping("/{id}")
    fun getServer(@PathVariable id: Long): ServerInfoResponse? {
        return serverService.getServer(id)?.let { OnlineMapper.INSTANCE.toResponse(it) }
    }

    @GetMapping("/records/{id}/day")
    fun getDayOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastDays(id, 1).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }

    @GetMapping("/records/{id}/hour")
    fun getHourOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastMinutes(id, 60).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }

    @GetMapping("/records/{id}/three-day")
    fun getThreeDayOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastDays(id, 3).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }

    @GetMapping("/records/{id}/week")
    fun getWeekOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastDays(id, 7).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }

    @GetMapping("/records/{id}/month")
    fun getMonthOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastDays(id, 30).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }

    @GetMapping("/records/{id}/year")
    fun getYearOnlineRecords(@PathVariable id: Long): List<OnlineRecordResponse> {
        return serverService.getOnlineRecordsForLastDays(id, 365).map { OnlineMapper.INSTANCE.recordToResponse(it) }
    }
}