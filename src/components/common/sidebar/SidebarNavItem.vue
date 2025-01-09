<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface LinkProp {
  title: string
  icon: string
  variant: 'default' | 'ghost',
  route: string
}

interface props {
  link: LinkProp,
  isOpen: boolean
}

defineProps<props>()
</script>

<template>
  <Tooltip v-if="!isOpen">
    <TooltipTrigger as-child>
      <RouterLink :to="link.route">
        <component :is="link.icon" class="mr-2 size-4" />
      </RouterLink>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4">
      <RouterLink :to="link.route" class="flex items-center">
        {{ link.title }}
      </RouterLink>
    </TooltipContent>
  </Tooltip>

  <RouterLink :to="link.route" class="flex items-center w-full" v-else>
    <component :is="link.icon" class="mr-2 size-4" />
    {{ link.title }}
  </RouterLink>
</template>
