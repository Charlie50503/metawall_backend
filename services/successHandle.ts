import express from "express";
const successHandle = (req: express.Request | Express.Request, res: express.Response, data: any): void => {
  res.status(200).json({
    status: "success",
    data,
  });
  res.end();
};

export { successHandle };
