import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  axios.get("http://back:5000").then(
    response => res.status(200).send({message: response.data})
  ).catch(
    err => res.status(400).send({err: err.message})
  )
}

export default handler
