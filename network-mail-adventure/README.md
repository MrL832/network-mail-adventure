# Network Mail Adventure (Internet Postal Service)

This repository contains a classroom-ready, interactive visual that helps me teach how data moves across a network by using a familiar analogy: sending a letter through the postal system. Students can toggle between “Postal” and “Technical” views to connect each station in the journey to a layer of the TCP/IP stack.

## What Students See

- A simple message composer (“From”, “To”, and “Message” / “Data Payload”).
- A “Send” button that animates the “letter” moving through four stations.
- A toggle that switches explanations between a postal story and TCP/IP terminology.

The four stations map directly to the TCP/IP stack:

- Writing Desk → Application Layer
- Packing Station → Transport (TCP)
- Sorting Office → Internet (IP)
- Loading Bay → Link (Ethernet)

## Learning Goals (Teacher View)

I use this activity so students can:

- Describe, in order, what each TCP/IP layer contributes to delivering data.
- Explain why addressing (IP) and local delivery (Link) are different ideas.
- Connect reliability/segmentation concepts (TCP) to a real-world process.
- Practice moving between an analogy and the technical vocabulary.

## Suggested Lesson Flow

- **Hook (5 minutes)**: Ask “What has to happen for a message to get from your laptop to a website?” Gather guesses.
- **Guided run-through (10 minutes)**: Run the simulator once in Postal mode. Pause at each station and ask students to restate what changed.
- **Concept bridge (10 minutes)**: Switch to Technical mode and run it again. At each station, ask “What is the matching technical job here?”
- **Partner task (10–15 minutes)**: In pairs, students write 1–2 sentences per station explaining the mapping (Postal ↔ TCP/IP).
- **Share-out (5 minutes)**: Groups share one station mapping and one “surprising” idea (e.g., why addresses happen more than once).

## Discussion Prompts

- What does “reliability” mean in real life vs on a network?
- Why do we need both IP addresses and MAC addresses (or “next hop” delivery)?
- What could go wrong at each station, and what would a “retry” look like?
- Where do students think encryption would fit in this story?

## Quick Start (Teacher Setup)

If I just want to run the activity locally for my class:

1. Install prerequisites:
   - Node.js (this repo is configured for Node 24 on Replit; Node 20+ is typically fine locally)
   - pnpm
2. From the monorepo root:

```bash
cd network-mail-adventure
pnpm install
pnpm --filter @workspace/postal-tcp-ip run dev
```

3. Open the URL printed by Vite (default port is `5173` unless `PORT` is set).

### Common Environment Variables

- `PORT`: Port used by the Vite dev server and preview server (defaults to `5173`).
- `BASE_PATH`: Base path used for GitHub Pages-style hosting (defaults to `/`).

## What’s in This Repo (For Teachers Who Want to Extend It)

This is a pnpm workspace monorepo:

- `artifacts/postal-tcp-ip`: The classroom-facing interactive (React + Vite). This is the part I run for the lesson.
- `artifacts/api-server`: An Express server scaffold with a health endpoint; useful if I want to add saved scenarios, analytics, or student submissions later.
- `lib/api-spec`: OpenAPI spec for the API server.
- `lib/api-client-react`: Generated client/hooks (Orval) for use in React.
- `lib/api-zod`: Generated Zod schemas/types from the OpenAPI spec.
- `lib/db`: Drizzle + Postgres integration (requires `DATABASE_URL` if I build DB-backed features).

## Optional: Running the API Server

The API server is not required for the core classroom activity. If I want to run it anyway:

```bash
cd network-mail-adventure
PORT=8080 pnpm --filter @workspace/api-server run dev
```

If I add endpoints that touch the database, I also need `DATABASE_URL` set (Postgres).

## Optional: Regenerating the API Client/Schemas

If I change the OpenAPI spec, I can regenerate the client and Zod types:

```bash
cd network-mail-adventure
pnpm --filter @workspace/api-spec run codegen
```

## Deployment Notes

- This repo includes a GitHub Pages workflow that builds the `postal-tcp-ip` app and publishes the `dist/public` output.
- When deploying under a subpath (typical for GitHub Pages), the build uses `BASE_PATH` so routing/assets resolve correctly.

## Classroom Tips

- Run it once in Postal mode first; students often understand the technical view better after they “own” the story.
- Ask students to narrate the animation in full sentences (“At the Sorting Office, the system adds addresses…”).
- For assessment, I have students draw the four stations and label what is added/checked at each layer.
