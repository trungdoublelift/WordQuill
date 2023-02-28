import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { Socket } from 'ngx-socket-io';
import Quill from 'quill';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('editor') editor!:QuillEditorComponent;

  saveInterval:any;
  constructor(private _socket: Socket) {
  }
  ngOnInit() {
    console.log(this.editor);
  }
  ngAfterViewInit() {
    console.log(this.editor);
    this._socket.on('connect', () => {
      this._socket.emit('getDoc', 123);
      this.recieveDocListener().subscribe((data:any) => {
        if(data !==null){
          this.editor.quillEditor.setContents(data);
        }
      })
      this.recieveChangeListener().subscribe((data:any) => {
        this.editor.quillEditor.updateContents(data);

      })
    })

    // this.saveInterval=setInterval(()=>{
    //   this._socket.emit('save-document',{docId:123,data:this.editor.quillEditor.getContents()});
    // },2000)
  }
  ngOnDestroy(){
    clearInterval(this.saveInterval);
  }
  getTextChange(delta: any, oldDelta: any, source: any) {
    if (source == "user") {
      this._socket.emit('send-change', delta);

    }
  }
  // getDoc() {
  //   this._socket.emit('getDoc', 123);
  // }
  recieveDocListener() {
    return this._socket.fromEvent('recieveDoc');
  }
  recieveChangeListener() {
    return this._socket.fromEvent('recieve-change');
  };
  saveDoc(){
    this._socket.emit('save-document',{docId:123,data:this.editor.quillEditor.getContents()});
  }


  title = 'WordTogetherQuill';
}
