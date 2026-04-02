
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

interface _GlobalComponents {
  CategoriesCategoryCard: typeof import("../../components/categories/CategoryCard.vue")['default']
  DashboardCategoryOverview: typeof import("../../components/dashboard/CategoryOverview.vue")['default']
  DashboardSummaryCards: typeof import("../../components/dashboard/SummaryCards.vue")['default']
  LayoutAppHeader: typeof import("../../components/layout/AppHeader.vue")['default']
  LayoutAppSidebar: typeof import("../../components/layout/AppSidebar.vue")['default']
  TransactionsTransactionCard: typeof import("../../components/transactions/TransactionCard.vue")['default']
  TransactionsTransactionForm: typeof import("../../components/transactions/TransactionForm.vue")['default']
  TransactionsWishlistCard: typeof import("../../components/transactions/WishlistCard.vue")['default']
  UiBottomSheet: typeof import("../../components/ui/BottomSheet.vue")['default']
  UiBulkActionsBar: typeof import("../../components/ui/BulkActionsBar.vue")['default']
  UiButton: typeof import("../../components/ui/Button.vue")['default']
  UiEmptyState: typeof import("../../components/ui/EmptyState.vue")['default']
  UiErrorState: typeof import("../../components/ui/ErrorState.vue")['default']
  UiFAB: typeof import("../../components/ui/FAB.vue")['default']
  UiInput: typeof import("../../components/ui/Input.vue")['default']
  UiModal: typeof import("../../components/ui/Modal.vue")['default']
  UiProgressBar: typeof import("../../components/ui/ProgressBar.vue")['default']
  UiSelect: typeof import("../../components/ui/Select.vue")['default']
  UiToast: typeof import("../../components/ui/Toast.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyCategoriesCategoryCard: LazyComponent<typeof import("../../components/categories/CategoryCard.vue")['default']>
  LazyDashboardCategoryOverview: LazyComponent<typeof import("../../components/dashboard/CategoryOverview.vue")['default']>
  LazyDashboardSummaryCards: LazyComponent<typeof import("../../components/dashboard/SummaryCards.vue")['default']>
  LazyLayoutAppHeader: LazyComponent<typeof import("../../components/layout/AppHeader.vue")['default']>
  LazyLayoutAppSidebar: LazyComponent<typeof import("../../components/layout/AppSidebar.vue")['default']>
  LazyTransactionsTransactionCard: LazyComponent<typeof import("../../components/transactions/TransactionCard.vue")['default']>
  LazyTransactionsTransactionForm: LazyComponent<typeof import("../../components/transactions/TransactionForm.vue")['default']>
  LazyTransactionsWishlistCard: LazyComponent<typeof import("../../components/transactions/WishlistCard.vue")['default']>
  LazyUiBottomSheet: LazyComponent<typeof import("../../components/ui/BottomSheet.vue")['default']>
  LazyUiBulkActionsBar: LazyComponent<typeof import("../../components/ui/BulkActionsBar.vue")['default']>
  LazyUiButton: LazyComponent<typeof import("../../components/ui/Button.vue")['default']>
  LazyUiEmptyState: LazyComponent<typeof import("../../components/ui/EmptyState.vue")['default']>
  LazyUiErrorState: LazyComponent<typeof import("../../components/ui/ErrorState.vue")['default']>
  LazyUiFAB: LazyComponent<typeof import("../../components/ui/FAB.vue")['default']>
  LazyUiInput: LazyComponent<typeof import("../../components/ui/Input.vue")['default']>
  LazyUiModal: LazyComponent<typeof import("../../components/ui/Modal.vue")['default']>
  LazyUiProgressBar: LazyComponent<typeof import("../../components/ui/ProgressBar.vue")['default']>
  LazyUiSelect: LazyComponent<typeof import("../../components/ui/Select.vue")['default']>
  LazyUiToast: LazyComponent<typeof import("../../components/ui/Toast.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
