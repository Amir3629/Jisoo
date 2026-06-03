const { createServer } = require("http");
const next = require("next");

const dev = false;
const port = Number(process.env.PORT || process.env.NODE_PORT || 25894);

const app = next({
  dev,
  dir: __dirname,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    return handle(req, res);
  }).listen(port, "0.0.0.0", () => {
    console.log(`> JISOO ready on http://0.0.0.0:${port}`);
  });
});
