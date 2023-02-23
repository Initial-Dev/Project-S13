import { NextApiRequest, NextApiResponse } from 'next'
import express, { Request, Response } from 'express';
import nc from 'next-connect'
import multer, { FileFilterCallback } from 'multer'

export const config = {
    api: {
      bodyParser: false
    }
  }
  
// Configuration de Multer
const upload = multer({
  storage: multer.diskStorage({
    destination: './temp/videos',
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
  limits: { fileSize: 300 * 1024 * 1024 }, // 300 Mo
})

const apiRoute = nc<NextApiRequest, NextApiResponse>()

apiRoute.post((req: NextApiRequest & Request, res: NextApiResponse & Response) => {
  upload.single('video')(req, res, (err) => {
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
  })
})

export default apiRoute