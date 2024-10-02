import type { Component } from "vue";

// modal type
export interface Modal {
  id: string;
  title: string;
  icon: string;
  content: Component;
  minimized: boolean;
  taskbar: boolean;
  zIndex: number;
  x: number;
  y: number;
}
