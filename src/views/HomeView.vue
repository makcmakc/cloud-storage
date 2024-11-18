<script setup>
import { ref } from 'vue';
import { ScrollArea } from '@/components/ui/scroll-area'
import Sidebar from '@/components/sidebar/SidebarIndex.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

const isOpen = ref(true)
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <SidebarProvider v-model:open="isOpen">
      <Sidebar :isOpen="isOpen"/>
      <ScrollArea class="w-full h-full p-4">
        <RouterView></RouterView>
      </ScrollArea>
    </SidebarProvider>
  </TooltipProvider>
</template>
