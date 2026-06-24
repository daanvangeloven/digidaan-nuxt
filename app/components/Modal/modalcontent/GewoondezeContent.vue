<template>
  <div class="p-5 mb-5 flex flex-col gap-5 overflow-y-auto max-w-[70vw] max-h-[70vh] max-md:max-w-full max-sm:max-h-none">
    <h1 class="text-2xl font-bold">
      gewoondeze.nl - Editorial Product Recommendations
    </h1>

    <p class="text-xs">
      <a href="https://gewoondeze.nl" target="_blank" class="underline">gewoondeze.nl</a>
      is a Dutch editorial recommendation site I built from scratch. It picks
      one winner per category across consumer electronics (e-readers, headphones, keyboards, mice,
      printers, routers, and tablets) instead of producing the usual top-10 lists.
    </p>

    <img
      src="/img/projects/gewoondeze/homepage.png"
      alt="gewoondeze.nl homepage"
      class="flex self-center w-[90%] h-auto max-md:w-full"
    >

    <h2 class="text-xl font-bold">
      The Editorial Bet
    </h2>

    <p class="text-xs">
      Most product recommendation sites optimize for SEO traffic with ranked lists, comparison
      tables, and AI-generated filler. gewoondeze.nl makes the opposite bet: one clear
      recommendation per category, chosen by a human, written like the advice you'd give a friend
      who asks.
    </p>

    <p class="text-xs">
      The constraint forces sharper editorial choices and produces shorter, more decisive pages.
      There's no "it depends on your use case" hedge. If it depends, we pick the most common case
      and own the choice.
    </p>

    <h2 class="text-xl font-bold">
      Share Mechanism
    </h2>

    <img
      src="/img/projects/gewoondeze/share-animation.png"
      alt="share animation showing sender name"
      class="flex self-center w-[80%] h-auto max-md:w-full"
    >

    <p class="text-xs">
      Recommendations can be shared with a personal touch. The share link plays a short animation
      that displays the sender's name, framing the recommendation as a personal endorsement rather
      than a generic link. This turns each visitor into a potential editorial voice and gives the
      site a distribution model that doesn't depend on search rankings alone.
    </p>

    <h2 class="text-xl font-bold">
      Affiliate Infrastructure
    </h2>

    <p class="text-xs">
      Monetization runs through affiliate marketing, primarily via the Awin network with Coolblue
      as the main retail partner.
    </p>

    <h2 class="text-xl font-bold">
      Tech Stack
    </h2>

    <ul class="text-xs flex flex-col gap-1 list-disc list-inside">
      <li><span class="font-bold">[Frontend]</span> - Nuxt</li>
      <li><span class="font-bold">[Styling]</span> - Tailwind</li>
      <li><span class="font-bold">[CMS / content]</span> - Nuxt Content with Nuxt Studio</li>
      <li><span class="font-bold">[Hosting]</span> - [where it runs]</li>
    </ul>

    <h2 class="text-xl font-bold">
      Links
    </h2>

    <ul class="text-xs flex flex-col gap-1">
      <li>
        <a href="https://gewoondeze.nl" target="_blank" class="underline">gewoondeze.nl</a>
        - Live website
      </li>
    </ul>
  </div>
</template>
