<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/common/header/Header.vue'
import Sidebar from '@/components/common/sidebar/SidebarIndex.vue'

const isOpen = ref(true)
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <SidebarProvider v-model:open="isOpen">
      <Sidebar :isOpen="isOpen" class="bg-sidebar" />
      <main class="w-full">
        <Header />
        <RouterView />
      </main>
    </SidebarProvider>
  </TooltipProvider>
</template>
