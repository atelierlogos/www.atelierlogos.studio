---
title: "How we build complex software with type theory, strong specifications, and a little bit of LLM magic"
summary: ""
author: "James Bohrman"
published: "2025-12-18"
image: ""
tags: ["Spec-driven", "Software"]
---

Let's set the stage a bit here. Imagine you're a solo dev who has that next big idea that's 100% very obviously going to change and revolutionize your industry. You for sure see patterns nobody else does, and you're determined to use a tool like Claude Code or Codex to vibe out a NextJS application that will **definitely** make you a million...no a billionaire. 

![](https://media1.tenor.com/m/uEXwvqGMdFoAAAAd/were-gonna-be-rich-eric-cartman.gif)

You spin up your preferred terminal, type in `claude` or `codex` and speak your encantation into existence with:

> Make me a NextJS application that {insert revolutionary idea and goal}

Instant profit right? Except that's not what happens. What happens is that you spend the next month trying to bring the initial output into a state where you can *maybe* even call it an MVP. You haven't even added two factor auth at this point, or added a single integration, and this is all due to one very common problem with vibe-coding. It's ham-fisted and ineffective. 

## How we do things differently

Delusions of grandeur aside, the draw of LLM-assisted development is am alluring one, and we'd be lying if we told you it's all just smoke and mirrors. There are some pre-experienced developers (Like us), who are building some incredibly complicated software with the help of LLMs such as [Anthropic Claude](https://claude.ai) and [OpenAI Codex](https://openai.com/codex/). 

So what sets these development ventures apart from "vibe-coders"? At the core, it's planning. We all know about the trusty dusty `agents.md` file. I'm sure every marketing and rev ops professional in the world thought they we're Einstien the first time they discovered what a system prompt was. Yeah I'm speaking to you `{anonymousId_123456}` 😉. The agents.md file is really really neat *headpats*, but I promise there's a reason you haven't been able to replace your 30+ third-party vendors with Microsoft Copilot in a day. It's because you haven't taken the time to do things like:

- Define a data model
- Create a `types` folder
- Build a general foundation before you vomit out something like "Build a NextJS app that functionality of Clay GTM tool"

Having even a foundational understanding of type theory and why it's important can be the difference in a successful LLM-assisted greenfield project and a failed experiment. We don't like failed experiments so we're going to give you the step by step into how we build projects here at Atelier Logos. We don't use tools like [Github Spec-kit](https://github.com/github/spec-kit) ourselves, but it's a great resource regardless. 

### Define the data model

We're perpetually amazed at how many Marketing Ops professionals out here who seem to just forget every bit of their foundational understanding of data structures when they open up an LLM tool. It's like we think just because it's "AI", it doesn't need structure (Remember guys, Terminator isn't real) and will just spit out whatever we want. Anytime we start a project, we first define the types and data model. This part doesn't even have to be done by hand, we use LLMs to draft the initial data model **quite often**. 

Here's an example `binary.ts` from our Fugu project which helps define a structure for binary analysis. Anyone who's done **anything** with deconstructing binaries before knows that it's **not** an easy task. Granted, we used a OSS tool called [Angr](https://angr.io/) to help with a good portion of the legwork, but even then, we needed to define the structure so we could feed the output of Fugu/Angr CLI into our client application from the Rust side. You can see the results [here](https://app.arcade.software/share/ylVIO1iH2Nk2W9oVpL2K). 

