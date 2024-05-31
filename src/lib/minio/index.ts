import { S3Client } from '@aws-sdk/client-s3'

export const minio = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.MINIO_ROUTE}`,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.MINIO_SECRET_ACCESS_KEY || '',
    },
})