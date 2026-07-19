# AI Prompt Log

## Project Overview

This project uses the Google Gemini API to analyze guest reviews submitted by users. The AI processes each review and returns structured JSON containing the review sentiment, detected themes, a concise summary, a professional response suggestion, and sarcasm detection results. The prompt was refined through multiple iterations to improve response consistency and ensure valid JSON output.

---

# Prompt Variation 1

## Prompt

```
Analyze the following guest review and identify its sentiment. Also provide a short summary.
```

### Example Input

```
The room was clean and spacious, but the Wi-Fi was very slow.
```

### Example Output

```
Sentiment: Neutral

Summary:
The guest appreciated the room quality but was dissatisfied with the Wi-Fi.
```

### Observation

This prompt produced useful summaries but returned plain text responses with inconsistent formatting, making it unsuitable for direct API integration.

---

# Prompt Variation 2

## Prompt

```
Analyze the guest review and return the sentiment, themes, summary, response suggestion, and sarcasm detection as JSON.
```

### Example Input

```
The staff were friendly and the room was spotless. Breakfast could have been better.
```

### Example Output

```json
{
  "sentiment": "Positive",
  "themes": [
    "Cleanliness",
    "Host Behaviour",
    "Food"
  ],
  "summary": "The guest appreciated the staff and cleanliness but expected better breakfast quality.",
  "response_suggestion": "Thank you for your valuable feedback. We are delighted you enjoyed your stay and will work on improving our breakfast experience.",
  "sarcasm_detected": false
}
```

### Observation

The output structure improved significantly, but the AI occasionally included Markdown code fences or additional explanations around the JSON response.

---

# Prompt Variation 3 (Final)

## Prompt

The final implementation uses a structured system prompt with strict output rules.

### Example Input

```
The kitchen was fully stocked with modern appliances, though a washing machine would have made it a perfect five stars.
```

### Example Output

```json
{
  "sentiment": "Positive",
  "themes": [
    "Amenities",
    "Overall Experience"
  ],
  "summary": "The guest appreciated the modern kitchen amenities but suggested adding a washing machine to further improve the experience.",
  "response_suggestion": "Thank you for your wonderful review. We appreciate your feedback and will consider your suggestion while improving our guest experience.",
  "sarcasm_detected": false
}
```

### Observation

This version consistently produced valid JSON without Markdown formatting and strictly followed the required schema, making it suitable for direct integration into the application.

---

# Best Performing Prompt

Prompt Variation 3 produced the most reliable results. It consistently returned valid JSON that matched the required schema without additional explanations or Markdown formatting. Restricting the possible themes and sentiment values also improved consistency across different reviews. This version was selected as the production prompt because it could be parsed directly by the frontend without additional processing.

---

# System Prompt (Production)

```text
You are an expert hospitality review analyst.

Analyze the guest review and return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not wrap the JSON in triple backticks.

Return exactly this structure:

{
  "sentiment": "Positive | Neutral | Negative",
  "themes": [],
  "summary": "",
  "response_suggestion": "",
  "sarcasm_detected": false
}

Rules:

- Sentiment must be one of:
Positive
Neutral
Negative

- Themes must ONLY come from this list:
Cleanliness
Food
Host Behaviour
Location
Wi-Fi
Amenities
Value for Money
Overall Experience

- summary should be 1–2 concise sentences.

- response_suggestion should be polite and professional.

- sarcasm_detected must be either true or false.
```