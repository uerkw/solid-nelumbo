import { json } from "@solidjs/router";
import { APIEvent, APIHandler } from "@solidjs/start/server";
import { listFilesR2} from "~/lib/r2/get-file";



export const GET: APIHandler = async ({ params, request }: APIEvent) => {
    console.log("GET on List Files.")
    console.log()
    const getData = listFilesR2();
    return json(getData)
}