import express from 'express'
const foldersRouter = express.Router()
export default foldersRouter;

import { getAllFolders, getFolder } from '#db/folders';

foldersRouter.use(express.json())

foldersRouter.get('/', async (req, res, next) => {
  const folders = await getAllFolders();
  res.send(folders);
})

foldersRouter.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const folderAndFiles = await getFolder(id);
  if (!folderAndFiles) return res.status(404).send(`Cannot find folder with id ${id}`)
  res.send(folderAndFiles);
})