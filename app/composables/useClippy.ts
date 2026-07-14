export function useClippy() {
  const state = useState<'docked' | 'active'>('clippyState', () => 'docked');

  const activate = () => {
    state.value = 'active';
  };

  const dismiss = () => {
    state.value = 'docked';
  };

  return { state, activate, dismiss };
}
