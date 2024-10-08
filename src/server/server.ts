import express, { Router } from "express";
import path from "path";
import fileUpload from "express-fileupload";

interface Options {
  port: number;
  // routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  // private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    // this.routes = routes;
    this.configure();
  }

  private configure() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(fileUpload()); // multipart/form-data
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    // this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get(/^\/(?!api).*/, (req, res) => {
      let rutePath;
      if (req.originalUrl.match("uploads"))
        rutePath = path.join(__dirname, "../../", req.originalUrl);
      else
        rutePath = path.join(
          __dirname + `../../../${this.publicPath}/index.html`
        );
      res.sendFile(rutePath);
    });
  }

  async start() {
    this.serverListener = this.app.listen(this.port, "0.0.0.0", () => {
      console.log(`Express: Server running on port ${this.port}`);
    });
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  public close() {
    this.serverListener?.close();
  }
}
