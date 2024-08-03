package me.baggi.onrain

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class OnrainApplication

fun main(args: Array<String>) {
    runApplication<OnrainApplication>(*args)
}
