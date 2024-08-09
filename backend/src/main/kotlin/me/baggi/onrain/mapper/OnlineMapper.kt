package me.baggi.onrain.mapper

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.response.OnlineRecordResponse
import me.baggi.onrain.model.response.ServerInfoResponse
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.factory.Mappers
import java.time.LocalDateTime

@Mapper
interface OnlineMapper {
    companion object{
        var INSTANCE = Mappers.getMapper(OnlineMapper::class.java)
    }

    @Mapping(target = "ip", expression = "java(hideIp ? \"hided :)\" : serverInfo.getIp())")
    fun toResponse(serverInfo: ServerInfo): ServerInfoResponse

    fun recordToResponse(onlineRecord: ServerOnlineRecord): OnlineRecordResponse
}