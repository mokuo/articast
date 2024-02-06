import { promises as fs } from "fs";
import path from "path";
import { URL } from "url";

import axios from "axios";
import nock from "nock";

axios.defaults.adapter = "http";

export const mockHttpRequest = async (url: string, responseContentPath: string) => {
  const parsedUrl = new URL(url);

  const content = await fs.readFile(path.resolve(responseContentPath), "utf-8");
  nock(parsedUrl.origin).get(parsedUrl.pathname).reply(200, content);
};
