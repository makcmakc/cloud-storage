<script setup>
import { ref } from 'vue';
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/app/Header.vue'
import Sidebar from '@/components/sidebar/SidebarIndex.vue'
import { Separator } from '@/components/ui/separator'

const isOpen = ref(true)
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <SidebarProvider v-model:open="isOpen">
      <Sidebar :isOpen="isOpen" class="bg-sidebar" />
      <main class="w-full mr-2 px-2">
        <Header />
        <Separator class="mx-2 px-2" />
        <RouterView />
      </main>
    </SidebarProvider>
  </TooltipProvider>
</template>
