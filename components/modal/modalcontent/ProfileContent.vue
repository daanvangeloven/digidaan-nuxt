<template>
  <div class="profile-content">
    <div class="header">
      <img src="/img/profile/portrait.png" alt="User" />
      <h1 class="title">Hello, I’m Daan van Geloven a Web Wizard.</h1>
    </div>
    <div class="body">
      <h3 class="subtitle">Independent Full-Stack Developer</h3>
    </div>
  </div>
</template>

<style lang="scss">
.profile-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .header img {
    width: 100px;
    height: 100px;
  }

  .header .title {
    font-size: 24px;
    font-weight: bold;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .body .subtitle {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
