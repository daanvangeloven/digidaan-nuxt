<script setup lang="ts">
const codeBlock = [
  `<span style="color:#808080">&lt;</span><span style="color:#569cd6">script</span> <span style="color:#9cdcfe">setup</span><span style="color:#808080">&gt;</span>`,
  `<span style="color:#569cd6">const</span> <span style="color:#9cdcfe">data</span> <span style="color:#d4d4d4">=</span> <span style="color:#dcdcaa">useRealtimeState</span><span style="color:#d4d4d4">(</span><span style="color:#ce9178">'my-key'</span><span style="color:#d4d4d4">, {</span>`,
  `  <span style="color:#9cdcfe">count</span><span style="color:#d4d4d4">:</span> <span style="color:#b5cea8">0</span><span style="color:#d4d4d4">,</span>`,
  `  <span style="color:#9cdcfe">message</span><span style="color:#d4d4d4">:</span> <span style="color:#ce9178">'Hello'</span>`,
  `<span style="color:#d4d4d4">})</span>`,
  ``,
  `<span style="color:#9cdcfe">data</span><span style="color:#d4d4d4">.</span><span style="color:#9cdcfe">value</span><span style="color:#d4d4d4">.</span><span style="color:#9cdcfe">count</span><span style="color:#d4d4d4">++</span>`,
  `<span style="color:#808080">&lt;/</span><span style="color:#569cd6">script</span><span style="color:#808080">&gt;</span>`,
].join('\n');
</script>

<template>
  <div class="p-5 mb-5 flex flex-col gap-5 overflow-y-auto max-w-[70vw] max-h-[70vh] max-md:max-w-full max-sm:max-h-none">
    <h1 class="text-2xl font-bold">
      nuxt-realtime - Real-time State Sync for Nuxt
    </h1>
    <p class="text-xs">
      <a href="https://nuxtrealtime.com" target="_blank" class="underline">nuxt-realtime</a>
      is an open-source Nuxt module I built that adds real-time, cross-client state
      synchronization on top of Socket.IO. It exposes a single composable,
      <code class="bg-[#1e1e1e] text-[#9cdcfe] px-1 py-0.5 rounded text-[11px]">useRealtimeState</code>, that mirrors Vue's <code class="bg-[#1e1e1e] text-[#9cdcfe] px-1 py-0.5 rounded text-[11px]">useState</code> API so any
      reactive value can be shared between connected clients without writing custom socket
      plumbing.
    </p>
    <img
      src="/img/projects/nuxt-realtime/homepage.png"
      alt="nuxt-realtime documentation site"
      class="flex self-center w-[90%] h-auto max-md:w-full"
    >
    <h2 class="text-xl font-bold">
      The Idea
    </h2>
    <p class="text-xs">
      Real-time features in a Nuxt app usually mean reaching for Socket.IO directly,
      wiring up event names, managing subscriptions, and reconciling server state with
      client reactivity. Every project ends up reinventing the same plumbing, and most
      of it has nothing to do with the feature being built.
    </p>
    <p class="text-xs">
      nuxt-realtime collapses that into a familiar primitive. If you can write
      <code class="bg-[#1e1e1e] text-[#9cdcfe] px-1 py-0.5 rounded text-[11px]">useState</code>, you can write a multiplayer feature. The module handles
      subscription lifecycle, broadcasting, and reconnection. The application code stays
      focused on what's actually being synced.
    </p>
    <h2 class="text-xl font-bold">
      The API
    </h2>
    <p class="text-xs">
      The whole surface is one composable. Update the ref locally, every connected client
      sees the change.
    </p>
    <div class="text-xs bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded leading-5 whitespace-pre font-mono" v-html="codeBlock" />
    <p class="text-xs">
      State is keyed and isolated, so different parts of an app can subscribe to different
      channels without crosstalk. Reactivity works the same as any other Vue ref, which
      means it composes cleanly with <code class="bg-[#1e1e1e] text-[#9cdcfe] px-1 py-0.5 rounded text-[11px]">computed</code>, <code class="bg-[#1e1e1e] text-[#9cdcfe] px-1 py-0.5 rounded text-[11px]">watch</code>, and the
      rest of the ecosystem.
    </p>
    <h2 class="text-xl font-bold">
      Tech Stack
    </h2>
    <ul class="text-xs flex flex-col gap-1 list-disc list-inside">
      <li><span class="font-bold">[Module]</span> - Nuxt 3</li>
      <li><span class="font-bold">[Language]</span> - TypeScript</li>
      <li><span class="font-bold">[Transport]</span> - Socket.IO</li>
      <li><span class="font-bold">[Storage]</span> - unstorage</li>
      <li><span class="font-bold">[Build]</span> - unbuild</li>
      <li><span class="font-bold">[Testing]</span> - Vitest</li>
      <li><span class="font-bold">[Distribution]</span> - npm</li>
    </ul>
    <h2 class="text-xl font-bold">
      Links
    </h2>
    <ul class="text-xs flex flex-col gap-1">
      <li>
        <a href="https://nuxtrealtime.com" target="_blank" class="underline">nuxtrealtime.com</a>
        - Documentation site
      </li>
      <li>
        <a href="https://github.com/daanvangeloven/nuxt-realtime" target="_blank" class="underline">github.com/daanvangeloven/nuxt-realtime</a>
        - Source code
      </li>
      <li>
        <a href="https://npmjs.com/package/nuxt-realtime" target="_blank" class="underline">npmjs.com/package/nuxt-realtime</a>
        - npm package
      </li>
    </ul>
  </div>
</template>
