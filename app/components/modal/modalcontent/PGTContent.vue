<template>
  <div class="pgt-content">
    <img src="/img/projects/pgt/pgt.png" />
    <h1>PGT Veldhoven</h1>
    <p>
      The <a href="https://pgtveldhoven.nl" target="_blank">PGT Veldhoven</a> is
      a website I developed for a therapist in Veldhoven. She came to me with a
      request for a website but didn't have any specific requirements. Together
      we came up with the name PGT Veldhoven and started working on the website
      design. After some iterations we landed on the current design.
    </p>
  </div>
</template>

<style lang="scss">
.pgt-content {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  max-width: 70vw;

  img {
    display: flex;
    align-self: center;
    width: 80%;
    height: auto;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .pgt-content {
    max-width: 100%;
  }
  .pgt-content img {
    width: 100%;
  }
}
</style>
