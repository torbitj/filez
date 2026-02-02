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

export const getFolder = async (id) => {
  const sql = `
    SELECT folders.*, json_agg(files) AS files FROM folders
    LEFT JOIN files ON files.folder_id = folders.id
    WHERE folders.id = $1
    GROUP BY folders.id
  `;

  const { rows: [folder] } = await db.query(sql, [id]);
  return folder
} 