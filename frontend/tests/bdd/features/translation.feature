Feature: Language Translation
  As a user who wants to speak Gen Z (Alpha-x)
  I want to translate English text to Alpha-x and back
  So that I can communicate with high vibes

  Scenario: Translate English to Alpha-x
    Given I am on the Alpha-x Translator home page
    When I type "hello world." in the English input field
    And I click the "Glow Up" button in the "English to Alpha-x" section
    Then I should see "what's good world fr fr ✨" in the Alpha-x result area

  Scenario: Translate Alpha-x back to English
    Given I am on the Alpha-x Translator home page
    When I type "what's good bestie" in the Alpha-x input field
    And I click the "Un-vibe" button in the "Alpha-x to English" section
    Then I should see "hello friend" in the English result area


  Scenario: Use Grammar Lab to build a sentence
    Given I am on the Alpha-x Translator home page
    When I click the "friend" block in the Nouns column
    And I click the "think" block in the Verbs column
    And I click the "Glow Up Full Sentence ✨" button
    Then I should see "bestie cook" in the Alpha-x Lab output
