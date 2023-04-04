import getSingleVidByUuid from "../api/request/video/getSingleVidByUuid";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const apiRoute = nc<NextApiRequest, NextApiResponse>();

apiRoute.get(async (req, res) => {
    const vid = await getSingleVidByUuid(req.query.uuid as string);
    res.status(200).json(vid);
});

export default apiRoute;