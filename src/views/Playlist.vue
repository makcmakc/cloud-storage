<template>
  <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
    <AudioCard
      v-for="album in madeForYouAlbums"
      :key="album.name"
      :album="album"
      class="w-[150px]"
      aspect-ratio="square"
      :width="150"
      :height="150"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AudioCard from "../components/AudioCard.vue";

import { madeForYouAlbums } from '../components/albums'

import { usePlaylistStore } from '@/stores/playlists' 


const filesStore = usePlaylistStore()
const playlists = ref([])

onMounted(async () => {
  const data = await filesStore.fetchPlaylists()
  await filesStore.fetchPublicURL()
  playlists.value = data
})
</script>


<!-- <script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import Lightgallery from 'lightgallery/vue';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';

    // If you are using scss you can skip the css imports below and use scss instead
    import styles from 'lightgallery/scss/lightgallery.scss';

    @Options({
        components: {
            Lightgallery,
        },
        data: () => ({
            plugins: [lgThumbnail, lgZoom],
        }),
        methods: {
            onInit: () => {
                console.log('lightGallery has been initialized');
            },
            onBeforeSlide: () => {
                console.log('calling before slide');
            },
        },
    })
    export default class App extends Vue {}
</script>
<style lang="css" scoped>
    @import 'lightgallery/css/lightgallery.css';
    @import 'lightgallery/css/lg-thumbnail.css';
    @import 'lightgallery/css/lg-zoom.css';
</style> -->
