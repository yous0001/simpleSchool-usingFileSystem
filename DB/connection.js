import { promises as fs } from "fs";
import path from "path";


export const readData = async (fileName) => {
  const filePath = path.join(process.cwd(), fileName);
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return null;
  }
};


export const writeData = async (fileName, newData) => {
  const filePath = path.join(process.cwd(), fileName);
  try {
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
    console.log(`Data successfully written to ${fileName}`);
  } catch (err) {
    console.error(`Error writing to ${fileName}:`, err);
  }
};
