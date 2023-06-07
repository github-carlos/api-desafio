import { App } from "@application/app";

const server = new App(+process.env.port || 3000)

server.start()