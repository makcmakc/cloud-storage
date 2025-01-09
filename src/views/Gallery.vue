<template>
  <ScrollArea class="w-full py-4 px-2">
    <div class="columns-2 gap-2 md:gap-4 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-4">
      <img v-for="(image, idx) in images" @click="handleShow(idx)" :key="idx" :src="image" alt="" class="transition-all md:hover:scale-105">
    </div>
  </ScrollArea>
</template>

<script setup>
import { ScrollArea } from '@/components/ui/scroll-area'

const handleShow = (index) => {}

const images = []
</script>