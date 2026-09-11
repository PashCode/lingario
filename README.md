# Lingario

**Learn the 3000 most useful English words — without thinking about which words to learn.**

Lingario is a web app for learning English words. The main idea is simple: the words are already inside the app. You only choose the words you don't know. The app does the rest — makes example phrases with AI, adds audio, gives you five types of exercises, and tells you when to repeat every word.

## 🌐 Try it live: **[lingario.app](https://lingario.app)**

No installation needed. You can try everything in one click with anonymous mode.

---

## The Problem

Every vocabulary app I tried had the same problem: **an empty dictionary**.

You open the app, and it says "add your words". But beginners don't know which words to add — that is why they are beginners. So people quit, or spend hours adding random words from the internet.

Lingario removes this step:

- The app already has the **Oxford 3000** inside — a list of the most important English words, with levels (A1–B2) and translations.
- You don't build your dictionary from zero. You look at the words and make one simple choice: **"I know it"** or **"I don't know it"**.
- Words you don't know go to your personal dictionary to study. Words you know are saved as learned — so your progress is always real.
- After that the app plans everything: what to study today, what to repeat, and when.

No empty pages. No "what do I do now?". You open the app → the words are already there.

---

## How It Works

1. **Sign up** — email/password, Google, or **anonymous mode** (one click, no account needed).
2. **Open the Oxford 3000 dictionary** — go word by word, tap *"Знаю"* (I know it) or *"Не знаю"* (I don't).
3. Every unknown word goes to your **personal dictionary**. A Cloud Function asks **Gemini AI** to make a short example phrase for it.
4. When you have 5+ new words, **exercises open**. Choose exercise types and word count — and train.
5. After the training, the **spaced-repetition algorithm** updates the score of every word and plans the next review date (1 → 3 → 5 → 7 → 14 days).
6. The **home screen** always answers one question: *do I have something to repeat today?*

---

## Pages

| Page | What it does |
|---|---|
| **Welcome** | Start screen with the idea of the app: "there is too much noise around, so I removed everything extra". |
| **Auth** | Register, login, Google sign-in and anonymous mode. |
| **Home** | Daily dashboard: an AI sentence made with one of *your* words, the number of words ready to repeat, and a button that changes with your situation (new user → "go add words", words ready → "start repeating"). |
| **Dictionaries (overview)** | Two cards: Oxford 3000 progress for every level (how many words are left), and personal dictionary stats (new / learning / known). |
| **Oxford 3000 list** | The full dictionary. Fast list (~3000 rows), search, level filters, A–Z sorting. Every row: word + audio + "know / don't know" buttons. Translations are hidden here — this is not a mistake: you should read the word first and test yourself. |
| **Personal dictionary** | Your words with translations + audio, AI phrases + audio, progress badges and next review dates. Extra filter by progress. |
| **Exercises (overview)** | Two training modes: *new words* (never studied) and *repetitions* (words whose review date has come). Each mode opens at 5 words. |
| **Exercise settings** | Choose exercise types, set word count, start the training. |
| **Session** | The training itself — a mixed list of exercises in 3 phases (see below), with a progress counter. |
| **Session results** | Result of the training: which words went up, stayed, or went down. |
| **Profile** | Avatar, name editing, account info, logout and account deletion. |

---

## The Exercises

Five types of exercises. They run in one session with **3 phases** — first you see the word, then you learn to recognize it, then you write it:

| Exercise | Phase | Task |
|---|---|---|
| **Flash cards** | 1 — meet the word | See the word + AI phrase + audio, flip the card, say "know / don't know". |
| **Listening** | 2 — recognize | Hear the word (no text), choose the right translation. |
| **Word choice** | 2 — recognize | See the word + phrase, choose the right translation from 4. |
| **Match pairs** | 2 — recognize | Match 4 English words with 4 translations. |
| **Word building** | 3 — write | See the translation, build the English word letter by letter. |

Exercises are shuffled inside every phase, but the order of phases is always: meet → recognize → write.

---

## The Spaced-Repetition Algorithm

Every word has a **score from 1.0 to 2.0** (1.0 = new word, 2.0 = fully learned).

- Every answer changes the score: perfect **+0.2**, passed **+0.1**, failed **−0.2**. The number is divided by the count of exercise types in the session — so one session moves a word by one level at most.
- After the session, the score gives the next repeat date:

| Score | Next repeat in |
|---|---|
| < 1.2 | 1 day |
| 1.2 – 1.4 | 3 days |
| 1.4 – 1.6 | 5 days |
| 1.6 – 1.8 | 7 days |
| 1.8 – 1.99 | 14 days |
| = 2.0 | the word is studied |

- All results go to Firestore in **one batched write** at the end of the session.
- A word goes to exercises only when its AI phrase is ready — no half-ready cards.

---

## AI & Audio

- **Phrase generation** — a Firebase Cloud Function asks **Gemini** to make a short example phrase for every saved word (the word stays in its exact form and is marked bold). If it fails, the function tries again up to 3 times with a 1-second pause, and after the first fail it **switches to another Gemini model**.
- **Pronunciation** — Google Cloud **Text-to-Speech** through a Cloud Function, played with Howler.js. You can listen to every word and every AI phrase in the app.
- **Home page AI sentence** — a personal sentence made with one of the words you are learning right now.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI | **React 19** + **TypeScript**, **Tailwind CSS v4** |
| State | **Redux Toolkit** + RTK Query, live Firestore updates with **onSnapshot** |
| Routing | **React Router 7** |
| Backend | **Firebase**: Auth, Firestore, Storage, Cloud Functions, Hosting |
| AI / Audio | **Gemini API** (phrases), **Google Cloud TTS** (audio), Howler.js |
| Long lists | **react-virtuoso** |
| Tooling | Vite, ESLint, Prettier |

---

## Project Structure

```
src/
  app/                # App root, Redux store
  config/             # Firebase setup
  pages/              # Thin route wrappers
  routes/             # Router config, route guards, paths
  features/
    auth/             # Register, login, Google/anonymous auth, account deletion
    home/             # Dashboard, AI sentence of the day
    dictionaries/     # Oxford 3000 + personal dictionary (overview / list screens)
    exercises/        # Exercise overview, settings, session engine, 5 exercise types
    profile/          # Avatar, name, account info
  shared/             # Layouts, UI kit (buttons, loaders), shared hooks
  styles/             # Global styles and theme
functions/            # Firebase Cloud Functions: Gemini phrases, TTS
```

---

## Status

This is my first big pet project. I made it alone, as a portfolio project — design, frontend, backend functions and the learning algorithm. I use it every day myself to learn English, and I keep making it better.
