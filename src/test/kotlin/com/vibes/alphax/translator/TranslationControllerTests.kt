package com.vibes.alphax.translator

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post

@SpringBootTest
@AutoConfigureMockMvc
class TranslationControllerTests @Autowired constructor(
    val mockMvc: MockMvc
) {

    @Test
    fun `should translate to Gen Z via API`() {
        mockMvc.post("/api/translate/to-alpha-x") {
            contentType = MediaType.APPLICATION_JSON
            content = "{\"text\": \"hello\"}"
        }.andExpect {
            status { isOk() }
            jsonPath("$.translated") { value("what's good") }
        }
    }

    @Test
    fun `should translate to English via API`() {
        mockMvc.post("/api/translate/to-english") {
            contentType = MediaType.APPLICATION_JSON
            content = "{\"text\": \"what's good\"}"
        }.andExpect {
            status { isOk() }
            jsonPath("$.translated") { value("hello") }
        }
    }
}
