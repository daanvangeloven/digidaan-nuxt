<template>
  <div class="contact-content">
    <h1>Contact</h1>
    <div class="contact-buttons">
      <a
        href="https://www.linkedin.com/in/daan-van-geloven-644794170/"
        target="_blank"
        rel="noopener noreferrer"
        class="linkedin-button w95-button-border"
      >
        <img src="/img/linkedin.png" alt="LinkedIn Logo">
        Connect on LinkedIn
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/index';

$linkedin: #0077b5;

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
}

.contact-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.linkedin-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  text-decoration: none;
  color: $text-light;
  background-color: $linkedin;
  border-radius: 2px;
  padding: 8px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
    margin-left: 6px;
  }
}
</style>
