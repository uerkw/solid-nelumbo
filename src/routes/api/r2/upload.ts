import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIEvent, APIHandler } from "@solidjs/start/server/types";
import chalk from "chalk";
import { r2 } from "~/lib/r2/r2";
import { json } from "@solidjs/router";
import { v4 as uuidv4 } from "uuid"

export async function POST({ params, request }: APIEvent) {
  try {
    console.log(request);
    console.log(chalk.yellow`Generating an upload URL!`);
    // const body = await request.json();
    // console.log(body);
    // const filename = body.filename;

    // if (!filename) {
      // throw new Error('Filename is required in the request body');
    // }

    const filename = `${uuidv4()}.png`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filename,
    });

    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

    console.log(chalk.green(`Success generating upload URL!`));

    return json({ url: signedUrl});
  } catch (err) {
    console.log("error");
  }
}
