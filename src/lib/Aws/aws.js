import { S3Client } from "@aws-sdk/client-s3";

import { AWS_ACCESS_KEY_ID_CUSTOM, AWS_SECRET_ACCESS_KEY_CUSTOM, S3_REGION } from '$env/static/private'


// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID_CUSTOM,
        secretAccessKey: AWS_SECRET_ACCESS_KEY_CUSTOM
    },
    region: S3_REGION
});

export { s3Client };