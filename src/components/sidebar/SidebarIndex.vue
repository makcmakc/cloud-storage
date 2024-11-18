<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'

import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenu
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import SidebarNavItem from './SidebarNavItem.vue'

import { LogOut, Database, ChevronsUpDown, Github, Settings, UserRoundCog } from 'lucide-vue-next'
import StorageInfo from '@/components/sidebar/StorageInfo.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import UploadButton from './UploadButton.vue'

const authStore = useAuthStore()
const navigationStore = useNavigationStore()

const user = computed(() => authStore.getUser)
const links = navigationStore.getNavigationLinks


interface props {
  isOpen: boolean
}

defineProps<props>()

</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="flex group-data-[collapsible=icon]:gap-0 gap-2 px-2 py-4 items-center">
            <span class="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
              <img class="aspect-square h-full w-full" alt="shadcn"
                src="https://i.pinimg.com/originals/67/91/b3/6791b3f58057244a4a35c4d46e128490.jpg">
            </span>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Maxon</span>
              <span class="truncate text-xs" v-if="user">{{ user.email }}</span>
            </div>
            <ChevronsUpDown :size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github class="mr-2" :size="16" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings class="mr-2" :size="16" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRoundCog class="mr-2" :size="16" />
            <span>Edit Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu class="mb-2">
            <SidebarMenuItem>
              <UploadButton :isOpen="isOpen" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupLabel>Browse</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="link in links" :key="link.title">
              <SidebarMenuButton isActive>
                <SidebarNavItem :link="link" :isOpen="isOpen" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div class="group-data-[collapsible=icon]:hidden">
        <StorageInfo :isOpen="isOpen" />
      </div>
      <div class="group-data-[collapsible=icon]:flex hidden items-center justify-center w-8 h-8 border rounded-md">
        <Database class=" size-4" />
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
