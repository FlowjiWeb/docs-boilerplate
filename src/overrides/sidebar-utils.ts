import type { SidebarEntry, SidebarGroup } from '@astrojs/starlight/utils/routing/types';

function hasCurrentPage(entries: SidebarEntry[]): boolean {
  return entries.some(entry =>
    entry.type === 'link' ? entry.isCurrent : hasCurrentPage(entry.entries)
  );
}

/** Returns the top-level SidebarGroup that contains the current page, or undefined. */
export function getCurrentSection(sidebar: SidebarEntry[]): SidebarGroup | undefined {
  return sidebar.find(
    (entry): entry is SidebarGroup =>
      entry.type === 'group' && hasCurrentPage(entry.entries)
  );
}
