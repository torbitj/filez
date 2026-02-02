import express from 'express'
const foldersRouter = express.Router()
export default foldersRouter;


import { getAllFolders } from '#db/folders';

foldersRouter.get('/', async (req, res, next) => {
  const folders = await getAllFolders();
  res.send(folders);
})