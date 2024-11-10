<script setup>
import { ScrollArea } from '@/components/ui/scroll-area'
import Sidebar from '@/components/sidebar/SidebarIndex.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Sidebar />

    <ScrollArea class="w-full h-full p-4">
      <RouterView></RouterView>
    </ScrollArea>
  </SidebarProvider>
</template>
