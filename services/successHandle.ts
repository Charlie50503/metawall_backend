import express from "express"
const successHandle = (req: express.Request, res: express.Response, data: {}): void => {
  res.status(200).json(
    {
      status: "success",
      data
    }
  )
  res.end()
}


export {
  successHandle
}