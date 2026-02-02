Product Requirements Document: OurGreatStory

Edition: Awwwards × Dual-Product Platform
Version: 1.2
Status: Draft
Date: 2026-01-31

1. Executive Summary

OurGreatStory is a dual-purpose invitation platform hosting two completely distinct products under one brand:

🖤 Dating Invites

A playful, low-friction, gamified micro-site designed to get a “Yes” using humor, interaction, and motion.

🤍 Wedding Invites

A robust, reliable digital wedding invitation system with RSVP management, logistics, and guest tracking, elevated through cinematic web design.

A Gateway Landing Page serves as the single entry point, routing users into two isolated applications while maintaining a cohesive brand experience.

Core Idea:
Two very different emotional moments — one shared story.

2. Mission

Statement:
“Turning invitations into interactive digital stories.”

Core Principles

Separation of Concerns: Dating ≠ Wedding. No shared logic, no shared tables.

Motion With Meaning: Animations support emotion and clarity, not confusion.

Fast by Default: Even with cinematic visuals, perceived performance must feel instant.

Playful, Not Cringe: Especially critical for the Dating product.

3. Product Architecture Overview
Layer	Description
Brand Layer	Shared visual identity, tone, typography
Gateway Layer (/)	Central decision point
Product Apps	/dating and /wedding (fully isolated)
Invite Layer	/d/[slug] and /w/[slug]
4. Sitemap & Routing Structure
/                     → Gateway Landing Page
/dating               → Dating Invite Builder
/wedding              → Wedding Invite Builder
/d/[slug]             → Published Date Invite
/w/[slug]             → Published Wedding Invite

Gateway Landing Page (/)

Prompt:

“What are you celebrating?”

Two primary CTAs:

Create a Date Invite

Create a Wedding Invite

This page is intentionally minimal, emotional, and decisive.

5. Product 1: Wedding Platform (/wedding)
Goal

Provide a functional, dependable digital alternative to paper wedding invitations, enhanced with tasteful motion and storytelling.

Functional Requirements
Wedding Builder (Data Collection)

Couple Details

Couple Names

“Our Story” (optional long text)

Event Details

Date

Time

Venue Name

Venue Address

Logistics

Google Maps URL input

Auto-generated “Add to Calendar” links

Google

Apple

Outlook

RSVP System

Guest Inputs

Name

Email

Responses

Joyfully Accept

Regretfully Decline

Additional Options

Meal Selection (dropdown)

Dietary Restrictions (text input)

Plus-One Toggle (on/off per wedding)

Integrations
Feature	Implementation
Maps	Embedded Google Maps iframe
Calendar	.ics generation utility
RSVP	Database-backed submission
6. Product 2: Date Invite (/dating)
Goal

Create a playful, interactive micro-experience that nudges the recipient toward a “Yes”.

This is not an RSVP system — it is a moment generator.

Functional Requirements
Themes (Mandatory Selection)

Users must choose one:

Romantic

Soft gradients

Elegant typography

Subtle heart motifs

Playful

Bright colors

Emojis

Bouncy buttons

Straightforward

Minimal UI

Bold typography

Clear Yes / No contrast

The “Playful No” Logic (Core Feature)

Step 1
Prompt:

“Will you go out with me?”

Step 2

Yes → Success Screen

No → “Are you sure?” intermediate screen

Step 3 (The Funnel)

“No” button:

Runs away

Shrinks

Or redirects back to Yes

“Yes” button:

Pulses

Gains visual weight

Safety Rule

Loop happens once only

After that, tone shifts clearly to humor

Success Screen

Message: “It’s a date!”

Lightweight CSS confetti

Optional follow-up text

7. User Flows
Flow A — Create Wedding Invite

User lands on /

Selects Create Wedding Invite

Redirected to /wedding

Completes form

Reviews static preview

Publishes → /w/[slug]

Flow B — Create Date Invite

User lands on /

Selects Create Date Invite

Redirected to /dating

Chooses theme

Writes custom question

Publishes → /d/[slug]

Flow C — Date Invite Recipient

Opens invite link

Clicks No

“Are you sure?” screen

No button becomes evasive

Clicks Yes

Celebration screen

8. Technical Architecture
Stack
Category	Technology
Framework	Next.js 15 (App Router)
Styling	Tailwind CSS
Forms	React Hook Form
Validation	Zod
Database	PostgreSQL
ORM	Prisma
Data Isolation (Critical)

There is zero relationship between dating and wedding data.

Prisma Schema (Draft)
// Wedding
model Wedding {
  id            String   @id @default(cuid())
  slug          String   @unique
  coupleNames   String
  date          DateTime
  venueName     String
  venueAddress  String
  mapUrl        String?
  guests        Guest[]
}

model Guest {
  id        String   @id @default(cuid())
  weddingId String
  wedding   Wedding  @relation(fields: [weddingId], references: [id])
  name      String
  status    String   // ACCEPTED, DECLINED
  meal      String?
  dietary   String?
}

// Dating
model DateInvite {
  id           String   @id @default(cuid())
  slug         String   @unique
  senderName   String
  theme        String   // ROMANTIC, PLAYFUL, STRAIGHTFORWARD
  questionText String
  responses    DateResponse[]
}

model DateResponse {
  id        String   @id @default(cuid())
  inviteId String
  invite   DateInvite @relation(fields: [inviteId], references: [id])
  response String   // YES only
  timestamp DateTime @default(now())
}

9. MVP Checklist
Core

✅ Gateway Landing Page

✅ Route isolation (/w vs /d)

✅ Slug-based publishing

Wedding

✅ Builder form

✅ RSVP submission

✅ Calendar + Maps

✅ Guest tracking

Dating

✅ Theme system

✅ Playful No logic

✅ Success screen

10. Risks & Mitigations
Risk: “Playful No” becomes annoying

Mitigation:
One loop only. Humor made explicit.

Risk: URL collisions

Mitigation:
Strict prefixes: /w/[slug] and /d/[slug]

Risk: Motion over usability

Mitigation:
Dating = playful
Wedding = restrained & clear

11. Success Criteria

Dating invites feel fun, fast, and shareable

Wedding invites feel trustworthy and elegant

Users instantly understand which product they are in

No confusion between Dating and Wedding flows