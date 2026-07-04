# CLAUDE.md

## Project

**semantic-browser**

A browser automation framework that controls Chrome using the Accessibility (AX) Tree instead of CSS selectors.

The project aims to explore whether browser automation can become more reliable and more human-like by reasoning over semantic information exposed through Chrome's Accessibility API.

This is primarily a learning project focused on:

- Chrome DevTools Protocol (CDP)
- Chrome Accessibility (AX) Tree
- Browser automation
- AI Agents
- Semantic UI understanding

---

# Vision

Traditional browser automation identifies elements by implementation details.

Examples:

```javascript
document.querySelector("#submit")
document.querySelector(".btn.primary")
document.querySelector("#app > div:nth-child(4) > button")
```

These selectors are brittle.

Humans instead think like this:

```text
Click the Login button.
Type "Yang" into the Username field.
Open the Settings menu.
```

Chrome's Accessibility Tree already exposes this semantic information.

This project treats the AX Tree as the primary interface between an AI agent and the browser.

---

# Goals

The project should:

- retrieve the Accessibility Tree from Chrome
- search the AX Tree
- locate nodes by semantic meaning
- map AX nodes back to DOM nodes when necessary
- perform browser actions
- support LLM-powered planning

Non-goals:

- replacing Playwright
- replacing Puppeteer
- visual automation
- OCR
- computer vision

---

# Development Principles

## Semantic First

Always prefer semantic information over implementation details.

Prefer:

- role
- accessible name
- state
- description

Avoid depending on:

- CSS selectors
- XPath
- DOM hierarchy

unless absolutely necessary.

---

## Browser Native

Prefer using official Chrome DevTools Protocol APIs.

Avoid JavaScript injection when a CDP API exists.

---

## Explainability

Every decision made by the agent should be explainable.

Example:

Searching:

Button

Name = Login

Reason:
Role matches.
Accessible name matches.

instead of

Found:
#btn-923

---

## Small Components

Prefer many small modules over large classes.

Good:

```
AXClient
AXSearcher
ActionExecutor
Planner
ChromeSession
```

Avoid:

```
BrowserManager
```

that does everything.

---

## Strong Typing

Use TypeScript strict mode.

Avoid `any`.

Prefer explicit interfaces.

---

# Initial Architecture

```
semantic-browser/
    src/
        chrome/
            ChromeSession.js
            CDPClient.js
        ax/
            AXTree.js
            AXNode.js
            AXSearcher.js
        actions/
            ClickAction.js
            TypeAction.js
            FocusAction.js
        planner/
            Planner.js
        llm/
            LLMClient.js
        utils/
```

---

# MVP

The first milestone is intentionally small.

The application should:

1. launch Chrome

2. retrieve the Accessibility Tree

3. print every AX node

Example output:

```
Button
  Name: Login

Text Field
  Name: Username

Button
  Name: Search

Link
  Name: Documentation
```

No AI is required.

---

# Milestone 2

Support queries.

Example:

```
Find button "Search"
```

Result:

```
Role: Button

Name: Search

Backend DOM Node:
nodeId = 312

Status:
Found
```

---

# Milestone 3

Support actions.

```
Click "Search"

Type "Hello"

Focus "Username"
```

---

# Milestone 4

LLM Integration.

Prompt:

Click the Login button.

↓

Planner

↓

AX Search

↓

Click Action

---

# Coding Style

- Keep functions small.
- Prefer composition over inheritance.
- Avoid unnecessary abstractions.
- Avoid premature optimization.
- Write readable code before clever code.

---

# Testing Philosophy

Prefer integration tests over mocking Chrome.

Whenever possible:

Launch a real Chrome instance.

Retrieve a real AX Tree.

Execute real actions.

---

# Future Ideas

- fuzzy semantic search
- multiple matching strategies
- keyboard navigation
- browser history
- accessibility debugging
- semantic snapshots
- semantic diff
- AI planning
- multi-tab support
- browser memory

---

# Inspiration

- Chrome DevTools Protocol
- Accessibility Tree
- Playwright
- Puppeteer
- browser-use
- OpenAI Operator
- accessibility tooling

---

# Repository Philosophy

This is an educational project.

Code should prioritize clarity over cleverness.

Every module should help readers understand how Chrome's Accessibility Tree works internally.
