# Phantom of the Author-a
### AI-Powered Ghost Writer

Unleash your creative spirit with **Phantom of the Author-a**, an AI-powered ghostwriting app designed to transform your thoughts into literary masterpieces. Whether you're crafting your first novel, spinning a short story, or penning a powerful speech, Phantom of the Author-a is your silent partner in the writing process. With cutting-edge AI technology, this app understands your voice and style, helping to articulate your ideas with clarity and flair. Embrace the freedom to create with an intuitive interface that ensures your writing is always authentic and engaging. Turn the whisper of inspiration into the roar of published work with **Phantom of the Author-a**, where your ideas come to life.

## What is this?

**Phantom of the Author-a** is an AI-powered ghostwriting app. It maintains information about your story outline, themes, locations, and characters, and uses that information to flesh out your story. You can use as much or as little AI help as you want. PotA currently has support for several engines and models: Ollama (Llama2, Gemma, Mistral, Mixtral), Anthropic (Claude3), and OpenAI (GPT4, GPT3.5).

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

## Known Bugs:

- Deleting a beat does not refresh the beat list. You need to close and re-open the scene.
- Loading a story does not refresh the interface. You need to refresh the page.

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
4. Enter your API key(s) for the Anthropic and OpenAI engines
5. Download and install the [Ollama](https://ollama.com/) server if you want to run local models.