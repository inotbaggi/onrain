package me.baggi.onrain.mapper

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.ServerOnlineRecord
import me.baggi.onrain.model.dto.ServerPing
import me.baggi.onrain.model.response.OnlineRecordResponse
import me.baggi.onrain.model.response.ServerInfoResponse
import me.baggi.onrain.model.response.ServerPingResponse
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.factory.Mappers

@Mapper
interface PingMapper {
    companion object{
        var INSTANCE = Mappers.getMapper(PingMapper::class.java)
    }

    @Mapping(target = "players", source = "players.online")
    fun toResponse(serverInfo: ServerPing): ServerPingResponse
}