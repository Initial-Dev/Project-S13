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
})

const apiRoute = nc<NextApiRequest, NextApiResponse>()

apiRoute.use(upload.single('video'))

apiRoute.post((req: NextApiRequest & Request, res: NextApiResponse & Response) => {
  // Le fichier est disponible dans req.file
  res.status(200).json({ success: true, file : req.file?.size, message: 'Fichier envoyé' })
})

export default apiRoute