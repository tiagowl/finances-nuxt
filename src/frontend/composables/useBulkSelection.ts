export function useBulkSelection<T extends { id: string }>() {
  const selectedIds = ref<Set<string>>(new Set())

  const selectedCount = computed(() => selectedIds.value.size)

  const hasSelection = computed(() => selectedIds.value.size > 0)

  function isSelected(id: string): boolean {
    return selectedIds.value.has(id)
  }

  function toggle(id: string) {
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id)
    } else {
      selectedIds.value.add(id)
    }
    selectedIds.value = new Set(selectedIds.value)
  }

  function selectAll(items: T[]) {
    selectedIds.value = new Set(items.map(item => item.id))
  }

  function deselectAll() {
    selectedIds.value = new Set()
  }

  function toggleAll(items: T[]) {
    if (selectedIds.value.size === items.length) {
      deselectAll()
    } else {
      selectAll(items)
    }
  }

  function getSelectedIds(): string[] {
    return Array.from(selectedIds.value)
  }

  return {
    selectedIds,
    selectedCount,
    hasSelection,
    isSelected,
    toggle,
    selectAll,
    deselectAll,
    toggleAll,
    getSelectedIds
  }
}
