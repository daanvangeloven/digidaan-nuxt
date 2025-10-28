<template>
  <div class="project-content">
    <div class="util-row">
      <span class="util-item">File</span>
      <span class="util-item">Edit</span>
      <span class="util-item">View</span>
      <span class="util-item">Help</span>
    </div>
    <div class="search-row">
      <input
        class="w95-border"
        v-model="searchInput"
        type="text"
        placeholder="Search"
      />
      <button @click="onFilter" class="w95-button-border">
        <img
          src="/img/icons/search_directory.png"
          class="search-icon w95-search"
        />
      </button>
    </div>
    <div class="directory">
      <div
        class="project"
        @click="itemClick(project.id)"
        v-for="project in projects"
        :key="project.id"
      >
        <img :src="`/img/icons/${project.image}`" />
        <span class="project-title">{{ project.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import data from "@/assets/json/projects.json";
import { useModalStore } from "@/composables/useModals";

export default {
  setup() {
    const { openModal } = useModalStore();
    const searchInput = ref("");
    const filter = ref("");
    const projects = computed(() => {
      if (filter.value === "") {
        return data.projects;
      } else {
        return data.projects.filter((project) =>
          project.title.toLowerCase().includes(filter.value.toLowerCase())
        );
      }
    });

    const onFilter = () => {
      filter.value = searchInput.value;
    };

    const itemClick = (modalId: string) => {
      openModal(modalId);
    };

    return {
      projects,
      itemClick,
      searchInput,
      onFilter,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index";

.project-content {
  padding: 8px;
  padding-top: 0;
  user-select: none;
}

.util-row {
  display: flex;
  gap: 5px;
  padding-top: 2px;
  padding-bottom: 5px;
  .util-item {
    font-size: 10px;
    margin-right: 6px;
  }
}

.search-row {
  display: flex;
  gap: 5px;

  button {
    display: flex;
    align-content: center;
    border-radius: 0;
    padding: 3px;
  }

  img {
    width: 15px;
    height: 15px;
  }

  input[type="text"] {
    font-family: "Windows 95";
    font-size: 10px;
  }
  input[type="text"]:focus {
    outline: none;
  }
}

.directory {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 10px;
  padding: 20px;
  min-width: 400px;
  max-width: 500px;
  overflow-y: scroll;
  align-items: center;
  background-color: white;
  margin-top: 10px;

  .project {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    gap: 5px;
    padding: 10px;
    width: 30%;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }

    .project-title {
      font-size: 12px;
    }
  }
}

@media (max-width: 600px) {
  .directory {
    min-width: 300px;
    max-width: 400px;
  }
  .project {
    width: 40%;
  }
}
</style>
