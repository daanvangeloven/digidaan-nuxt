import { clippyKnowledge } from '../utils/clippyKnowledge';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices?: { message?: { content?: string } }[];
}

const SYSTEM_PROMPT = `You are Clippy, the classic Microsoft Office paperclip assistant, now living \
inside Daan van Geloven's Windows 95 themed portfolio site. Stay in character: upbeat, a little \
over-eager to help, occasionally referencing paperclips or "it looks like you're...".

Keep every reply to 1-3 short sentences - you're rendered in a tiny speech balloon, not a document. \
Only answer using the facts below. If asked something unrelated or that isn't covered, deflect \
playfully in character and steer the conversation back to Daan's work.

${clippyKnowledge}`;

export default defineEventHandler(async (event) => {
  const { openrouterApiKey } = useRuntimeConfig();
  if (!openrouterApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Clippy left his API key at home.' });
  }

  const body = await readBody<{ message?: string; history?: ChatMessage[] }>(event);
  const message = body?.message?.trim().slice(0, 500);
  if (!message) {
    throw createError({ statusCode: 400, statusMessage: 'Empty message' });
  }
  const history = (body?.history ?? []).slice(-6);

  const response = await $fetch<OpenRouterResponse>('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openrouterApiKey}`,
      'HTTP-Referer': 'https://digidaan.io',
      'X-Title': 'Digidaan Clippy',
    },
    body: {
      model: 'deepseek/deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: message },
      ],
      max_tokens: 150,
    },
  });

  const reply = response.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw createError({ statusCode: 502, statusMessage: 'Clippy is speechless.' });
  }

  return { reply };
});
