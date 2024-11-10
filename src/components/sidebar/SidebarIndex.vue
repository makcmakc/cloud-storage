<script setup>
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigationStore } from '@/stores/navigation' 

const navigationStore = useNavigationStore()
const links = navigationStore.getNavigationLinks

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

import { LogOut, Database, File, Images, ListMusic  } from 'lucide-vue-next'
import StorageInfo from '@/components/sidebar/StorageInfo.vue'
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="flex gap-2 items-center">
            <span class="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
              <img class="aspect-square h-full w-full" alt="shadcn" src="https://i.pinimg.com/originals/67/91/b3/6791b3f58057244a4a35c4d46e128490.jpg">
            </span>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">shadcn</span>
              <span class="truncate text-xs">m@example.com</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-chevrons-up-down ml-auto size-4">
              <path d="m7 15 5 5 5-5"></path>
              <path d="m7 9 5-5 5 5"></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <!-- <Github class="mr-2 h-4 w-4" /> -->
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <!-- <Settings class="mr-2 h-4 w-4" /> -->
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <!-- <UserRoundPen class="mr-2 h-4 w-4" /> -->
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
        <SidebarGroupLabel>Browse</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="link in links" :key="link.title">
              <SidebarMenuButton isActive>
                <RouterLink :to="link.route" class="flex">
                  <component :is="link.icon" class="mr-2 size-4" />
                  {{ link.title }}
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div class="group-data-[collapsible=icon]:hidden">
        <StorageInfo />
      </div>
      <div class="group-data-[collapsible=icon]:flex hidden items-center justify-center w-8 h-8 border rounded-md">
        <Database class=" size-4"/>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
