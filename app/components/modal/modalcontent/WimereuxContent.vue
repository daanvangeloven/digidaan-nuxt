<template>
  <div class="wimereux-content">
    <img src="/img/projects/wimereux/wimereux.png" />
    <h1>Wimereux</h1>
    <p>
      <a href="http://wimereux.nl" target="_blank">The Wimereux Website</a>
      is a website designed to promote and facilitate the rental of a charming
      holiday house located in the town of Wimereux, France. I provided
      end-to-end support encompassing design, development, hosting, email
      integration, and an overarching strategy to optimize conversions and
      enhance search engine visibility.
    </p>
  </div>
</template>

<style lang="scss">
.wimereux-content {
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
  .wimereux-content {
    max-width: 100%;
  }
  .wimereux-content img {
    width: 100%;
  }
}
</style>
