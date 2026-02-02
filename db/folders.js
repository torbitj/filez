import db from './client.js'

export const createFolder = async (name) => {
  const sql = `
      INSERT INTO folders (name)
      VALUES ($1)
      RETURNING *
    `;
  const { rows: [folder] } = await db.query(sql, [name]);
  return folder;
}

export const getAllFolders = async () => {
  const sql = `
    SELECT * FROM folders
  `

  const { rows: folders } = await db.query(sql)
  console.log(folders)
  return folders
}