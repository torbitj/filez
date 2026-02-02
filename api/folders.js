import express from 'express'
const foldersRouter = express.Router()
export default foldersRouter;

import { getAllFolders, getFolder } from '#db/folders';
import { createFile } from '#db/files';

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

foldersRouter.post('/:id/files', async (req, res, next) => {
  const folderId = Number(req.params.id);
  const foundFolder = await getFolder(folderId);
  if (!foundFolder) return res.status(404).send(`Cannot find folder with id ${folderId}`);
  if (!req.body) return res.status(400).send('Must include body in request');
  const { name, size } = req.body;
  if (!name || !size) return res.status(400).send('Must include name and size of file')
  const fileToAdd = { name, size, folderId };
  const newFile = await createFile(fileToAdd)
  res.status(201).send(newFile);
})