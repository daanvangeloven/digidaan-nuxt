import type { Modal } from '~/types/modal';
import { markRaw } from 'vue';
import data from '@/assets/json/screens.json';

interface SerializableModal {
  id: string;
  title: string;
  icon: string;
  contentName: string;
  minimized: boolean;
  taskbar: boolean;
  zIndex: number;
  x: number;
  y: number;
}

export function useModalStore() {
  const router = useRouter();
  const { width: windowWidth } = useWindowSize();

  const setUrlModal = (modalId: string) => {
    if (!import.meta.client) return;
    router.options.history.replace(modalId ? `/${modalId}` : '/');
  };
  // Use useLocalStorage for automatic persistence
  const storedModals = useLocalStorage<SerializableModal[]>('modals', [], {
    serializer: {
      read: (value: string) => {
        try {
          const parsed = JSON.parse(value);
          // Validate structure
          if (Array.isArray(parsed) && parsed.every(m => m.id && m.contentName)) {
            return parsed;
          }
          console.warn('Invalid modal data in localStorage, resetting...');
          return [];
        }
        catch {
          return [];
        }
      },
      write: (value: SerializableModal[]) => JSON.stringify(value),
    },
  });

  const zIndexCounter = useState<number>('zIndexCounter', () => {
    // Initialize from stored modals
    if (storedModals.value.length > 0) {
      return Math.max(...storedModals.value.map(m => m.zIndex), 100);
    }
    return 100;
  });

  const activeModal = useState<string>('activeModal', () => '');
  const modals = useState<Modal[]>('modals', () => []);
  const isLoaded = useState<boolean>('modals-loaded', () => false);

  // Load components for stored modals on client side - only once
  const loadStoredModals = async () => {
    if (!isLoaded.value && storedModals.value.length > 0) {
      isLoaded.value = true;
      const loadedModals: Modal[] = [];

      for (const storedModal of storedModals.value) {
        const component = await loadComponent(storedModal.contentName);
        if (component) {
          loadedModals.push({
            ...storedModal,
            content: markRaw(component),
          });
        }
      }

      modals.value = loadedModals;
    }
  };

  // Load on client side
  if (import.meta.client) {
    loadStoredModals();
  }

  // Sync modals to localStorage whenever they change
  const syncToStorage = () => {
    storedModals.value = modals.value.map(({ content, ...rest }) => rest);
  };

  const addModal = async (screenData: any) => {
    const component = await loadComponent(screenData.content);
    if (component) {
      if (modals.value.find(m => m.id === screenData.id))
        return;
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
      syncToStorage();
    }
  };

  async function loadComponent(content: string) {
    try {
      const component = await import(
        `@/components/Modal/modalcontent/${content}.vue`,
      );
      return component.default;
    }
    catch (error) {
      console.error(`Failed to load component: ${content}`, error);
      return null;
    }
  }

  const bringToFront = (modalId: string) => {
    const existingModal = modals.value.find(m => m.id === modalId);
    if (existingModal) {
      existingModal.zIndex = zIndexCounter.value++;
      activeModal.value = modalId;
      syncToStorage();
      setUrlModal(modalId);
    }
  };

  const openModal = async (modalId: string) => {
    // On mobile, enforce single modal
    if (import.meta.client && windowWidth.value < 640 && modals.value.length > 0) {
      modals.value = [];
      syncToStorage();
    }

    const existingModal = modals.value.find(m => m.id === modalId);
    if (existingModal) {
      existingModal.minimized = false;
      bringToFront(modalId);
      return;
    }

    const screenData = data.screens.find(screen => screen.id === modalId);
    if (screenData) {
      await addModal(screenData);
      bringToFront(modalId);
    }
  };

  const closeModal = (modalId: string) => {
    modals.value = modals.value.filter(modal => modal.id !== modalId);
    syncToStorage();
    if (import.meta.client && window.location.pathname === `/${modalId}`) {
      setUrlModal('');
    }
  };

  const minimizeModal = (modalId: string) => {
    const existingModal = modals.value.find(m => m.id === modalId);
    if (existingModal) {
      existingModal.minimized = true;
      syncToStorage();
    }
  };

  const modalMoved = (modalId: string, x: number, y: number) => {
    const existingModal = modals.value.find(m => m.id === modalId);
    if (existingModal) {
      existingModal.x = x;
      existingModal.y = y;
      syncToStorage();
    }
  };

  return {
    modals,
    openModal,
    closeModal,
    minimizeModal,
    bringToFront,
    modalMoved,
    activeModal,
  };
}
