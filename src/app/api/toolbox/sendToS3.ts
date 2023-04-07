import aws from "aws-sdk";
import { readdir, readFile } from "fs-extra";

const path = require("path");

// Configuration de AWS
const s3 = new aws.S3({
  accessKeyId: "AKIAR4WLWUN5N3PLOQ5Z",
  secretAccessKey: "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",
  region: "eu-west-3",
});

async function uploadDirectoryToS3(
  directoryPath: string,
  s3BucketName: string,
  s3FolderName: string
) {
  const dirPath = path.resolve(directoryPath);
  const filesList = await readdir(dirPath, { withFileTypes: true });

  const uploadPromises = filesList.map(async (file: any) => {
    const filePath = path.join(dirPath, file.name);

    // Si c'est un dossier, on appelle la fonction récursivement
    if (file.isDirectory()) {
      await uploadDirectoryToS3(
        filePath,
        s3BucketName,
        `${s3FolderName}/${file.name}`
      );
    } else {
      const fileContent = await readFile(filePath);

      const s3Key = `${s3FolderName}/${file.name}`;

      const params = {
        Bucket: s3BucketName,
        Key: s3Key,
        Body: fileContent,
      };

      await s3.upload(params).promise();
    }
  });

  await Promise.all(uploadPromises);
}

export default uploadDirectoryToS3;
