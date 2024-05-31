import { getFileR2, GetFileR2Props } from "~/lib/r2/get-file";
import { createAsync, type RouteSectionProps, type RouteDefinition, json, useSearchParams } from "@solidjs/router";
import type { APIEvent, APIHandler } from "@solidjs/start/server";


export const GET: APIHandler = async ({ params, request }: APIEvent) => {
  const URLObj = new URL(request.url);
  const mySearchParams = URLObj.searchParams
  
  //TODO: Valibot/Zod validation here
  
  // Log our values, for testing
  console.log(`Requested for ID: ${params.id}`)
  for (const [key, value] of mySearchParams.entries()) {
    console.log(`URL Parameter of "${key}" requested with value: "${value}". `)
  }

  // Format the query out to the LIB implementation of the API
  const libReqParams : GetFileR2Props = {
    id: params.id,
    fileName : mySearchParams.get("filename")!
  }
  const r2Target = getFileR2(libReqParams)
  return json(r2Target);
}

//  export default function EditFile( { params }: RouteSectionProps) {
  

//   // console.log({...params})
//   //const routeParams = useParams();
//   const routeParams = {
//     id: 400,
//   };
//   console.log(
//     `GET requested for File: ${routeParams.id} by User ${params.user}`
//   );
//   const returnObj = {
//     routeParamId: routeParams.id,
//     paramUser: params.user,
//   };

//   return json(returnObj);
// }
