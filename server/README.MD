<p align="center">
  <img src=".github/assets/header.png">
</p>

> 👨‍🚀 **Repo for the purpose of personal study**

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/felipeAguiarCode/node-chatgpt-api.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/felipeAguiarCode/node-chatgpt-api.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/felipeAguiarCode/node-chatgpt-api.svg">
</p>

# ⚔️ Proposed Challenge

Create an api integration with LLM chat completion via **OpenRouter** with Node.


```
# Routes
POST     /api/prompt      sending prompt to text completion

```

# 🚀 Technologies

This code source was developed with the following technologies:

### ⚛️ Main Techs

- [Node.js](https://nodejs.org/en/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### 📚 Libs & Dependencys

- [OpenRouter](https://openrouter.ai/docs) - Unified API to access many LLMs (via native fetch)
- [express](https://.npmjs.com/package/express) - For create rest apis with more
- [cors](https://.npmjs.com/package/cors) - Control access to api requests/resources
- [dotenv](https://.npmjs.com/package/dotenv) - Configuration custom file
- [nodemon](https://.npmjs.com/package/nodemon) - Node monitoring server for development

### 🥷 Techniques

- [N-Tier Architecture](https://www.baeldung.com/cs/n-tier-architecture)

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v14.16](https://nodejs.org/en/) or higher + [NPM v8](https://nodejs.org/en/) or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/felipeAguiarCode/node-chatgpt-api

# Go into the repository
$ cd node-chatgpt-api

# Install dependencies
$ npm install

# Run (development ambient)
$ npm run dev
```
* to use OpenRouter
```bash
Create an API key at https://openrouter.ai/keys and set OPENROUTER_API_KEY in .env before run. Optionally set OPENROUTER_MODEL (e.g. anthropic/claude-sonnet-4, openai/gpt-4o-mini).
```
