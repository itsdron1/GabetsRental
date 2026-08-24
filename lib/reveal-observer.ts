type RevealObserverOptions = {
  once: boolean;
};

let sharedObserver: IntersectionObserver | null = null;
const optionMap = new WeakMap<Element, RevealObserverOptions>();

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          const opts = optionMap.get(entry.target);
          if (opts?.once) {
            sharedObserver?.unobserve(entry.target);
            optionMap.delete(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "80px 0px" },
    );
  }
  return sharedObserver;
}

export function observeReveal(el: HTMLElement, options: RevealObserverOptions): void {
  optionMap.set(el, options);
  getObserver().observe(el);
}

export function unobserveReveal(el: HTMLElement): void {
  optionMap.delete(el);
  sharedObserver?.unobserve(el);
}
