import { promises as fs } from "fs";
import path from "path";

export const readLocalFile = async (filePath: string): Promise<string> => {
  return await fs.readFile(path.resolve(filePath), "utf-8");
};
