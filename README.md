# 🧢 Alpha-x (Gen Z) Translator

A high-vibe Spring Boot application that translates standard English into Gen Z slang (Alpha-x) and back using a rule-based grammar engine. No cap, this is peak engineering.

## 🎨 Frontend (New!)

A modern web interface built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

### Completed Tasks
- [x] Initialize Next.js frontend project with Tailwind CSS.
- [x] Implement API proxy routes in Next.js.
- [x] Develop translator UI components.
- [x] Integrate UI with API routes and backend.
- [x] Implement interactive **Grammar Playground** with drag-and-drop-style blocks.
- [x] Add **Glow Up Blocks** feature to translate assembled playground sentences.
- [x] Restructure `grammar.json` with dedicated **Noun** and **Verb** categories.
- [x] Develop categorized UI columns for **Nouns**, **Verbs**, and **Others**.
- [x] Implement strict **Subject** and **Action** selection slots in the Grammar Lab.
- [x] Add dynamic **-ing suffix** transformation toggle for Action verbs.

### Upcoming Tasks
- [ ] Verify full-stack integration of categorized grammar.

## 🚀 Quick Start
...
### Interactive Features
- **Blue Blocks**: Automatically generated from `grammar.json`. Click to add to the structure.
- **Visual Builder**: Assemble and clear your own Alpha-x compatible sentences.
- **Instant Translation**: Use the **Glow Up Blocks** button to see your assembled English phrase in Alpha-x.
...
### Run the Frontend
```bash
cd frontend
npm run dev
```

### Run Tests
```bash
./gradlew test
```

### External Test Script
```bash
./test/test_alpha_x.sh
```

## 📖 Rule-Based Grammar

The translator is powered by an external grammar configuration located at `src/main/resources/grammar.json`. This allows for complex pattern matching beyond simple word replacement.

### Grammar Structure
- **Categories**: Grouped vocabulary (e.g., `greeting`, `quality`, `mood`) used as variables in rules.
- **Rules**: Pattern-based translations using placeholders (e.g., `this is {quality}` ➡️ `this is {quality} fr fr ✨`).
- **Direct Mappings**: A comprehensive list of 100+ single-word slang replacements.

### Key Logic
- **Regex Compilation**: Rules are compiled into regex patterns with word-boundary awareness.
- **Overlap Prevention**: Single-pass regex replacement ensures words aren't translated twice.
- **Aesthetic Refinement**: Automatically strips trailing punctuation when adding vibe suffixes (like `fr fr ✨`) to maintain the "low effort" aesthetic.

## 🛠 API Endpoints

### 1. English ➡️ Gen Z
`POST /api/translate/to-alpha-x`

**Request:** `{"text": "this is good."}`
**Response:** `{"original": "this is good.", "translated": "this is valid fr fr ✨"}`

### 2. Gen Z ➡️ English
`POST /api/translate/to-english`

**Request:** `{"text": "low-key aura farming"}`
**Response:** `{"original": "low-key aura farming", "translated": "low key showing off"}`

## ☁️ Free Hosting Guide

You can host this full-stack application for free using **Render** (Backend) and **Vercel** (Frontend).

### 1. Backend (Render.com)
1. Create a new **Web Service** on Render and connect your GitHub repo.
2. Select **Docker** as the runtime.
3. Render will automatically use the root `Dockerfile` to build and deploy the Spring Boot app.
4. **Note:** The free tier spins down after inactivity, so the first request might be slow.

### 2. Frontend (Vercel.com)
1. Create a new project on Vercel and connect your GitHub repo.
2. Set the **Root Directory** to `frontend`.
3. Add an **Environment Variable**:
   - `BACKEND_URL`: The URL of your Render web service (e.g., `https://your-app.onrender.com`).
4. Deploy! Vercel will handle the Next.js build and serve your high-vibe UI.

## 🏗 Architecture

- **Kotlin 1.9.25** & **Spring Boot 3.4.2**
- **GrammarEngine**: Core logic for parsing `grammar.json` and executing regex-based rules.
- **TranslatorService**: Orchestrates the translation flow and aesthetic post-processing.
- **TranslationController**: REST interface.

## 📈 Issue Tracking
This project uses **bd (beads)**. 
- `bd ready`: See what's next.
- `bd show <id>`: Get the details.

---
*Built with ✨ vibes ✨*
