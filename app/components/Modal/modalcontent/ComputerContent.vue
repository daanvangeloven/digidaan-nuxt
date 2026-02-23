<template>
  <div class="flex flex-row gap-5 p-5 w-full max-md:flex-col">
    <div class="flex flex-col gap-2.5 p-2 border-l-2 border-r-2 border-t-2 border-b-2 border-l-w95-border-dark border-r-w95-border-light border-t-w95-border-dark border-b-w95-border-light">
      <h1 class="text-2xl font-bold">
        Welcome to DigidaanOS
      </h1>
      <p class="text-lg">
        This website was made by
        <a
          href="https://www.linkedin.com/in/daan-van-geloven-644794170/"
          target="_blank"
          class="font-bold underline"
        >Daan van Geloven</a>
      </p>
      <h3 class="text-lg font-bold">
        Technologies used:
      </h3>
      <ul class="list-none p-0">
        <li class="text-lg">
          Nuxt
        </li>
        <li class="text-lg">
          Vue 3
        </li>
        <li class="text-lg">
          Tailwind
        </li>
        <li class="text-lg">
          Typescript
        </li>
      </ul>
    </div>
    <div class="flex justify-center flex-col gap-2.5">
      <img src="/img/w95-backgroundlogo.png" alt="DigidaanOS Logo" class="w-[200px] h-[200px] self-center">
      <a
        href="https://www.linkedin.com/in/daan-van-geloven-644794170/"
        target="_blank"
        class="flex flex-row items-center flex-grow text-lg no-underline text-white rounded-sm p-2 bg-[#0077b5] w95-button-border"
      >
        <img src="/img/linkedin.png" alt="LinkedIn Logo" class="w-6 h-6 mr-1.5 ml-1.5">
        My Linkedin
      </a>
      <a
        href="https://github.com/daanvangeloven/digidaan-nuxt"
        target="_blank"
        class="flex flex-row items-center flex-grow text-lg no-underline text-white rounded-sm p-2 bg-[#333] w95-button-border"
      >
        <img src="/img/github.png" alt="Github" class="w-6 h-6 mr-1.5 ml-1.5">
        This page's source code
      </a>
    </div>
  </div>
</template>
