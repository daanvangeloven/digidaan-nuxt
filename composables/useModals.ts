// stores/modalStore.ts
import { defineStore } from "pinia";
import { ref, markRaw } from "vue";
import type { Modal } from "~/types/modal";
import data from "@/assets/json/screens.json";

export const useModalStore = defineStore("modalStore", () => {
  const modals = ref<Modal[]>([]);
  const zIndexCounter = ref(100);
  const activeModal = ref<string>("");

  const loadModalsFromStorage = () => {
    if (process.client) {
      const storedModals = localStorage.getItem("modals");

      if (storedModals) {
        modals.value = JSON.parse(storedModals);

        zIndexCounter.value = Math.max(
          ...modals.value.map((modal) => modal.zIndex),
          zIndexCounter.value
        );

        activeModal.value = modals.value.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        ).id;

        modals.value.forEach((modal) => {
          loadComponent(modal.contentName).then((component) => {
            if (component) {
              modal.content = markRaw(component);
            } else {
              console.error(
                `Component failed to load from pinia: ${modal.contentName}`
              );
            }
          });
        });
      }
    }
  };

  const saveModalsToStorage = () => {
    if (process.client) {
      localStorage.setItem("modals", JSON.stringify(modals.value));
    }
  };

  const addModal = async (screenData: any) => {
    const component = await loadComponent(screenData.content);
    if (component) {
      const newModal: Modal = {
        id: screenData.id,
        title: screenData.title,
        icon: screenData.icon,
        content: markRaw(component),
        contentName: screenData.content,
        minimized: false,
        taskbar: true,
        zIndex: zIndexCounter.value++,
        x: 0,
        y: 0,
      };
      modals.value.push(newModal);
      saveModalsToStorage();
    }
  };

  async function loadComponent(content: string) {
    try {
      const component = await import(
        `@/components/modal/modalcontent/${content}.vue`
      );
      return component.default;
    } catch (error) {
      console.error(`Failed to load component: ${content}`, error);
      return null;
    }
  }

  const openModal = async (modalId: string) => {
    const existingModal = modals.value.find((m) => m.id === modalId);
    if (existingModal) {
      existingModal.minimized = false;
      bringToFront(modalId);
      return;
    }

    const screenData = data.screens.find((screen) => screen.id === modalId);
    if (screenData) {
      await addModal(screenData);
      bringToFront(modalId);
    }
  };

  const closeModal = (modalId: string) => {
    modals.value = modals.value.filter((modal) => modal.id !== modalId);
    saveModalsToStorage();
  };

  const minimizeModal = (modalId: string) => {
    const existingModal = modals.value.find((m) => m.id === modalId);
    if (existingModal) {
      existingModal.minimized = true;
      saveModalsToStorage();
    }
  };

  const modalMoved = (modalId: string, x: number, y: number) => {
    const existingModal = modals.value.find((m) => m.id === modalId);
    if (existingModal) {
      existingModal.x = x;
      existingModal.y = y;
      saveModalsToStorage();
    }
  };

  const bringToFront = (modalId: string) => {
    const existingModal = modals.value.find((m) => m.id === modalId);
    if (existingModal) {
      existingModal.zIndex = zIndexCounter.value++;
      activeModal.value = modalId;
      saveModalsToStorage();
    }
  };

  loadModalsFromStorage();

  return {
    modals,
    openModal,
    closeModal,
    minimizeModal,
    bringToFront,
    modalMoved,
    activeModal,
  };
});
