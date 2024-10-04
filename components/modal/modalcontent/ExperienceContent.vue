<template>
  <div class="experience-content">
    <h1>Experience</h1>
    <div class="job-history">
      <div v-for="job in experience" class="job">
        <h2>{{ job.title }}</h2>
        <h3>{{ job.company }}</h3>
        <p>{{ job.date }}</p>
        <p>{{ job.description }}</p>
      </div>
    </div>
    <h1>Skills</h1>
    <div class="skills">
      <div v-for="skill in skills" class="skill">
        <p>{{ skill.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import data from "@/assets/json/experience.json";

export default {
  setup() {
    const experience = data.experience;
    const skills = data.skills;

    return {
      experience,
      skills,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index";

.experience-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  overflow-y: scroll;
  align-items: center;
}

h1 {
  font-size: 50px;
  font-weight: bold;
}

.job-history {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 85%;

  border-left: 1px solid $border-light;
  border-right: 1px solid $border-dark;
  border-top: 1px solid $border-light;
  border-bottom: 1px solid $border-dark;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
  }
}

.job {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid $border-light;
}

@media (max-width: 600px) {
  h1 {
    font-size: 30px;
  }

  .job-history {
    width: 100%;
  }
}
</style>
