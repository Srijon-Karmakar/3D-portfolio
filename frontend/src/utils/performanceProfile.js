export function getDeviceProfile() {
  if (typeof window === "undefined") {
    return {
      prefersReducedMotion: false,
      isSmallScreen: false,
      isCoarsePointer: false,
      isConstrained: false,
      canUseSmoothScroll: true,
      canUseSpline: true,
      canUseInteractiveText: true,
      canAutoLoadChat: true,
    };
  }

  const nav = navigator;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const saveData = connection?.saveData === true;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu =
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 4;

  const isConstrained =
    prefersReducedMotion ||
    saveData ||
    lowMemory ||
    lowCpu ||
    isSmallScreen ||
    isCoarsePointer;

  return {
    prefersReducedMotion,
    isSmallScreen,
    isCoarsePointer,
    isConstrained,
    canUseSmoothScroll: !isConstrained,
    canUseSpline: !(
      prefersReducedMotion ||
      saveData ||
      lowMemory ||
      lowCpu ||
      isSmallScreen
    ),
    canUseInteractiveText: !(
      prefersReducedMotion ||
      saveData ||
      lowMemory ||
      lowCpu ||
      isSmallScreen ||
      isCoarsePointer
    ),
    canAutoLoadChat: !(saveData || lowMemory || lowCpu),
  };
}
