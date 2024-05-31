export interface GetFileR2Props{
    id: string
    fileName: string
}

export function getFileR2(params: GetFileR2Props){
    "use server"
    console.log("Ran on server only!")
    const R2_API_ROUTE = import.meta.env.R2_API_ROUTE
    const R2_API_KEY = import.meta.env.R2_API_KEY

    const returnObj  = { id: params.id, fileName: params.fileName, R2_ROUTE:R2_API_ROUTE } 
    console.log(`R2 Route was ${R2_API_ROUTE}. R2 Key was: ${R2_API_KEY}`)

    return(returnObj)
}

export function listFilesR2(){
    "use server"
    console.log("Ran on server!")
    const R2_API_ROUTE = import.meta.env.R2_API_ROUTE
    const R2_API_KEY = import.meta.env.R2_API_KEY
    const returnObj  = [{first: "first", second: "second"}, {first: "first-2", second: "second-2"}] 

    console.log(`R2 Route was ${R2_API_ROUTE}. R2 Key was: ${R2_API_KEY}`)
    return returnObj
}