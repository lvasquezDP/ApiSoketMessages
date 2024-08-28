import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import url from "url";
import { UserModel } from "../../data";

interface Options {
  server: Server;
  path?: string;
}
interface CustomWebSocket extends WebSocket {
  id?: string;
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  constructor(op: Options) {
    const { server, path = "/ws" } = op;
    this.wss = new WebSocketServer({ server, path });
  }

  static get instance(): WssService {
    if (!WssService._instance) throw "WssService is not initialized";
    return WssService._instance;
  }

  static initWss(op: Options) {
    WssService._instance = new WssService(op);
  }

  public start() {
    this.wss.on("connection", (ws: CustomWebSocket, req: Request) => {
      const query = url.parse(req.url, true).query;
      ws.id = query.id?.toString();
      console.log("client connect:", query.id);
      this.usersConected();
      ws.onclose = (ws) => {
        console.log("client closed:", query.id);
        this.usersConected()
      };
    });
  }

  public sendMessage(type: string, payload: Object,id:string) {
    this.wss.clients.forEach((ws: CustomWebSocket) => {
      if (ws.readyState == WebSocket.OPEN&&ws.id==id)
        ws.send(JSON.stringify({ type, payload }));
    });
  }
  // private usersConected() {
  //   const ids: any[] = [];
  //   this.wss.clients.forEach((ws: CustomWebSocket) => {
  //     if (ws.readyState == WebSocket.OPEN) ids.push(ws.id);
  //   });

  //   this.wss.clients.forEach((ws: CustomWebSocket) => {
  //     if (ws.readyState == WebSocket.OPEN)
  //       ws.send(
  //         JSON.stringify({ type: "users-Conected", payload: { users: ids.filter((x)=>x!=ws.id) } })
  //       );
  //   });
  // }

  private async usersConected() {
    const ids = await Promise.all(
      Array.from(this.wss.clients).map(async (ws: CustomWebSocket) => {
        if (ws.readyState == WebSocket.OPEN)
          return await UserModel.findOne({ _id: ws.id }).populate(['avatar','img']);
        return null;
      })
    );

    const filteredIds = ids.filter(user => user !== null);
  
    this.wss.clients.forEach((ws: CustomWebSocket) => {
      if (ws.readyState == WebSocket.OPEN) {
        ws.send(
          JSON.stringify({ type: "users-conected", payload: { users: filteredIds.filter(x=>x.id!=ws.id) } })
        );
      }
    });
  }
  
}
