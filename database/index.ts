import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import migrations from "./config/migrations";
import schema from "./config/schema";
import Movie from "./models/Movie";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "movieNight",
  jsi: true,
});

export const database = new Database({
  adapter,
  modelClasses: [Movie],
});
