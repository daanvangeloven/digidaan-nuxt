import { ref, markRaw } from "vue";
import type { Modal } from "~/types/modal";
import data from "@/assets/json/screens.json";

const modals = ref<Modal[]>([]);
const zIndexCounter = ref(100);

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

async function addModal(screenData: any) {
  const component = await loadComponent(screenData.content);
  if (component) {
    const newModal: Modal = {
      id: screenData.id,
      title: screenData.title,
      icon: screenData.icon,
      content: markRaw(component),
      minimized: false,
      taskbar: true,
      zIndex: zIndexCounter.value++,
      x: 0,
      y: 0,
    };

    modals.value.push(newModal);
  }
}

async function openModal(modalId: string) {
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
}

function closeModal(modalId: string) {
  modals.value = modals.value.filter((modal) => modal.id !== modalId);
}

function minimizeModal(modalId: string) {
  const existingModal = modals.value.find((m) => m.id === modalId);
  if (existingModal) {
    existingModal.minimized = true;
  }
}

function modalMoved(modalId: string, x: number, y: number) {
  const existingModal = modals.value.find((m) => m.id === modalId);
  if (existingModal) {
    existingModal.x = x;
    existingModal.y = y;
  }
}

function bringToFront(modalId: string) {
  const existingModal = modals.value.find((m) => m.id === modalId);
  if (existingModal) {
    existingModal.zIndex = zIndexCounter.value++;
  }
}

export function useModals() {
  return {
    modals,
    openModal,
    closeModal,
    minimizeModal,
    bringToFront,
    modalMoved,
  };
}
