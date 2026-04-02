
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const CategoriesCategoryCard: typeof import("../components/categories/CategoryCard.vue")['default']
export const DashboardCategoryOverview: typeof import("../components/dashboard/CategoryOverview.vue")['default']
export const DashboardSummaryCards: typeof import("../components/dashboard/SummaryCards.vue")['default']
export const LayoutAppHeader: typeof import("../components/layout/AppHeader.vue")['default']
export const LayoutAppSidebar: typeof import("../components/layout/AppSidebar.vue")['default']
export const TransactionsTransactionCard: typeof import("../components/transactions/TransactionCard.vue")['default']
export const TransactionsTransactionForm: typeof import("../components/transactions/TransactionForm.vue")['default']
export const TransactionsWishlistCard: typeof import("../components/transactions/WishlistCard.vue")['default']
export const UiBottomSheet: typeof import("../components/ui/BottomSheet.vue")['default']
export const UiBulkActionsBar: typeof import("../components/ui/BulkActionsBar.vue")['default']
export const UiButton: typeof import("../components/ui/Button.vue")['default']
export const UiEmptyState: typeof import("../components/ui/EmptyState.vue")['default']
export const UiErrorState: typeof import("../components/ui/ErrorState.vue")['default']
export const UiFAB: typeof import("../components/ui/FAB.vue")['default']
export const UiInput: typeof import("../components/ui/Input.vue")['default']
export const UiModal: typeof import("../components/ui/Modal.vue")['default']
export const UiProgressBar: typeof import("../components/ui/ProgressBar.vue")['default']
export const UiSelect: typeof import("../components/ui/Select.vue")['default']
export const UiToast: typeof import("../components/ui/Toast.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyCategoriesCategoryCard: LazyComponent<typeof import("../components/categories/CategoryCard.vue")['default']>
export const LazyDashboardCategoryOverview: LazyComponent<typeof import("../components/dashboard/CategoryOverview.vue")['default']>
export const LazyDashboardSummaryCards: LazyComponent<typeof import("../components/dashboard/SummaryCards.vue")['default']>
export const LazyLayoutAppHeader: LazyComponent<typeof import("../components/layout/AppHeader.vue")['default']>
export const LazyLayoutAppSidebar: LazyComponent<typeof import("../components/layout/AppSidebar.vue")['default']>
export const LazyTransactionsTransactionCard: LazyComponent<typeof import("../components/transactions/TransactionCard.vue")['default']>
export const LazyTransactionsTransactionForm: LazyComponent<typeof import("../components/transactions/TransactionForm.vue")['default']>
export const LazyTransactionsWishlistCard: LazyComponent<typeof import("../components/transactions/WishlistCard.vue")['default']>
export const LazyUiBottomSheet: LazyComponent<typeof import("../components/ui/BottomSheet.vue")['default']>
export const LazyUiBulkActionsBar: LazyComponent<typeof import("../components/ui/BulkActionsBar.vue")['default']>
export const LazyUiButton: LazyComponent<typeof import("../components/ui/Button.vue")['default']>
export const LazyUiEmptyState: LazyComponent<typeof import("../components/ui/EmptyState.vue")['default']>
export const LazyUiErrorState: LazyComponent<typeof import("../components/ui/ErrorState.vue")['default']>
export const LazyUiFAB: LazyComponent<typeof import("../components/ui/FAB.vue")['default']>
export const LazyUiInput: LazyComponent<typeof import("../components/ui/Input.vue")['default']>
export const LazyUiModal: LazyComponent<typeof import("../components/ui/Modal.vue")['default']>
export const LazyUiProgressBar: LazyComponent<typeof import("../components/ui/ProgressBar.vue")['default']>
export const LazyUiSelect: LazyComponent<typeof import("../components/ui/Select.vue")['default']>
export const LazyUiToast: LazyComponent<typeof import("../components/ui/Toast.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
