import db from "#db/client";
import { createFile } from "./files.js";
import { createFolder } from "./folders.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let folderCount = 1; folderCount <= 3; folderCount++) {
    const newFolder = await createFolder(`folder${folderCount}`);
    console.log("FOLDER: ", newFolder);
    for (let fileCount = 1; fileCount <= 7; fileCount++) {
      const newFile = await createFile(`file${fileCount}`, newFolder.id)
      console.log("FILE: ", newFile);
    }
  }
}
