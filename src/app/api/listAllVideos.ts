import getAllVideos from "../api/request/video/getAll"
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.get(async (req, res) => {
    const allVideos = await getAllVideos();
    res.status(200).json(allVideos);
});

export default apiRoute;