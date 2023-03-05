import nextConnect from 'next-connect';
import models from "../../../db/index";


const DB: any = models;
const { games } = DB;

const fetchData = async (url: any, option: any) => {
  const myFetch = await fetch(url, option)
  const restJson = await myFetch.json()

  return restJson
}

const handler = nextConnect()
  // Get method
  .get(async (req: any, res: any) => {
    const {
      query: { nextPage },
    } = req;

    const gameList = await games.findAndCountAll({
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['id', 'DESC'],
      ],
      offset: nextPage ? +nextPage : 0,
      limit: 50,
    });

    res.json({
      status: 'success',
      gameList,
    });
  }).post(async (req: any, res: any) => {

    const {
      query: { nextPage, offset, limit, token },
    } = req;

    console.log('object :>> ', offset, limit, token);

    const listGame = await fetchData(`${process.env.IGDB_URL}/v4/games/`, {
      "method": "POST",
      "headers": {
        "client-id": process.env.CLIENT_ID,
        "authorization": `Bearer ${token}`,
        "cache-control": "no-cache"
      },
      "body": `fields name,category,checksum,rating; offset ${offset}; limit ${limit};`
    })

    const newUser = await games.bulkCreate(listGame);

    res.json({
      status: 'success',
      gameCreated: newUser,

    });
  }); 

export default handler;
