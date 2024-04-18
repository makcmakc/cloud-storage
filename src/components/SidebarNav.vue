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
  isCollapsed: boolean
  links: LinkProp[]
}

// onMounted(() => {
//   // console.log(NavProps.isCollapsed);
// })

defineProps<NavProps>()
</script>

<template>
  <div :data-collapsed="isCollapsed" class="group flex flex-col data-[collapsed=true]:py-2">
    <nav class="grid group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 space-y-1">
      <template v-for="(link, index) of links">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <a
              href="#"
              :class="cn(
                buttonVariants({ variant: link.variant, size: 'icon' }),
                'h-9 w-9',
                link.variant === 'default'
                  && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )"
            >
              <Icon :icon="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
          </TooltipContent>
        </Tooltip>

        <RouterLink
          v-else
          :key="`2-${index}`"
          :to="link.route"
          :class="cn(
            buttonVariants({ variant: link.variant,  }),
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
        >
          <ClientOnly>
            <component :is="link.icon" class="mr-2 size-4" />
          </ClientOnly>
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