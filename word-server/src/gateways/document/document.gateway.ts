/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DocService } from 'src/services/doc/doc.service';


@WebSocketGateway({cors:true})
export class DocumentGateway {
  constructor(private _docService:DocService) {}
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  handleConnection(client:any , ...args: any[]) {
    console.log('client connected');
  }
  handleDisconnect(client:any ) {
    console.log('client disconnected');
  }
  @SubscribeMessage('getDoc')
  async handleGetDoc(client:any , payload: any) {

    const document=  await this._docService.findOrCreateDoc(payload);
    console.log(document);
    client.emit('recieveDoc',document);
  }
  @SubscribeMessage('send-change')
  handleSendChange(client:any , payload: any) {
  client.broadcast.emit('recieve-change',payload);
  }
  @SubscribeMessage('save-document')
  handleSaveDocument(client:any , payload: any) {
    this._docService.saveDoc(payload.docId,payload.data);
  }
}
