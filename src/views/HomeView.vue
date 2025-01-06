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
      <main class="w-full">
        <!-- bg-muted  px-2 pr-2-->
        <Header class=" " />
        <!-- border-b-2 border-white -->
        <!-- <Separator class="mx-2 px-2 ml-2" /> -->
        <RouterView />
      </main>
    </SidebarProvider>
  </TooltipProvider>
</template>
