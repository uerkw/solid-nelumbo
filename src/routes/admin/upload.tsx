import { Component, For, createSignal, Suspense, useTransition } from "solid-js";
import { createStore } from "solid-js/store";
import {
  UploadFile,
  createDropzone,
  createFileUploader,
  fileUploader,
} from "@solid-primitives/upload";
import chalk from "chalk";


export default function Page() {
  const [pending, start] = useTransition();
  
  return (
    <div class="content-center justify-center align-middle container">
      <div class="text-white bg-slate-600 min-h-48 min-w-96 w-96 h-48">
        <h1 class="text-white text-center"> Single Upload Field: </h1>
        <SingleFileUpload />
      </div>
      <div class="text-white bg-slate-700 min-h-48 min-w-96 w-96 h-48">
        <h1 class="text-white text-center"> Multiple Upload Field: </h1>
        <MultipleFileUpload />
      </div>
      <div class="text-white bg-slate-800 min-h-48 min-w-96 w-96 h-48">
        <h1 class="text-white text-center"> Dropzone Upload Field: </h1>
        <Dropzone />
      </div>
      <div class="text-white bg-slate-900 min-h-48 min-w-96 w-96 h-48">
        <h1 class="text-white text-center"> file:upload Directive Field: </h1>
        <FileUploaderDirective />
      </div>
    </div>
  );
}

interface IFileUpload {
  source: string;
  name: string;
  size: number;
  file: File;
}

const SingleFileUpload: Component = () => {
  const { files: filesAsync, selectFiles: selectFilesAsync } =
    createFileUploader();

  function createFileSignal({ source, name, size, file }: IFileUpload) {
    console.log("Did action");
  }

  const handleR2Upload = async (file: File, fileName: string) => {
    // Add optional filename
    const presignformData = new FormData();
    presignformData.append("fileName", fileName);
    // Add the file name to the headers for the server
    // const presignHeaders=  {
    //     'content-type': 'image/png',
    //   };

    // Send the file to the server
    const response = await fetch("/api/r2/upload", {
      method: "POST",
      // body: presignformData,
      // headers: presignHeaders,
    });
    // Await the return of the URL
    const { url } = await response.json();
    console.log(chalk.yellow(`Logging Presigned URL: ${url} //`));

    // // Generate a new formData to use with correct headers
    // const uploadFormData = new FormData()
    // uploadFormData.append('file', file);

    await fetch(url, {
      method: "PUT",
      body: file,
    });
  };

  const handleMinioUpload = async (file: File, fileName: string) => {
    const response = await fetch("/api/minio/upload", {
      method: "POST",
    });
    const { url } = await response.json();
    const newResponse = await fetch(url, {
      method: "PUT",
      body: file,
    });
  };

  return (
    <div class="flex flex-col">
      <div class="flex flex-row items-center content-center gap-x-4">
        <h5>Minio Upload: Async Callback</h5>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            selectFilesAsync(async ([{ source, name, size, file }]) => {
              // await doStuff(2);
              // TODO: Run the database mutation to the backend from here
              // TODO: Check authentication
              await handleMinioUpload(file, name);
              // TODO: Decouple upload logic to have a "Select" button to upload, and a "Upload" button to confirm uploading.
              // TODO: Do we need a webhook to check when uploading is done and navigate the user again?
              console.log({ source, name, size, file });
            });
          }}
        >
          Select
        </button>
        <For each={filesAsync()}>{(file) => <p>{file.name}</p>}</For>
      </div>

      <div class="flex flex-row items-center content-center gap-x-4">
        <h5>R2 Upload: Async Callback</h5>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            selectFilesAsync(async ([{ source, name, size, file }]) => {
              // await doStuff(2);
              // TODO: Run the database mutation to the backend from here
              // TODO: Check authentication
              await handleR2Upload(file, name);
              // TODO: Decouple upload logic to have a "Select" button to upload, and a "Upload" button to confirm uploading.
              // TODO: Do we need a webhook to check when uploading is done and navigate the user again?
              console.log({ source, name, size, file });
            });
          }}
        >
          Select
        </button>
        <For each={filesAsync()}>{(file) => <p>{file.name}</p>}</For>
      </div>
    </div>
  );
};

const MultipleFileUpload: Component = () => {
  const { files, selectFiles } = createFileUploader({
    multiple: true,
    accept: "image/*",
  });

  return (
    <div class="flex flex-col">
      <div class="flex flex-row items-center content-center gap-x-4">
        <h5 class="text-center">Select multiple files</h5>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            selectFiles((files) => files.forEach((file) => console.log(file)));
          }}
        >
          Select
        </button>
        <For each={files()}>{(item) => <p>{item.name}</p>}</For>
      </div>
    </div>
  );
};

const Dropzone: Component = () => {
  const { setRef: dropzoneRef, files: droppedFiles } = createDropzone({
    onDrop: async (files) => {
      await doStuff(2);
      files.forEach((f) => console.log(f));
    },
    onDragOver: (files) => console.log("over", files.length),
  });

  return (
    <div>
      <h5>
        Upload files using <strong>createDropzone</strong> with `div` and async
        callback
      </h5>
      <div
        ref={dropzoneRef}
        style={{ width: "100px", height: "100px", background: "red" }}
      >
        Dropzone
      </div>
      <For each={droppedFiles()}>{(file) => <p>{file.name}</p>}</For>
    </div>
  );
};

function doStuff(arg0: number) {
  console.log("Did action");
  // throw new Error("Function not implemented.");
}

const FileUploaderDirective: Component = () => {
  const [files, setFiles] = createSignal<UploadFile[]>([]);

  return (
    <div>
      <h5>
        Upload files using <strong>fileUploader directive</strong>
      </h5>
      <input
        type="file"
        multiple
        use:fileUploader={{
          userCallback: (fs) => fs.forEach((f) => console.log(f)),
          setFiles,
        }}
      />
      <For each={files()}>{(file) => <p>{file.name}</p>}</For>
    </div>
  );
};
