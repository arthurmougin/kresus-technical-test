import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { Todo } from "../../store/todo.store";
import todoDataTableDropdown from "./todo-data-table-dropdown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "../ui/button";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Titre", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "text-right" }, row.getValue("title")),
  },
  {
    accessorKey: "content",
    header: () => h("div", { class: "text-center font-medium" }, "Contenu"),
    cell: ({ row }) =>
      h("div", { class: "text-right" }, row.getValue("content")),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Priorité", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      //color code
      const priority: string = row.getValue("priority");

      //make it a switch

      let color = "text-gray-500"; // default color
      switch (priority) {
        case "HIGH":
          color = "text-red-500";
          break;
        case "MEDIUM":
          color = "text-yellow-500";
          break;
        case "LOW":
          color = "text-green-500";
          break;
      }

      return h("div", { class: `text-right ${color}` }, priority);
    },
  },
  {
    accessorKey: "executionDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Date d'exécution", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const formatedDate = new Date(
        row.getValue("executionDate")
      ).toLocaleDateString();
      return h("div", { class: "text-right" }, formatedDate);
    },
  },
  /*{
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original;

      return h(
        "div",
        { class: "relative" },
        h(todoDataTableDropdown, {
          todo,
        })
      );
    },
  },*/
];
