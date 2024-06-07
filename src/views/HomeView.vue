<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/app/Header.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <Header></Header>

  <main class="flex h-full">
    <!-- pb-4 w-[300px] md:flex flex-col hidden -->
    <Sidebar />

    <ScrollArea class="w-full h-full p-4 md:border-l">
      <RouterView></RouterView>
    </ScrollArea>
  </main>
</template>
