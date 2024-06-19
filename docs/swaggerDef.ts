import { name, version } from '../package.json';

const formatName = name.split("-").map(word => {
    if (word == "be") return word.toUpperCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(" ");

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `${formatName} API documentation`,
    version,
    license: {
      name: 'MIT',
    }
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT}`
    }
  ]
};

export default swaggerDef;
