import db from "./client.js";

export const createFile = async (name, folderId) => {
  const size = Math.floor(Math.random() * 301) + 1;
  const sql = `
        INSERT INTO files (name, size, folder_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
  const { rows: [file] } = await db.query(sql, [name, size, folderId]);
  return file;
}

export const getAllFiles = async () => {
  const sql = `
    SELECT files.*, folders.name AS "folder_name" FROM files
    JOIN folders ON folders.id = files.folder_id
  `;

  const { rows: files } = await db.query(sql)
  console.log(files)
  return files;
}