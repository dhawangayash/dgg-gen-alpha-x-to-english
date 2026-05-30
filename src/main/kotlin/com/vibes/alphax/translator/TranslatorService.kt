package com.vibes.alphax.translator

import org.springframework.stereotype.Service

@Service
class TranslatorService(private val grammarEngine: GrammarEngine) {

    fun translateToAlphaX(input: String): String {
        if (input.isEmpty()) return ""
        
        var result = grammarEngine.translateToGenz(input)

        // Add some vibes (fallback if not handled by rules)
        val cleanResult = result.trimEnd('.', ' ', '!', '?')
        val endsWithVibe = cleanResult.endsWith("✨") || cleanResult.endsWith("fr fr") || cleanResult.endsWith("ong")
        
        if (input.endsWith(".") && !endsWithVibe) {
            result = cleanResult + " fr fr ✨"
        } else if (endsWithVibe) {
            result = cleanResult
        }

        return result
    }

    fun translateToEnglish(input: String): String {
        if (input.isEmpty()) return ""
        return grammarEngine.translateToEnglish(input)
    }
}
