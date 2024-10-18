import { promises as fs } from "fs";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";

export const readData = async (fileName) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, fileName);

  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return null;
  }
};


export const writeData = async (fileName, newData) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, fileName);
  

  try {
    await fs.writeFile(filePath, JSON.stringify(newData));
    console.log(`Data successfully written to ${fileName}`);
  } catch (err) {
    console.error(`Error writing to ${fileName}:`, err);
  }
};
