<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import { Button } from '@/components/ui/button'

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

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { Menu, Moon, Sun, Github } from 'lucide-vue-next';


// import RadixIconsHamburgerMenu from '~icons/radix-icons/hamburger-menu'
// import RadixIconsUpload from '~icons/radix-icons/upload'
// import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
// import RadixIconsMoon from '~icons/radix-icons/moon'
// import Sun from '~icons/radix-icons/sun'
// import RadixIconsDotsVertical from '~icons/radix-icons/dots-vertical';
// import RadixIconsPlus from '~icons/radix-icons/plus';

import { useMagicKeys, useToggle } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue';

const isDark = ref(false);
const theme = ref('dark');
const routes = []
const toggleDark = useToggle(isDark)

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/makcmakc/cloud-storage-frontend',
    icon: Github,
  },
]

// Whenever the theme value changes, update the document class list
watch(isDark, (dark) => {
  if (dark) document.documentElement.classList.add(`dark`)
  else document.documentElement.classList.remove(`dark`)
})

// Whenever the component is mounted, update the document class list
onMounted(() => {
  document.documentElement.classList.add(theme.value)
})



interface MailProps {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [15, 240, 255],
})

const isCollapsed = ref(props.defaultCollapsed)

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}

import { cn } from '@/lib/utils'
</script>

<template>

<header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
  <div class="px-6 flex h-14 items-center">

    <!-- {{  isCollapsed  }} -->

  <Sheet>
    <SheetTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="shrink-0 md:hidden mr-4"
      >
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">

      </nav>
      <div class="mt-auto">
        <Card>
          <CardHeader>
            <CardTitle>Storage size</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our
              support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" class="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </SheetContent>
  </Sheet>   

    <div class="mr-4 md:mr-1 hidden md:flex">
      <router-link to="/" class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Meme Inc
      </router-link>

      <!-- <nav class="flex items-center max-lg:space-x-4 space-x-6 text-sm font-medium">
        <a
          v-for="route in routes"
          :key="route.title"
          :href="route.href"
          :target="route.external ? '_target' : undefined"
          class="transition-colors hover:text-foreground/80 text-foreground/60"
          :class="{
            'font-semibold !text-foreground': $route.path === `${route.href}.html`,
            'hidden lg:block': route?.href?.includes('github'),
          }"
        >
          {{ route.title }}
        </a>
      </nav> -->
    </div>
    <!-- <MobileNav /> -->

    <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <!-- <div class="w-full flex-1 md:w-auto md:flex-none">
        <Button
          variant="outline"
          class="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
          @click="isOpen = true"
        >
          <span class="hidden lg:inline-flex">Search documentation...</span>
          <span class="inline-flex lg:hidden">Search...</span>
          <Kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span class="text-xs">⌘</span>K
          </Kbd>
        </Button>
      </div> -->

      <div></div>

      <nav class="flex items-center">
        <Button
          v-for="link in links"
          :key="link.name"
          as="a"
          class="w-9 h-9 md:flex hidden"
          :href="link.href" target="_blank"
          :variant="'ghost'"
          :size="'icon'"
        >
          <component :is="link.icon" class="w-5 h-5" />
        </Button>

        <ClientOnly>
          <Button
            class="w-9 h-9"
            aria-label="Toggle dark mode"
            :variant="'ghost'"
            :size="'icon'"
            @click="toggleDark()"
          >
            <component
              :is="isDark ? Sun : Moon"
              class="w-5 h-5 text-foreground"
            />
          </Button>
        </ClientOnly>
      </nav>
    </div>
  </div>
</header>


  <!-- <main class="grid lg:grid-cols-6 md:grid-cols-4 h-full"> -->
    <main class="h-full">
    <ResizablePanelGroup
      id="resize-panel-group-1"
      direction="horizontal"
      class="h-full w-full items-stretch"
    >
      <ResizablePanel
        with-handle
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        :collapsed-size="navCollapsedSize"
        collapsible
        :min-size="10"
        :max-size="12"
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        @expand="onExpand"
        @collapse="onCollapse"
      >

        <Sidebar />
      </ResizablePanel>
      <!-- <ResizableHandle id="resize-handle-3" with-handle /> -->
      <ResizableHandle :default-size="defaultLayout[1]" :min-size="30" />
        <ResizablePanel :default-size="5">
          <div class="h-full px-4 py-6 lg:px-4 flex-1	">
            <div class="h-full space-y-6 ">
              <RouterView></RouterView>
            </div>
          </div>
        </ResizablePanel>
    </ResizablePanelGroup>



    <!-- <div class="col-span-3 lg:col-span-3 lg:border-l md:border-l">
      <div class="h-full px-4 py-6 lg:px-4">
        <div class="h-full space-y-6">

          <RouterView></RouterView>

        </div>
      </div>
    </div> -->

  </main>
</template>
