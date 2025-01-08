import type { Component } from 'vue';
import AudioCard from '@/components/files/cards/AudioCard.vue'
import ImageCard from '@/components/files/cards/ImageCard.vue'
import BaseCard from '@/components/files/cards/BaseCard.vue'
import VideoCard from '@/components/files/cards/VideoCard.vue'

export const getFileComponent = (mimetype: string): Component => {
  if (mimetype.startsWith('audio/')) return AudioCard
  if (mimetype.startsWith('image/')) return ImageCard
  if (mimetype.startsWith('video/')) return VideoCard
  return BaseCard
}; 