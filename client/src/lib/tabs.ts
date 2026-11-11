import type { KeyboardEvent } from 'react';

export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;

/**
 * Arrow / Home / End key handling for a WAI-ARIA tablist.
 * Moves selection and focus together (automatic activation).
 */
export function tabKeyHandler<T extends string>(
  prefix: string,
  ids: readonly T[],
  active: T,
  setActive: (id: T) => void,
) {
  return (e: KeyboardEvent) => {
    const i = ids.indexOf(active);
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % ids.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ids.length - 1;
    if (next < 0) return;

    e.preventDefault();
    setActive(ids[next]);
    document.getElementById(tabId(prefix, ids[next]))?.focus();
  };
}
