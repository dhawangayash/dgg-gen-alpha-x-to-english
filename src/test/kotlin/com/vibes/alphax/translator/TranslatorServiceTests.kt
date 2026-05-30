package com.vibes.alphax.translator

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class TranslatorServiceTests {

    private val grammarEngine = GrammarEngine()
    private val translatorService = TranslatorService(grammarEngine)

    @Test
    fun `should translate hello to genz`() {
        assertEquals("what's good", translatorService.translateToAlphaX("hello"))
    }

    @Test
    fun `should translate mistake to skill issue`() {
        assertEquals("i had a skill issue", translatorService.translateToAlphaX("i had a mistake"))
    }

    @Test
    fun `should add vibes to assertive sentences`() {
        // "this is good." -> "this is valid fr fr ✨"
        assertEquals("this is valid fr fr ✨", translatorService.translateToAlphaX("this is good."))
    }

    @Test
    fun `should handle multi-word phrases like very good`() {
        // "this is very good" -> "this is fire fr fr ✨"
        assertEquals("this is fire fr fr ✨", translatorService.translateToAlphaX("this is very good"))
    }

    @Test
    fun `should translate back to english`() {
        assertEquals("this is delicious.", translatorService.translateToEnglish("this is bussin fr fr ✨"))
        assertEquals("hello friend", translatorService.translateToEnglish("what's good bestie"))
    }

    @Test
    fun `should handle empty string`() {
        assertEquals("", translatorService.translateToAlphaX(""))
        assertEquals("", translatorService.translateToEnglish(""))
    }
}
