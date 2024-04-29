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

## Prompt Editing

The **Prompt Editor** allows you to customize the prompts used by the AI to generate content. This feature is crucial for tailoring the AI's output to better fit your story's needs. Here's how you can use the Prompt Editor:

1. Click on the **Settings** icon next to any prompt in the app.
2. In the modal that appears, you'll see two sections: **System** and **User**.
3. The **System** section allows you to view and edit the prompt that the AI uses internally.
4. The **User** section is where you can input your custom instructions or modifications to the prompt.
5. After making your changes, simply close the modal. Your edits will be automatically saved and used for future AI generations.

This feature empowers you to guide the AI in a direction that aligns with your creative vision, ensuring the generated content is as relevant and engaging as possible.

**Note:** Almost all prompts require the `json` and an interface template included as part of the prompt. Removing or changing these will almost always result in the app breaking.

## Common Prompt Templates

PotA also has several prompt templates that can be included in your system and/or user prompts. Click on the **Prompt Templates** menu, and then the **Common Templates** menu item. You can edit several of the commonly used templates. The dialog also shows you what templates are available. Include them in your prompts by enclosing the tag id inside double curly braces (ex. `{{story.details.full}}`).

## Saving and Loading

Under the **Story** menu, you have options for saving, loading, or clearing your current story.

Under the **Prompt Templates** menu, you have options for saving and loading your user-defined prompt templates. This can be useful if you want to define different styles for different stories and/or provide different prompt strategies for the various models.

Both stories and prompt templates will be saved as JSON files.

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
