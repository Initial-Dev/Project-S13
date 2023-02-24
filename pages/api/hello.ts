// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mp4ToHls from "./toolbox/mp4ToHls";
import {Exception} from "@jest/types/build/Circus";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    mp4ToHls('test.mp4')
    res.status(200).json({etat: 'ok'});
  } catch (e) {
    res.status(200).json({ erreur: e });
  }

}
