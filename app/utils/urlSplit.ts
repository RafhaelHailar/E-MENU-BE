const ALLOWED_SUFFIXES = ["com", "net", "org"];

type Suffix = (typeof ALLOWED_SUFFIXES)[number];

interface URLPart {
  protocol: string | null;
  hostname: string;
  port: number | null;
  path: string | null;
}

function split(url: string): URLPart {
  // remove queries
  let init = url.slice(0, url.indexOf("?"));

  // split by protocol (e.g [http] :// [www.example.com])
  let data = init.split("://");
  let protocol: string | null = null;

  // if no protocol next data will be the current string.
  if (data.length === 1) data = ["", data[0]];
  else protocol = data[0];

  // look for suffix
  let suffix: string;

  for (let i = 0; i < ALLOWED_SUFFIXES.length; i++) {
    const current = ALLOWED_SUFFIXES[i];
    const exists = data[1].lastIndexOf("." + current);
    if (exists) {
      suffix = current;
      break;
    }
  }

  // no suffix found, return protocol and the rest as hostname.
  if (!suffix)
    return {
      protocol,
      hostname: data[1],
      port: null,
      path: null,
    };

  // split by extension (e.g [www.example] .com [:3000])
  data = data[1].split("." + suffix);
  const hostname = data[0] + "." + suffix;

  // check for port
  let port: number | null = null;
  let isPortExist: boolean = data[1].charAt(0) === ":";
  let path: string | null = null;

  if (isPortExist) {
    const otherPart = data[1].split("/");
    port = Number(otherPart.shift()?.slice(1));

    // if there are path (e.g www.exampe.com:3000 [/boom/jump])
    if (otherPart.length > 1) path = otherPart.join("/");
  } else path = data[1];

  return {
    protocol,
    hostname,
    port,
    path,
  };
}

export default split;
