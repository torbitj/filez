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