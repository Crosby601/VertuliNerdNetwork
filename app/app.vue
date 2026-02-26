<template>
  <div class="min-h-screen">
    <Navbar />

    <div class="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside class="hidden lg:block col-span-1"><LeftSidebar /></aside>
      <main class="col-span-1 lg:col-span-2">
        <Transition name="page" mode="out-in"><NuxtPage /></Transition>
      </main>
      <aside class="hidden lg:block col-span-1"><RightSidebar /></aside>
    </div>
  </div>
</template>

<style src="~/assets/styles/main.scss" lang="scss"></style>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>