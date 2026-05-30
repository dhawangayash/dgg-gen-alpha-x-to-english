# Gen Z (Alpha-x) Language Translation Specification

This project translates between standard English and Gen Z slang (vibe-coding context).

## Translation Rules (English to Gen Z)

### 1. Vocabulary Mapping
Standard English words/phrases are replaced with their Gen Z equivalents. The mapping has been significantly expanded to include greetings, truth/emphasis, quality evaluation, style/reputation, mood/behavior, and internet culture.

(See README.md or TranslatorService.kt for the full list of mappings).

### 2. Suffixes and Punctuation
- Replace periods (`.`) with " fr fr ✨" at the end of assertive sentences.
- Lowercase everything for the "low effort" aesthetic.
- Remove hyphens (`-`) from English input (e.g., "low-key" -> "lowkey").

### 3. Grammar
- Lowercase everything for the "low effort" aesthetic.
- Use "is" instead of "are" (sometimes).
- Drop auxiliary verbs (e.g., "I'm going" -> "i'm finna").

## Translation Rules (Gen Z to English)
Reverse mapping based on the vocabulary table. Note that Gen Z slang is highly contextual, so reverse translation will be best-effort.

## Examples

| English | Gen Z |
|---------|-------|
| Hello, this food is very good. | what's good, this food is bussin fr fr ✨ |
| I made a mistake in the code. | i had a skill issue in the code 💀 |
| Are you serious? | you deadass? |

## Technical Implementation
- Vocabulary and rules are defined in `src/main/resources/grammar.json`.
- `GrammarEngine`: Parses the JSON and applies pattern-based rules using Regex.
- `TranslatorService`: Orchestrates the translation and handles final vibe additions.
- Maintain existing REST API structure.
