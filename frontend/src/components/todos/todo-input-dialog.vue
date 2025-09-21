<script setup lang="ts">
import { ref } from "vue"
import {
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date"
import { Calendar as CalendarIcon } from "lucide-vue-next"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useTodoStore } from "../../store/todo.store"
import { Todo, TodoPriority } from "../../definitions.d"


const df = new DateFormatter("en-US", {
  dateStyle: "long",
})
const open = ref(false)
const dateValue = ref<DateValue>()

// Ajout de l'exposition de l'événement submit
const emit = defineEmits<{
  (e: "submit", todo: Todo): void
}>()

async function handleSubmit(event: SubmitEvent) {
  event.preventDefault()

  const priorityString = (document.querySelector("form select") as HTMLSelectElement).value

  const todo: Todo = {
    title: (document.getElementById("title") as HTMLInputElement).value,
    content: (document.getElementById("content") as HTMLInputElement).value,
    priority: TodoPriority[priorityString as keyof typeof TodoPriority],
  }
  if (dateValue.value) {
    //format dateValue to ISO string //2021-10-01T00:00:00.000Z
    todo.executionDate = dateValue.value.toString() + "T00:00:00.000Z"
  }

  try {
    await useTodoStore().addTodo(todo)
    //emit to parent a submit event
    emit("submit", todo);
  } catch (error) {
    console.error(error)
  }
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        Ajouter une tâche
      </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit="handleSubmit">
        <DialogHeader>
          <DialogTitle>Ajouter une tâche</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle tâche en remplissant le formulaire ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="title" class="text-right">
              Titre*
            </Label>
            <Input id="title" class="col-span-3" required maxlength="50" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="content" class="text-right" required>
              Contenu*
            </Label>
            <Input id="content" class="col-span-3" required maxlength="256" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="priorite" class="text-right" required>
              Priorité*
            </Label>
            <Select id="priorite" :required="true">
              <SelectTrigger class="w-[280px]">
                <SelectValue placeholder="Choisir une priorité" selectedLabel />
              </SelectTrigger>
              <SelectContent class="bg-white">
                <SelectGroup>
                  <SelectLabel>Priorité</SelectLabel>
                  <SelectItem class="text-red-500" value="HIGH">
                    Haute
                  </SelectItem>
                  <SelectItem class="text-yellow-500" value="MEDIUM">
                    Moyenne
                  </SelectItem>
                  <SelectItem class="text-green-500" value="LOW">
                    Basse
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="calendar" class="text-right" required>
              Date limite
            </Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(
                  'w-[280px] justify-start text-left font-normal',
                  !dateValue && 'text-muted-foreground',
                )">
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : "Choisir une date" }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0 bg-white">
                <Calendar id="calendar" v-model="dateValue" initial-focus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            Ajouter
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>