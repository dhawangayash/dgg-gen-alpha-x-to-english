package com.vibes.alphax.translator

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import java.util.regex.Pattern

@Component
class GrammarEngine {

    data class GrammarRule(
        val description: String,
        val englishPattern: String,
        val genzPattern: String
    )

    data class GrammarData(
        val categories: Map<String, Map<String, String>>,
        val rules: List<GrammarRule>,
        val directMappings: Map<String, String>
    )

    private val grammar: GrammarData
    private val compiledRules: List<CompiledRule>
    private val englishToGenzMap: Map<String, String>
    private val genzToEnglishMap: Map<String, String>

    data class CompiledRule(
        val regex: Regex,
        val englishPattern: String,
        val genzPattern: String,
        val placeholders: List<String>
    )

    init {
        val mapper = jacksonObjectMapper()
        val resource = ClassPathResource("grammar.json")
        grammar = mapper.readValue(resource.inputStream)

        compiledRules = grammar.rules.map { compileRule(it) }
        
        // Flatten categories and direct mappings for single-word lookup
        val tempMap = mutableMapOf<String, String>()
        grammar.categories.values.forEach { tempMap.putAll(it) }
        tempMap.putAll(grammar.directMappings)
        englishToGenzMap = tempMap
        genzToEnglishMap = tempMap.entries.associate { (k, v) -> v to k }
    }

    private fun compileRule(rule: GrammarRule): CompiledRule {
        val placeholders = mutableListOf<String>()
        val regexString = rule.englishPattern.replace(Regex("\\{(\\w+)\\}")) { match ->
            val category = match.groupValues[1]
            placeholders.add(category)
            val options = grammar.categories[category]?.keys?.joinToString("|") { Pattern.quote(it) }
                ?: "\\w+"
            "($options)"
        }
        return CompiledRule(Regex("\\b$regexString\\b", RegexOption.IGNORE_CASE), rule.englishPattern, rule.genzPattern, placeholders)
    }

    fun translateToGenz(input: String): String {
        var result = input.lowercase().replace("-", "")

        // 1. Apply rules first
        for (rule in compiledRules) {
            result = rule.regex.replace(result) { match ->
                var replacement = rule.genzPattern
                rule.placeholders.forEachIndexed { index, category ->
                    val englishWord = match.groupValues[index + 1]
                    val genzWord = grammar.categories[category]?.get(englishWord) ?: englishWord
                    replacement = replacement.replace("{$category}", genzWord)
                }
                // Mark this part as "translated" by adding a non-alphabetic marker if needed,
                // but for now, rules are usually multi-word and less likely to overlap with single words
                // in a way that causes issues if we apply them in order.
                replacement
            }
        }

        // 2. Apply single word mappings in a single pass to avoid overlapping
        val pattern = englishToGenzMap.keys.sortedByDescending { it.length }
            .joinToString("|") { Pattern.quote(it) }
        val regex = Regex("\\b($pattern)\\b", RegexOption.IGNORE_CASE)
        
        result = regex.replace(result) { match ->
            val word = match.value.lowercase()
            englishToGenzMap[word] ?: word
        }

        return result
    }

    fun translateToEnglish(input: String): String {
        var result = input.lowercase().replace("-", " ")
            .replace(" fr fr ✨", ".")
            .replace(" fr fr", "")
            .replace(" ong", "")

        // Reverse rules (simplified: just reverse the single words within common patterns)
        // For now, let's just do single word reversal from the flattened map
        val sortedKeys = genzToEnglishMap.keys.sortedByDescending { it.length }
        for (key in sortedKeys) {
            result = result.replace(Regex("\\b${Pattern.quote(key)}\\b"), genzToEnglishMap[key]!!)
        }

        return result
    }
}
