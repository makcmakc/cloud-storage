<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
// import { buttonVariants } from '@/lib/registry/new-york/ui/button'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { onMounted } from 'vue'

export interface LinkProp {
  title: string
  icon: string
  variant: 'default' | 'ghost',
  route: string
}

interface NavProps {
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div class="group flex flex-col data-[collapsed=true]:py-2">
    <nav class="grid group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 space-y-1">
      <template v-for="(link, index) of links" :key="`2-${index}`">
        <RouterLink
          :to="link.route"
          :class="cn(
            buttonVariants({ variant: link.variant,  }),
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
        >
          <component :is="link.icon" class="mr-2 size-4" />
          {{ link.title }}
        </RouterLink>
      </template>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: hsl(var(--secondary));
}
</style>