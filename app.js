import express from "express";
const app = express();
export default app;

import { getAllFiles } from "#db/files";

app.get('/files', async(req, res, next) => {
  res.send(await getAllFiles());
})

import foldersRouter from "#api/folders";

app.use('/folders', foldersRouter);
