import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "../ui/button";
import { Todo, TodoPriority } from "../../definitions.d";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "text-right font-medium",
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
          class: "text-right font-medium",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Priorité", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      //color code
      const priority: TodoPriority = row.getValue("priority");

      //make it a switch

      let color = "text-gray-500"; // default color
      let text = "";
      switch (priority) {
        case TodoPriority.HIGH:
          color = "text-red-500";
          text = "Haute";
          break;
        case TodoPriority.MEDIUM:
          color = "text-yellow-500";
          text = "Moyenne";
          break;
        case TodoPriority.LOW:
          color = "text-green-500";
          text = "Basse";
          break;
      }

      return h("div", { class: `text-right ${color}` }, text);
    },
  },
  {
    accessorKey: "executionDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "text-right font-medium",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Date limite", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const formatedDate = row.getValue("executionDate")
        ? new Date(row.getValue("executionDate")).toLocaleDateString()
        : "";
      return h("div", { class: "text-right" }, formatedDate);
    },
  },
];
