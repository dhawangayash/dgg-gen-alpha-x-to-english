package com.vibes.alphax.translator

import org.springframework.web.bind.annotation.*

data class TranslationRequest(val text: String)
data class TranslationResponse(val original: String, val translated: String)

@RestController
@RequestMapping("/api/translate")
class TranslationController(private val translatorService: TranslatorService) {

    @PostMapping("/to-alpha-x")
    fun translateToAlphaX(@RequestBody request: TranslationRequest): TranslationResponse {
        val translated = translatorService.translateToAlphaX(request.text)
        return TranslationResponse(request.text, translated)
    }

    @PostMapping("/to-english")
    fun translateToEnglish(@RequestBody request: TranslationRequest): TranslationResponse {
        val translated = translatorService.translateToEnglish(request.text)
        return TranslationResponse(request.text, translated)
    }
}
