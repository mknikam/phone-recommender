# Smartphone Recommender - Walkthrough

The initial version of your smartphone recommendation engine is complete and running locally!

## What was built
*   **Next.js App Router:** The core application is set up using the latest Next.js 14 standards for maximum speed.
*   **Tailwind CSS & Framer Motion:** The UI is beautifully styled with Tailwind and uses Framer Motion for premium, smooth transitions between the questionnaire steps.
*   **Scoring Algorithm (`src/lib/algorithm.ts`):** I implemented the custom logic we designed. It filters by your price buckets and brand, then calculates a weighted score based on your selected use cases (e.g., Heavy Gaming heavily prioritizes the performance score).
*   **Google Sheets Data Layer (`src/lib/sheets.ts`):** The logic to read a CSV published from a Google Sheet is built-in. 

## How to Test It Right Now
The server is currently running in the background!
1. Open your web browser and go to: **[http://localhost:3000](http://localhost:3000)**
2. Click through the questionnaire. 
3. *Note: Right now, it is using a "Fallback" dataset of 5 popular phones since we haven't connected your Google Sheet yet.*

## Next Steps: Connecting Google Sheets
To make this data live and editable by you without touching code:
1. Create a Google Sheet.
2. Create the following columns exactly (case-sensitive): `Brand`, `Name`, `Price`, `Price Bucket (1-6)`, `Performance Score`, `Camera Score`, `Battery Score`, `Display Score`, `Pros`, `Cons`, `Image URL`.
3. Add a few phones as rows.
4. Go to **File -> Share -> Publish to web**. Choose "Entire Document" and **"Comma-separated values (.csv)"**. Click Publish.
5. Copy the link they give you, and we will paste it into `src/app/page.tsx`!
