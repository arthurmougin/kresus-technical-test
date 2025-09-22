<script setup lang="ts" generic="TData, TValue">
import { ref } from 'vue'
import {
  ColumnDef,
  SortingState,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  getPaginationRowModel,
} from '@tanstack/vue-table'
import { valueUpdater } from '../../lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useTodoStore } from '../../store/todo.store'
import { Todo } from '../../definitions'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize: number
}>()
const pageSize = ref<number>(props.pageSize)
const hadMorePagesToLoad = ref<Boolean>(true)
const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() { return sorting.value },
  },
})

const emit = defineEmits<{
  (e: "additions", additions: Todo[]): void
}>()

function setPageSize(size: number) {
  table.setPageSize(size)
  pageSize.value = size
}
setPageSize(pageSize.value)

async function getNextPages() {
  //if there is enough local data to load
  if (table.getCanNextPage()) {
    table.nextPage()
    return;
  }

  try {
    const additions = await useTodoStore().fetchNextTodos(pageSize.value)
    if (additions.length > 0) {
      emit("additions", additions);
    }
    else {
      hadMorePagesToLoad.value = false;
    }
  }
  catch (e) {
    console.error(e);
    hadMorePagesToLoad.value = false;
  }

}


</script>

<template>
  <div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-between py-4">
      <div class="flex flex-col items-center justify-end space-y-2">
        <p>Quantité :</p>
        <RadioGroup default-value={{pageSize}}>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r1" value="5" @click="setPageSize(5)" />
            <Label for="r1">5</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r2" value="10" @click="setPageSize(10)" />
            <Label for="r2">10</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="r3" value="20" @click="setPageSize(20)" />
            <Label for="r3">20</Label>
          </div>
        </RadioGroup>
      </div>

      <div class="flex items-center justify-end space-x-2"></div>
      <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
        Précédent
      </Button>
      <Button variant="outline" size="sm" :disabled="!table.getCanNextPage() && !hadMorePagesToLoad"
        @click="getNextPages()">
        Suivant
      </Button>
    </div>
  </div>
</template>