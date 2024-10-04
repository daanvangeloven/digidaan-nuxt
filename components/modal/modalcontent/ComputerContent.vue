<template>
  <div class="computer-content">
    <div class="computer-text">
      <h1>Welcome to DigidaanOS</h1>
      <p>
        This website was made by
        <a
          href="https://www.linkedin.com/in/daan-van-geloven-644794170/"
          target="_blank"
          class="name"
          >Daan van Geloven</a
        >
      </p>
      <h3>Technologies used:</h3>
      <ul>
        <li>NuxtJS</li>
        <li>Vue 3</li>
        <li>SCSS</li>
        <li>Typescript</li>
        <li>Pinia</li>
      </ul>
    </div>
    <div class="computer-info">
      <img src="/img/w95-backgroundlogo.png" alt="DigidaanOS Logo" />
      <a
        href="https://www.linkedin.com/in/daan-van-geloven-644794170/"
        target="_blank"
        class="imglink linkedin w95-button-border"
      >
        <img
          src="/img/linkedin.png"
          class=""
          alt="linkedin Logo w95-button-border"
        />
        My Linkedin
      </a>
      <a
        href="https://github.com/daanvangeloven/digidaan-nuxt"
        target="_blank"
        class="imglink github Logo w95-button-border"
      >
        <img src="/img/github.png" alt="Github" />
        This page's source code
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/index";

$linkedin: #0077b5;
$github: #333;

.computer-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  width: 100%;

  .computer-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    img {
      width: 200px;
      height: 200px;
      align-self: center;
    }

    .imglink {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-grow: 1;
      font-size: 18px;
      text-decoration: underline;
      color: $text-light;
      border-radius: 2px;
      text-decoration: none;
      padding: 8px;

      &.linkedin {
        background-color: $linkedin;
      }

      &.github {
        background-color: $github;
      }

      img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        margin-left: 6px;
      }
    }
  }

  .computer-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px;
    border-left: 2px solid $border-dark;
    border-right: 2px solid $border-light;
    border-top: 2px solid $border-dark;
    border-bottom: 2px solid $border-light;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      font-size: 18px;
    }

    .name {
      font-weight: bold;
      text-decoration: underline;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        font-size: 18px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .computer-content {
    flex-direction: column;
  }
}
</style>
