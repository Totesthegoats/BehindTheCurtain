---
title: Building the Timechain Clock
category: bitcoin
description: >-
  I've always loved the idea of having a physical Bitcoin display on my desk —
  something that quietly ticks away, showing the blockchain doing its thing in
  real time. If you've ever looked up the BlockClock, you probably had the same
  reaction I did: beautiful device, but €399 is a lot of money for something
  that essentially polls an API and refreshes a screen.


  So I decided to build my own. What started as a weekend tinkering project has turned into something I'm genuinely proud of — the Timechain Calendar, a modular Bitcoin blockchain display system you can build yourself for around €45 a module, or roughly €180 for a full four-module setup.

  Here's the story of how I got there.
image: /images/uploads/whatsapp-image-2026-02-10-at-16.50.28.jpeg
technologies:
  - Bitcoin
status: active
tags:
  - Bitcoin
featured: false
---

## The Idea: Modular, Affordable, Open Source

The BlockClock inspired me not just as a product, but as a *philosophy*. A beautiful, minimal object that sits on your desk and tells you something real about the Bitcoin network. It's desk art as much as it is a gadget. I wanted to capture that spirit — but make it accessible to anyone with a soldering iron and a bit of patience.

My design breaks the display into four dedicated modules, each focused on a different dimension of the Bitcoin network:

- **Block Height** — the current block number, live fees, and Bitcoin price data
- **Difficulty Epoch Progress** — a ring of LEDs visualising where we are in the current difficulty adjustment window
- **Halving Countdown** — how many blocks until the next halving
- **Mempool Fee Visualiser** — a bar display showing current fee levels

Each module works independently, so you can start with one and expand over time. That modular approach became a guiding principle throughout the build.

---

## Module One: The Block Height Display

The first module — and the one that's fully up and running — shows the current Bitcoin block height alongside real-time fee rates and a Bitcoin symbol. It updates automatically whenever a new block is mined, which means it's a genuinely live window into the blockchain.

### The Hardware

The core of each module is an **ESP32 DevKit board**, which gives you WiFi connectivity in a tiny, affordable package. For the display, I went with a **Waveshare Pico-ePaper-4.2** — a 4.2-inch e-ink screen that looks absolutely stunning in person. E-ink has this quality that regular LCD screens just can't match: it looks printed, not lit. Perfect for desk art.

I source most of my components from Irish and UK suppliers — **Radionics Dublin**, **Pimoroni UK**, and **Farnell Ireland** — which keeps shipping times down and means I can actually talk to someone if something goes wrong.

### The Software

The firmware is written in Arduino IDE. The ESP32 polls the **mempool.space API** at regular intervals, checks if a new block has arrived, and if so, fetches the latest data and refreshes the display. Simple, reliable, and the data source is trusted by the Bitcoin community.

One of the trickier parts was getting the display driver right. After some trial and error, I landed on **GxEPD2_420_GDEY042T81**, which plays nicely with the Waveshare panel. I also learned a few lessons about e-ink displays the hard way:

- **Full screen refreshes are more reliable than partial updates.** Partial refresh sounds great in theory — faster, less flicker — but I kept running into artefacts and inconsistent behaviour. Full refresh every time, every block. Done.


- **Don't use `hibernate()`**. The e-ink display has a hibernate mode to save power, but waking it back up proved unreliable. I dropped it entirely in favour of a simpler sleep approach, and the display has been rock-solid ever since.

The display runs in landscape orientation and shows block height prominently, with fee data and a Bitcoin symbol arranged cleanly around it. It genuinely looks great on a desk.

---

## What's Coming Next

The block height module is the foundation. Three more are in progress:

**Difficulty Epoch Progress** will use a ring of **WS2812B addressable LEDs** to show how far through the current 2016-block difficulty adjustment window we are. As the ring fills up, you can see the epoch completing in real time. I'm using the FastLED library for this one.

**Halving Countdown** will tick down the blocks until the next Bitcoin halving — one of those events that every Bitcoiner watches closely. Having it on your desk as a slow, steady countdown feels right.

**Mempool Fee Visualiser** will use LED bars to give you an at-a-glance sense of how congested the network is. No need to check your phone — just glance at the desk.

---

## The Mobile App

Alongside the hardware, I'm building a companion **React Native app** using the Expo framework. The idea is to make configuring each module simple — WiFi credentials, display preferences, update intervals — without needing to reflash firmware every time you change something. It's in early development but the bones are there.

---

## Why Build This?

A few reasons, honestly.

First, it's a genuinely fun learning project. Working across hardware, firmware, and mobile app development in the same project has been a great way to stretch skills I don't always get to use together.

Second, I think there's real value in making Bitcoin hardware accessible. Not everyone can justify €399 for a clock, but €45 for a module you built yourself? That feels different. You understand what it's doing, you can modify it, and there's a satisfaction in watching something you made pull live data from the Bitcoin network.

Third — and I'll be honest here — I'm exploring whether this could become a small business. I'm considering listing finished units on **Etsy** as handmade electronics, and potentially doing a small batch run to test demand before thinking about anything larger. The positioning would be similar to what drew me to the concept in the first place: beautiful, purposeful objects that connect you to the Bitcoin network, at a price that doesn't require HODLing a full sat stack to justify.

---

## Open Source, All the Way

Everything I'm building is open source. The firmware, the schematics, the enclosure designs — all of it will be available on GitHub with a proper README, wiring diagrams, and troubleshooting guidance. If you want to build your own, you should be able to follow along without guessing. A full YouTube tutorial series is in the works to walk through the build step by step.

The enclosures are built from **wood rather than acrylic** — it gives them a warmer, more considered feel that suits the desk-art aesthetic I'm going for. Laser cutting services from **RazorLab** have been great for prototyping precise cuts.

---

## Where Things Stand

Right now: one fully working module on my desk, live, pulling real Bitcoin data. Three more modules in design and early development. A mobile app taking shape. A YouTube tutorial series being scripted.

It's been a brilliant project so far — equal parts frustrating and satisfying in exactly the way good hardware projects tend to be. I'm excited to see where it goes.

If you're a Bitcoiner, a maker, or just someone who likes the idea of a beautiful physical object that reflects something real happening in the world — stay tuned. More to come.

---

*If you're interested in following along, building your own, or getting your hands on a finished unit, feel free to get in touch. The full GitHub repo and YouTube tutorials are coming soon.*
