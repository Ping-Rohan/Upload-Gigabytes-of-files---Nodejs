const { pipeline, Writable } = require("stream");
const { pipeline: asyncPipe } = require("stream/promises");
const { createWriteStream } = require("fs");
const busboy = require("busboy");

class Routes {
  #io;
  constructor(io) {
    this.#io = io;
  }

  async post(request, response) {
    const headers = request.headers;
    const bb = busboy({ headers });
    bb.on("file", this.#onFile);
    request.pipe(bb);
    console.log("Successed");
  }

  async #onFile(name, file, info) {
    console.log(name);
    const { fileName } = info;
    const saveTo = `./${fileName}`;
    file.pipe(createWriteStream(saveTo));
  }
}

module.exports = Routes;
