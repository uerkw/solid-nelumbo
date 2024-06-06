import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq, sql } from "drizzle-orm";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { ContentFile } from "./ContentFile";
import { type SelectContentFile } from "./schema";

export const sqlite = new Database("db.sqlite");
export const db = drizzle(sqlite, { schema });

export const prepared_load_content_file = db
  .select()
  .from(schema.contentFile)
  .where(eq(schema.contentFile.isMarkedDeleted, false))
  .prepare();

export const prepared_add_content_file = db
  .insert(schema.contentFile)
  .values({
    id: sql.placeholder("id"),
    title: sql.placeholder("title"),
    filehash: sql.placeholder("filehash"),
  })
  .prepare();

type Rows = {
  id: string;
  filehash: string;
  isMarkedDeleted: boolean;
  title: string;
}[];

//SQLite query version only
export function fetchContentFiles(): ContentFile[] {
  "use server";
  const query = "SELECT * FROM content_file WHERE isMarkedDeleted = false";
  const rows: Rows = sqlite.prepare(query).all() as Rows;

  // console.log(rows);
  // Parse rows into ContentFile instances

  //console.log("THIS IS THE RESULT \n" + JSON.stringify(result[1]));
  return rows;
}
