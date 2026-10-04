## Goal Description
Build a highly secure, lightning-fast, and visually appealing web application that recommends the ideal smartphone based on a user's specific requirements (budget in INR, use case, multitasking needs, preferred brand, and key features).

## Open Questions
*   **Website Name:** You mentioned you will provide the name later. We can easily update the logo/branding once you decide!

## Proposed Tech Stack
Based on your requirement for a highly secure, fast, and beautiful website, here is the ideal stack:
*   **Frontend Framework:** **Next.js (React)**. It is the industry standard for fast, modern web apps. It allows us to build a snappy user interface.
*   **Styling:** **Tailwind CSS**. This allows us to build custom, beautiful, and fully responsive designs very quickly.
*   **UI Animations:** **Framer Motion**. We can use this to create smooth, app-like transitions between the questions so it feels premium.
*   **Hosting:** **Vercel** or **Netlify** (Free tiers are perfect for this and offer global CDNs for speed).

## Database Strategy & Storage (Approach 1)
Since security and speed are top priorities, we will not use a traditional database. We will use **Google Sheets** as a lightweight, highly accessible CMS (Content Management System).

*   **Storage & Updates:** You will maintain a Google Sheet containing all the phone data (Prices, Specs, Scores). To update the database, you simply add or edit rows in the spreadsheet.
*   **Integration:** The Next.js app will securely fetch this data from the Google Sheet. The easiest way is to "Publish to Web" as a CSV, which Next.js will parse instantly.
*   **Why this approach is best:** 
    *   **Easiest for you:** No coding required to update the website's recommendations. Just edit the spreadsheet.
    *   **Secure:** There is no database server to hack. No user data is saved.
    *   **Fast:** We can configure Next.js to fetch and cache this data so the website remains lightning fast.
    *   **Cost-effective:** 100% free.

## Retrieval & Suggestion Algorithm
The web tool will use client-side logic to find the best phone instantly.

1.  **Hard Filters:** When the user hits submit, the code first filters the `phones` array to only keep phones that match the selected **Budget Bucket** (1 through 6) and the **Preferred Brand** (if they selected one).
2.  **Weighted Scoring:** For the remaining phones, the code assigns a "Match Score". 
    *   The use cases are: **light gaming, heavy gaming, basic use, multimedia consumption, content creation**.
    *   If they chose "heavy gaming", the algorithm heavily multiplies the phone's `performance` score. If they chose "content creation", it boosts the `camera` and `performance` scores.
3.  **Result:** The phones are sorted by their final Match Score, and the system will display **"The Best"** pick and the **"2nd Best"** pick as an alternative, with pros, cons, and why they were chosen. Note: We will **not** include direct purchase links.

## Proposed Changes
### [NEW] Next.js Project Initialization
*   Set up a new Next.js project with App Router, TypeScript, and Tailwind CSS.
### [NEW] `src/data/phones.ts`
*   Create the curated mock database of popular Indian smartphones.
### [NEW] `src/app/page.tsx`
*   Build the beautiful landing page and the interactive questionnaire wizard.
### [NEW] `src/lib/algorithm.ts`
*   Write the filtering and scoring logic to calculate the best match.

## Verification Plan
### Automated Tests
*   We can write simple unit tests for the `algorithm.ts` to ensure it always recommends the correct phone given a specific set of mock inputs.
### Manual Verification
*   You and I will manually click through the UI, testing various combinations to ensure the UI is beautiful and the recommendations make logical sense.
