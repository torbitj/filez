import app from "#app";
import db from "#db/client";
import { getAllFiles } from "#db/files";

const PORT = process.env.PORT ?? 3000;

await db.connect();

app.get('/files', async(req, res, next) => {
  res.send(await getAllFiles());
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
