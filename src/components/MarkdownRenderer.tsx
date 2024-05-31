import {compile} from '@mdx-js/mdx'
import {run } from '@mdx-js/mdx'

async function CompileMarkdown(md: string){

  const code = String(await compile(md, {
    outputFormat: 'function-body',
   }))
}

export default function DocPage() {

 
  const md = `
# Getting Started

Here is an example of some Markdown
 
 `;


  const code = new Promise((resolve, reject) => {
    CompileMarkdown(md)
      .then(result => resolve(result))
      .catch(error => reject(error));
  });

  //   const renderedMarkdoc = render(content);
  console.log("Rendering Markdoc");
  return (
    <div class="container bg-blue-500">
        Markdoc goes here
    </div>
  )
  //   return (
  //     <div class="content-center align-middle items-center container">
  //       <div class="text-white bg-slate-600 min-w-[300px] w-[400px]">
  //         <h1 class="text-white text-center">Documentation:</h1>
  //         {renderedMarkdoc}
  //       </div>
  //     </div>
  //   );
}
