export function useClippy() {
  const state = useState<'docked' | 'active'>('clippyState', () => 'docked');

  const activate = () => {
    state.value = 'active';
  };

  return { state, activate };
}
