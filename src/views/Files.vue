<template>
  <div class="space-between md:flex items-center hidden">
    
      <div class="flex items-center justify-between w-full">
        <div class="space-y-1">
          <div class="gap-1 inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" class="h-7 px-2">
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
                <Button variant="outline" class="h-7 px-2">
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

      <!-- <Select default-value="tile">
        <SelectTrigger class="ml-auto w-[110px]">
          <SelectValue placeholder="Select views" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>View</SelectLabel>
          <SelectItem value="tile">
            Tile
          </SelectItem>
          <SelectItem value="list">
            List
          </SelectItem>
        </SelectContent>
      </Select>
      <Select default-value="name">
        <SelectTrigger class="ml-auto w-[110px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="name">
            Name
          </SelectItem>
          <SelectItem value="size">
            Size
          </SelectItem>
          <SelectItem value="type">
            Type
          </SelectItem>
          <SelectItem value="date">
            Date
          </SelectItem>
        </SelectContent>
      </Select> -->
          </div> 
        </div>
        <!-- <h2 class="text-2xl font-semibold tracking-tight">All files</h2> -->
        <Button>
          <RadixIconsUpload class="mr-2 h-4 w-4" />
          Upload file
        </Button>
      </div>
      <!-- <div class="flex items-center justify-between"><div class="space-y-1"><h2 class="text-2xl font-semibold tracking-tight"> Listen Now </h2><p class="text-sm text-muted-foreground"> Top picks for you. Updated daily. </p></div></div> -->


                  <!-- </div> -->
    <!-- <div class="flex gap-2">
      <Select default-value="tile">
        <SelectTrigger class="ml-auto w-[110px]">
          <SelectValue placeholder="Select views" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>View</SelectLabel>
          <SelectItem value="tile">
            Tile
          </SelectItem>
          <SelectItem value="list">
            List
          </SelectItem>
        </SelectContent>
      </Select>
      <Select default-value="name">
        <SelectTrigger class="ml-auto w-[110px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="name">
            Name
          </SelectItem>
          <SelectItem value="size">
            Size
          </SelectItem>
          <SelectItem value="type">
            Type
          </SelectItem>
          <SelectItem value="date">
            Date
          </SelectItem>
        </SelectContent>
      </Select>
    </div> -->
    <!-- <div class="ml-auto">
      <Button>
        <RadixIconsUpload class="mr-2 h-4 w-4" />
        Upload file
      </Button>
    </div> -->
  </div>

  <Separator class="my-4" />
    <div class="relative flex gap-4">
      <!-- DESKTOP -->
      <div :class="cn('space-y-3 relative', $attrs.class ?? '')">
        <div class="overflow-hidden flex items-center justify-center rounded-md w-[150px] h-[150px] bg-accent">
          <Music :size="75"  color="#a1a1aa" />
        </div>

        <div class="space-y-1 text-sm w-[150px] ">
          <h3 class="font-medium leading-none text-ellipsis overflow-hidden">
            IMG_2322.MOV as,dnasdas asdas
          </h3>
        </div>
      </div>

      <div :class="cn('space-y-3', $attrs.class ?? '')">
        <div class="overflow-hidden rounded-md w-[150px]">
          <img
            src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80"
            :alt="'album.name'"
            :width="145"
            :height="150"
            :class="cn('h-auto w-auto object-cover transition-all aspect-square')"
          >
        </div>

        <div class="space-y-1 text-sm">
          <h3 class="font-medium leading-none">
          SOME name
          </h3>
        </div>
      </div>


    <!-- MOBILE -->
    <div class="md:hidden mt-0">
      <div class="flex gap-2">
        <RadixIconsPlus />
        <Drawer>
          <DrawerTrigger>
            <RadixIconsDotsVertical />
          </DrawerTrigger>
          <DrawerContent>
            <FormField v-slot="{ componentField }" type="radio" name="type">
              <FormItem class="space-y-3 p-6">
                <FormLabel>Sort by</FormLabel>
                <RadioGroup default-value="comfortable">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r1" value="name" />
                    <Label for="r1">List</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r2" value="size" />
                    <Label for="r2">Tile</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r3" value="type" />
                    <Label for="r3">Large Tile</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" type="radio" name="type">
              <FormItem class="space-y-3 p-6">
                <FormLabel>Sort by</FormLabel>
                <RadioGroup default-value="comfortable">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r1" value="name" />
                    <Label for="r1">Name</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r2" value="size" />
                    <Label for="r2">Size</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r3" value="type" />
                    <Label for="r3">Type</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r4" value="date" />
                    <Label for="r4">Date</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            </FormField>
            <!-- <DrawerHeader>
                      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                      <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose>
                        <Button variant="outline">
                          Cancel
                        </Button>
                      </DrawerClose>
                    </DrawerFooter> -->
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


// import { ref } from 'vue'
// import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const viewBy = ref('tile')
const sortBy = ref('name')

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Separator } from '@/components/ui/separator'
import { AudioLines } from 'lucide-vue-next';
import { Music } from 'lucide-vue-next';



import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'




import RadixIconsHamburgerMenu from '~icons/radix-icons/hamburger-menu'
import RadixIconsUpload from '~icons/radix-icons/upload'
import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
import RadixIconsMoon from '~icons/radix-icons/moon'
import RadixIconsSun from '~icons/radix-icons/sun'
import RadixIconsDotsVertical from '~icons/radix-icons/dots-vertical';
import RadixIconsPlus from '~icons/radix-icons/plus';
import { ref } from 'vue';
</script>