import { Genre, Person } from "@/interfaces/movie";
import { Model } from "@nozbe/watermelondb";
import { field, json } from "@nozbe/watermelondb/decorators";

export default class Movie extends Model {
  static table = "movies";

  static associations = {};

  @field("uuid") uuid!: string;
  @field("name") name!: string;
  @field("length") length!: number | null; // min
  @field("rating") rating!: number | null;
  @field("year") year!: number | null;

  @json("genres", (json) => json) genres!: Array<Genre> | null;
  @json("director", (json) => json) director!: Person | null;

  @field("description") description!: string | null;
  @field("picker") picker!: string;
  @field("watched") watched!: boolean;
}
