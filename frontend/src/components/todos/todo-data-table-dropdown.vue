<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

import type { Todo } from "../../store/todo.store";
defineProps<{
  todo: Todo
}>()

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Ouvrir menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-white">
      <DropdownMenuItem>Valider</DropdownMenuItem>
      <DropdownMenuItem>Supprimer</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>