<h1 align="center">Kyurations Prototype</h1>
<p align="center"><b>An early Chrome extension experiment: pop up a clean preview card of any LinkedIn profile.</b></p>
<p align="center">
  <code>◇ Prototype</code> &nbsp;·&nbsp; Chrome Extension · JavaScript
</p>

> A tiny spike toward the idea that became Kyurations: pull the essence of a page into a single tidy card. Here the page is a LinkedIn profile.

This repo is an early prototype from the Kyurations project. The working extension, named "LinkedIn Profile Preview", reads the LinkedIn profile you are on and shows its key details (name, title, location, and photo) as a compact popup card. It is a rough experiment in extracting and presenting a page's essentials, the same instinct that shows up later in Kyurations' card-based saves.

## Why it exists
Kyurations is about turning scattered web pages into clean, glanceable cards. This prototype tests that on a single, structured source: a LinkedIn profile. It was a quick way to prove out reading live page content from a browser extension and rendering it back as a preview, before that pattern grew into the full product.

## How it works
```
Open a LinkedIn profile  ->  Click the extension  ->  Details scraped from the page  ->  Preview card shown
```
| Step | What happens |
|------|--------------|
| Navigate | You land on a `linkedin.com/in/...` profile page |
| Trigger | You click the extension's toolbar button to open the popup |
| Extract | A script reads the name, title, location, and profile image from the page |
| Preview | Those details render as a small preview card in the popup |

## What it does
| Feature | What it does |
|---------|--------------|
| Profile detection | Activates only on LinkedIn profile URLs |
| One-click preview | Pulls the current profile into a popup on demand |
| Key details | Surfaces name, title, location, and profile photo |
| Local capture | Stores the last read profile in the browser's local storage |

## Under the hood
A Manifest V3 Chrome extension: a content and popup script scrape the profile via DOM selectors, a background service worker captures data on click, and results are held in `chrome.storage.local`.

## Note
This is an experimental prototype kept for reference. It targets LinkedIn profiles specifically and is not the production Kyurations app.
