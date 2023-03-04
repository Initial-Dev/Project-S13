import { NextApiRequest, NextApiResponse } from 'next'
import express, { Request, Response } from 'express'
import nc from 'next-connect'
import aws from 'aws-sdk'
import multer, { FileFilterCallback } from 'multer'
import mp4ToHls from "./toolbox/mp4ToHls"

export const config = {
    api: {
      bodyParser: false
    }
  }

  const sizeLimit = 300; // 300 Mo

  // Configuration de AWS
  const s3 = new aws.S3({
    accessKeyId: 'AKIAR4WLWUN5N3PLOQ5Z',
    secretAccessKey: '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',
    region: 'eu-west-3',
  });

  const params = {
    Bucket: 'kamegroundbucket',
    Key: 'test.mp4', // <=== Need to be changed
  };

// Configuration de Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: './pages/api/tmp/',
    filename: (req, file, callback) => {
      callback(null, file.originalname)
    },
  }),
  fileFilter: (req, file, callback: FileFilterCallback) => {
    if (!file.originalname.match(/\.(mp4)$/)) {
      return callback(new Error('Seules les MP4 sont autorisées'))
    }
    callback(null, true)
  },
  limits: { fileSize: sizeLimit * 1024 * 1024 },
})

const apiRoute = nc<NextApiRequest, NextApiResponse>()

apiRoute.post((req: NextApiRequest & Request, res: NextApiResponse & Response) => {
  upload.single('video')(req, res, (err) => {
    const filename = req.file?.originalname
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'La taille du fichier est trop grande' })
        }
      }
      return res.status(400).json({ message: 'Une erreur s\'est produite lors de l\'upload du fichier' })
    }
    // Le fichier est disponible dans req.file
    res.status(200).json({ message: "Upload Done!", file: req.file })
    if(filename)
      mp4ToHls(filename.toString())

    // Upload to Amazon S3
    // Need to put a await here
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Success:', data);
      }
    });
  })
  
})

export default apiRoute