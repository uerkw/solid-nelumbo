import { cache, createAsyncStore } from "@solidjs/router";
import { For } from "solid-js";
import { ContentFile } from "~/lib/drizzle/ContentFile";
import { fetchContentFiles, sqlite } from "~/lib/drizzle/db";

// get all files from the database
const getContentFiles = cache(async () => {
  "use server";
  return fetchContentFiles();
}, "notes");

export default function Home() {
  //   const contentFile = createAsyncStore<ContentFile[]>(() => getContentFiles(), {
  //     initialValue: [],
  //   });
  const contentFile = createAsyncStore(getContentFiles);

  return (
    <main>
      <h1 class="text-lg">Hello world!</h1>

      <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto pt-12">
        <For each={contentFile()}>
          {(note) => (
            <div class="root">
              <div class="header">
                <div class="card-title">{note.title}</div>
                <div class="card-description"></div>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}
