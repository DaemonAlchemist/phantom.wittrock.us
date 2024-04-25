![Phantom of the Author-a](public/PotA-icon.webp)
# Phantom of the Author-a
### AI-Powered Ghost Writer

**Note:  This is a WIP PoC, so it will probably have bugs.  You have been warned. :)**

## What is this?

**Phantom of the Author-a** is an AI-powered ghostwriting app. It maintains information about your story outline, themes, locations, and characters, and uses that information to flesh out your story. You can use as much or as little AI help as you want. PotA currently has support for several engines and models: Ollama (Llama2, Gemma, Mistral, Mixtral), Anthropic (Claude3), and OpenAI (GPT4, GPT3.5).

## Getting Started

**Phantom of the Author-a** supports [Ollama](https://ollama.com/) and [OpenRouter](https://openrouter.ai) as sources for language models.  To use PotA, you will need a locally running instance of Ollama and/or an account at OpenRouter.  If you are using OpenRouter, select it as the engine and then click on the key icon to enter your API key.


## Process

**Phantom of the Author-a** is designed as a top-down, start to finish app. Using it in a manner other than specified below may cause unexpected behavior or errors, because PotA makes assumptions about what tasks have already been completed. The supported process is:

1. Enter a seed idea for your story along with any other instructions. PotA will generate a basic story outline along with themes, genre(s), and target audience(s).
2. Validate and edit the story information to your liking.
3. Generate some locations for your story. You can generate as many as you like, and you can also include custom instructions each time you create more.
4. Validate and edit the location information to your liking.
5. Generate some characters for your story. You can generate as many as you like, and you can also include custom instructions each time you create more.
6. Validate and edit the character information to your liking.
7. Generate the overall structure for your story. This will create a hierarchy of acts and chapters, each with an associated outline. Note: This prompt may take a while.
8. Validate and edit the act and chapter outlines to your liking.
9. Create your story in a top-down, start-to-finish manner:
   1. For each act:
      1. For each chapter:
         1. Create a list of scenes for the chapter. Include custom instructions if desired.
         2. Validate and edit the scene outlines to your liking.
         3. PotA may generate new minor characters for the scenes. Validate and edit their information to your liking.
         4. For each scene:
            1. Create a list of beats for the scene.
            2. Validate and edit the beat outlines to your liking.
            3. For each beat:
               1. Create the prose for the beat. Include custom instructions if desired.
               2. Validate and edit the prose to your liking.
            4. Summarize the scene.
            5. Validate and edit the scene summary to your liking.
         5. Summarize the chapter.
         6. Validate and edit the chapter summary to your liking.
      2. Summarize the act.
      3. Validate and edit the act summary to your liking.

## Local Setup

1. Checkout the code: [https://github.com/daemonalchemist/phantom.wittrock.us/](https://github.com/daemonalchemist/phantom.wittrock.us/)
2. Install dependencies:
   ```
   > yarn
   ```
3. Start the development server:
   ```
   > yarn dev
   ```
