import { cache, createAsync, useSearchParams } from "@solidjs/router";
import { Accessor, Suspense } from "solid-js";
import { createSignal, createResource } from "solid-js";
import { render } from "solid-js/web";
import { listFilesR2 } from "~/lib/r2/get-file";

type TFile = { id: string; fileName: string };

const getFiles = cache(async () => {
  "use server";
  return listFilesR2();
}, "cache_files");

export const route = {
  load: () => getFiles(),
};

export default function Page() {
  const files = createAsync(() => getFiles());

  const [params, setParams] = useSearchParams();
  const [fileId, setFileId] = createSignal();

  return (
    <div>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric ID"
        onInput={(e) => setFileId(e.currentTarget.value)}
      />
      <div class="flex bg-red-500">
        <div class="flex-row">
          <div class="flex-col col-span-4">Title:</div>
          <div class="flex-col col-span-8">Test</div>
        </div>
      </div>
    </div>
  );
}
