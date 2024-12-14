<template>
  <header class="pl-2">
    <div class="space-between md:flex items-center hidden h-11">    
      <div class="flex items-center justify-between w-full">
        <div class="gap-3 inline-flex items-center justify-center">
          <SidebarTrigger class="size-4 text-muted-foreground" />
          <Separator orientation="vertical" class="h-5" />
        </div>
      </div>

      <div class="flex shrink-0 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="px-2">
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuRadioGroup v-model="sortBy">
              <DropdownMenuRadioItem value="name">
                Name
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="size">
                Size
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date">
                Date
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="px-2">
              View by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup v-model="viewBy">
              <DropdownMenuRadioItem value="tile">
                Tile
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">
                List
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup>

import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
</script>