<template>
  <div class="">
    <div class="columns-2 gap-2 md:gap-4 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-4">
      <img v-for="(image, idx) in images" :key="idx" :src="image" alt="" class="transition-all md:hover:scale-105">
    </div>
  </div>
</template>

<script setup>
const images = [
  'https://source.unsplash.com/bYuI23mnmDQ',
  'https://source.unsplash.com/Nllx4R-2c3o',
  'https://source.unsplash.com/lp40q07DIe0',
  'https://source.unsplash.com/wfalq01jJuU',
  'https://source.unsplash.com/rMHNK_skwwU',
  'https://source.unsplash.com/WBMjuGpbrCQ',
  'https://source.unsplash.com/nCUZ5BYBL_o',
  'https://source.unsplash.com/3u4fzMQZhjc',
  'https://source.unsplash.com/haOIqIPSwps',
  'https://source.unsplash.com/3UrYD7NNVxk',
  'https://source.unsplash.com/fm1JKDItlVM',
  'https://source.unsplash.com/qPpq1EVs8vw',
  'https://source.unsplash.com/xRyL63AwZFE',
  'https://source.unsplash.com/XeNKWTiCPNw',
  'https://source.unsplash.com/DFt3T5r_4FE',
  'https://source.unsplash.com/Ebwp2-6BG8E'
]
</script>