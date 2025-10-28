<template>
  <div class="about-content">
    <h1>About Me</h1>
    <div class="row">
      <!-- Left Column -->
      <div class="col">
        <p>
          My name is <span class="bold">Daan van Geloven</span>, and I’m a
          <span class="bold">Front-end Developer</span> based in the Netherlands.
        </p>
        <p>
          At <span class="bold">Social Deal</span>, I work on a variety of projects within the web platform.
          I develop updated back-office interfaces, maintain and expand component libraries,
          and build new features using <span class="bold">Nuxt</span>.
        </p>
      </div>

      <!-- Right Column -->
      <div class="col">
        <p>
          I am also part of the complete modernization of the Social Deal platform to Nuxt,
          aiming to create a faster, more scalable, and future-proof architecture.
        </p>
        <p>
          I enjoy using technology to solve problems and continuously seek new challenges
          that allow me to grow as a developer.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.bold {
  font-weight: bold;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
  width: 45%;
}

@media (max-width: 768px) {
  .col {
    width: 100%;
  }
}
</style>
