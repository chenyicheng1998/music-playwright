# music-playwright

Playwright end-to-end tests for [Lessonface.com](https://www.lessonface.com), covering a user journey across Stage 2, 3, and 4:

- **Stage 2** – Search for "piano" from the homepage and verify the results page
- **Stage 3** – Click the first teacher's profile and verify it loads
- **Stage 4** – Log in, book a lesson (Piano / 30 min), add to cart, and proceed to checkout

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- A Lessonface.com account

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/chenyicheng1998/music-playwright.git
   cd music-playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   npx playwright install chromium
   ```

3. Create a `.env` file in the project root by copying the example:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in your Lessonface credentials:
   ```
   LESSONFACE_EMAIL=your_email@example.com
   LESSONFACE_PASSWORD=your_password
   ```

## Running the tests

```bash
npx playwright test tests/journey.spec.ts
```

A video recording of the test run will be saved under `test-results/`.
