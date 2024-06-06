import Counter from "~/components/Counter";
import {
  RouteDefinition,
  action,
  cache,
  createAsyncStore,
  json,
} from "@solidjs/router";
import { db } from "~/lib/drizzle/db";
import { SelectContentFile, contentFile } from "~/lib/drizzle/schema";
import { eq, ne } from "drizzle-orm";
import { For } from "solid-js";
import { Trash2Icon } from "lucide-solid";
// import "./index.css";

// get all files from the database
const getContentFiles = cache(async () => {
  "use server";
  return (
    ((await db
      .select()
      .from(contentFile)
      .where(eq(contentFile.isMarkedDeleted, false))) as SelectContentFile[]) ||
    []
  );
}, "notes");

// create a new file
const createContentFileAction = action(async (formData: FormData) => {
  "use server";

  /// Insert a new note into the database
  await db.insert(contentFile).values({
    title: formData.get("note") as string,
    filehash: formData.get("filehash") as string,
  });

  return json({
    msg: "Content file created",
  });
});

// delete a file
const deleteNoteAction = action(async (formData: FormData) => {
  "use server";
  const id = formData.get("id") as string;
  console.log(id);

  /// Delete a file just from the database
  await db
    .update(contentFile)
    .set({ isMarkedDeleted: true })
    .where(eq(contentFile.id, id));

  return json({
    msg: "Note deleted",
  });
});

export const route = {
  load: () => getContentFiles(),
} satisfies RouteDefinition;

export default function Home() {
  const contentFile = createAsyncStore<SelectContentFile[]>(
    () => getContentFiles(),
    {
      initialValue: [],
    }
  );

  return (
    <main>
      <h1 class="text-lg">Hello world!</h1>
      <Counter />
      <form
        action={createContentFileAction}
        method="post"
        class="flex flex-col gap-2 max-w-3xl mx-auto items-start"
      >
        <label for="input">Name</label>
        <input placeholder="Type something here" name="note" />
        <button type="submit">Add Note</button>
      </form>

      <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto pt-12">
        <For each={contentFile()}>
          {(note) => (
            <div class="root">
              <div class="header">
                <div class="card-title">{note.title}</div>
                <div class="card-description">
                  <form action={deleteNoteAction} method="post">
                    <input type="hidden" name="id" value={note.id} />
                    <button type="submit">
                      <Trash2Icon class="text-red-500 cursor-pointer" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}
