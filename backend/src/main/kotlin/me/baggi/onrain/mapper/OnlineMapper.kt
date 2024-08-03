package me.baggi.onrain.mapper

import me.baggi.onrain.model.ServerInfo
import me.baggi.onrain.model.response.ServerInfoResponse
import org.mapstruct.Mapper
import org.mapstruct.factory.Mappers

@Mapper
interface OnlineMapper {
    companion object{
        var INSTANCE = Mappers.getMapper(OnlineMapper::class.java)
    }

    fun toResponse(serverInfo: ServerInfo): ServerInfoResponse
}