import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "movies",
      columns: [
        { name: "uuid", type: "string" },
        { name: "name", type: "string" },
        { name: "length", type: "number", isOptional: true },
        { name: "rating", type: "number", isOptional: true },
        { name: "year", type: "number", isOptional: true },
        { name: "genres", type: "string", isOptional: true },
        { name: "director", type: "string", isOptional: true },
        { name: "description", type: "string", isOptional: true },
        { name: "picker", type: "string" },
        { name: "watched", type: "boolean" },
      ],
    }),
  ],
});
