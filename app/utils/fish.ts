import http from "https";
import urlSplit from "./urlSplit";

interface Fish {
  catch: Function;
  withWorm: Function;
  allowFishing: Function;
}

interface FishGetOption {
  headers?: {
    accept: "application/json";
    authorization: string;
  };
}

interface FishPostOption {
  headers?: {
    accept: "application/json";
    "content-type": "application/json";
    authorization: string;
  };
  body: string;
}

type Method = "POST" | "GET";

async function prepareRod(
  method: Method,
  url: string,
  options: FishGetOption | FishPostOption,
) {
  const { hostname, port, path } = urlSplit(url);

  const HTTPOption = {
    method,
    hostname,
    port,
    path,
    headers: options.headers,
  };

  console.log(HTTPOption);

  return new Promise((resolve, reject) => {
    const req = http.request(HTTPOption, function (res) {
      const chunks: Buffer[] = [];

      res.on("data", function (chunk: Buffer) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        const response = JSON.parse(body.toString());
        const keys = Object.keys(response);

        if (keys.includes("error") || keys.includes("errors")) reject(response);
        else resolve(response);
      });

      res.on("error", function (e) {
        reject(e);
      });
    });

    if (method === "POST") {
      const postOption = options as FishPostOption;

      if (postOption.body) {
        req.write(postOption.body);
      }
    }
    req.end();
  });
}

const fish: Fish = {
  allowFishing(secret: string) {
    return {
      authorization: secret,
      ...this,
    };
  },

  async catch(url: string, options: FishGetOption = {}) {
    const method = "GET";

    if (this.authorization) {
      if (options.headers) options.headers.authorization = this.authorization;
      else
        options.headers = {
          accept: "application/json",
          authorization: this.authorization,
        };
    }

    return await prepareRod(method, url, options);
  },

  async withWorm(url: string, options: FishPostOption = { body: "" }) {
    const method = "POST";

    if (this.authorization) {
      if (options.headers) options.headers.authorization = this.authorization;
      else
        options.headers = {
          accept: "application/json",
          "content-type": "application/json",
          authorization: this.authorization,
        };
    }

    return await prepareRod(method, url, options);
  },
};

export default fish;
