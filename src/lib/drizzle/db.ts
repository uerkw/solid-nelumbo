import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { ContentFile } from "./ContentFile";

export const sqlite = new Database("db.sqlite");
export const db = drizzle(sqlite, { schema });

type Rows = {
  id: string;
  filehash: string;
  isMarkedDeleted: boolean;
  title: string;
}[];

export function fetchContentFiles(): ContentFile[] {
  "use server";
  const query = "SELECT * FROM content_file WHERE isMarkedDeleted = false";
  const rows: Rows = sqlite.prepare(query).all() as Rows;

  console.log(rows);
  // Parse rows into ContentFile instances

  //console.log("THIS IS THE RESULT \n" + JSON.stringify(result[1]));
  return rows;
}
