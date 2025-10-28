<template>
  <div class="pbma-content">
    <img src="/img/projects/pbma/pbma.png" />
    <h1>PBMA</h1>
    <p>
      <a href="http://pbmadvies.com" target="_blank">PBMA</a>
      is a Soil and Environmental Advisory agency. I had previously developed
      the
      <a class="wimereux-link" @click="openModal('wimereux')"
        >Wimereux website</a
      >
      for the same client. Because of his positive experience with me, he
      requested me to develop a website for his new company as well. After some
      iterations we landed on the current design.
    </p>
  </div>
</template>

<script lang="ts">
import { useModalStore } from "@/composables/useModals";

export default {
  setup() {
    const { openModal } = useModalStore();

    return {
      openModal,
    };
  },
};
</script>

<style lang="scss">
.pbma-content {
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

  .wimereux-link {
    cursor: pointer;
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .pbma-content {
    max-width: 100%;
  }
  .pbma-content img {
    width: 100%;
  }
}
</style>
