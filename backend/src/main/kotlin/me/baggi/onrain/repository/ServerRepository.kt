package me.baggi.onrain.repository

import me.baggi.onrain.model.ServerInfo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ServerRepository : JpaRepository<ServerInfo, Long> {
    fun findById(ip: String): ServerInfo?
}