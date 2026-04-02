<template>
  <div class="min-h-screen bg-gray-50">
    <LayoutAppSidebar class="hidden lg:block" />
    <LayoutAppHeader />
    <main class="lg:ml-64 pb-20 lg:pb-0">
      <div class="p-4 lg:p-6 max-w-5xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
