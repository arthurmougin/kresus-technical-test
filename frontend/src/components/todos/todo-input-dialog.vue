<script setup lang="ts">
import { ref } from "vue"
import { cn } from "../../lib/utils"
import {
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date"
import { Calendar as CalendarIcon } from "lucide-vue-next"
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


const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

const value = ref<DateValue>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Ajouter une tâche
      </Button>
    </DialogTrigger>
    <DialogContent>
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
          <Label for="contenu" class="text-right" required>
            Contenu*
          </Label>
          <Input id="contenu" class="col-span-3" required maxlength="256" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="contenu" class="text-right" required>
            Priorité*
          </Label>
          <Select>
            <SelectTrigger class="w-[280px]">
              <SelectValue placeholder="Choisir une priorité" />
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
          <Label for="contenu" class="text-right" required>
            Date limite
          </Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" :class="cn(
                'w-[280px] justify-start text-left font-normal',
                !value && 'text-muted-foreground',
              )">
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Choisir une date" }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0 bg-white">
              <Calendar v-model="value" initial-focus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Ajouter
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>