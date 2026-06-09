# Network Mail Adventure

This repository contains a teacher-facing classroom activity that helps students understand the TCP/IP stack through a postal-service analogy. The interactive app lives in `network-mail-adventure/` and is designed to let me show how a message moves through a series of delivery steps, then connect each step to the matching networking concept.

## Teacher Overview

I can use this activity to help students:

- explain the purpose of each major TCP/IP layer in order
- connect a familiar real-world system to abstract networking ideas
- compare postal addresses, routing, and delivery with IP, TCP, and Ethernet concepts
- practice moving between everyday analogies and technical vocabulary

## What Students Explore

The activity includes:

- a simple message composer
- an animation that moves a “letter” through four stations
- a toggle between a postal explanation and a technical TCP/IP explanation

The four stations map to the TCP/IP stack like this:

- Writing Desk -> Application Layer
- Packing Station -> Transport (TCP)
- Sorting Office -> Internet (IP)
- Loading Bay -> Link (Ethernet)

## Project Location

The actual workspace and app code are inside:

- `network-mail-adventure/`

The fuller teacher-focused project documentation is here:

- `network-mail-adventure/README.md`

## Quick Start

To run the classroom app locally:

```bash
cd network-mail-adventure
pnpm install
pnpm --filter @workspace/postal-tcp-ip run dev
```

## Suggested Classroom Use

- Start in Postal mode so students understand the story first.
- Switch to Technical mode and ask students to explain what each station represents.
- Have students describe what is added, checked, or changed at each stage.
- Use the activity as a launch point for lessons on routing, reliability, addressing, and encapsulation.
