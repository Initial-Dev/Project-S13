import { NextApiRequest, NextApiResponse } from 'next'
import express, { Request, Response } from 'express'
import nc from 'next-connect'
import multer, { FileFilterCallback } from 'multer'
import mp4ToHls from "./toolbox/mp4ToHls"



export const config = {
    api: {
      bodyParser: false
    }
  }

  const sizeLimit = 300; // 300 Mo

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
  })
})

export default apiRoute