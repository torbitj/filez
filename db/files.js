import db from "./client.js";

export const createFile = async ({name, size, folderId}) => {
  let newSize = null;
  console.log("SIZE: ", size);
  size ? newSize = size : newSize = Math.floor(Math.random() * 301) + 1;
  console .log("NEW SIZE: ", newSize)
  const sql = `
        INSERT INTO files (name, size, folder_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
  const { rows: [file] } = await db.query(sql, [name, newSize, folderId]);
  return file;
}

export const getAllFiles = async () => {
  const sql = `
    SELECT files.*, folders.name AS "folder_name" FROM files
    JOIN folders ON folders.id = files.folder_id
  `;

  const { rows: files } = await db.query(sql)
  return files;
}