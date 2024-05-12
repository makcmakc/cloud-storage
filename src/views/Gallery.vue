<template>
  <div class="">

    <div class="columns-2 gap-2 md:gap-4 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-4">
      <img v-for="(image, idx) in images" @click="handleShow(idx)" :key="idx" :src="image" alt="" class="transition-all md:hover:scale-105">
    </div>


		<FsLightbox :toggler="visibleRef" :sources="images" :slide="indexRef+1"/>

    <!-- <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="images"
      :index="indexRef"
      @hide="handleHide"
      @on-index-change="handleChange"
      >
      <template v-slot:toolbar="{ toolbarMethods }">
        <div class="toolbar">
          <button @click="toolbarMethods.zoomIn">zoom in</button>
          <button @click="toolbarMethods.zoomOut">zoom out</button>
          <button @click="toolbarMethods.rotateLeft">Anticlockwise rotation</button>
          <button @click="toolbarMethods.rotateRight">clockwise rotation</button>
          <button @click="donwload">DOWNLOAD</button>
        </div>
      </template>
    </vue-easy-lightbox> -->
  </div>
</template>

<script setup>
// import VueEasyLightbox from 'vue-easy-lightbox'
// import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'

import FsLightbox from "fslightbox-vue/v3"
import { ref } from "vue";


const visibleRef = ref(false)
const indexRef = ref(0)


const donwload = () => alert('asdas')

const handleChange = (oldIndex, newIndex) => {
  console.log(oldIndex, newIndex)
}

const handleShow = (index) => {
  indexRef.value = index
  visibleRef.value = !visibleRef.value
  console.log(indexRef.value)
}

const handleHide = () => visibleRef.value = false

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