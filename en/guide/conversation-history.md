# Conversation History Settings

## Overview

In AITuberKit, you can maintain conversation history with AI and preserve the context of conversations. Conversation history is used by the AI to reference past conversations and generate appropriate responses.

## Display and Editing

In the conversation history settings screen, you can check and edit the currently maintained conversation history. Each message is distinguished by the labels "You" (user) and "Character" (AI character).

You can directly edit the conversation content by clicking on the text field. This allows you to modify the AI's responses or your own questions.

## Resetting Conversation History

By clicking the "Reset Conversation History" button, you can delete all currently maintained conversation history. This allows you to start a new conversation with the AI.

::: tip TIP
In regular chat, resetting the conversation history means the AI loses the context of previous conversations. It is effective to reset when you want to start talking about a new topic or when the AI's responses become strange.
:::

## Number of Past Messages to Retain

By default, AITuberKit retains the 10 most recent conversations as memory. This value can be changed in the AI settings screen.

Increasing the retention number allows the AI to understand a longer conversation context, but it may increase the size of API requests and lead to longer response times.

::: warning Note
If you set the retention number too high, you may reach the token limit of the AI service. Please set an appropriate value, especially when having long conversations.
:::

## GPT-Live History (v2.77.0 and Later)

At connection time, GPT-Live sends up to 128 text messages according to the history retention setting. The total limit is 8,192 tokens; message text is not truncated by character count. If the limit is exceeded, reduce the number of retained messages and reconnect.

Resetting history while connected does not clear the context of the active GPT-Live session. To fully reset it, follow **End conversation → Reset conversation history → Start conversation**. Simply ending the conversation and reconnecting preserves history. See [details](/en/guide/ai/gpt-live).
