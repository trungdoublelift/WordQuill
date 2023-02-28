/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Doc, DocDocument } from 'src/schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class DocService {
  constructor(@InjectModel(Doc.name) private docModel: Model<DocDocument>) {}

  async findOrCreateDoc(docId: number) {

    if(docId==null) return;
    try{
      let document= await this.docModel.findOne({ docId: docId.toString() }).exec();
      if (document) {

        return document.data;
      }else{
        let document= await this.docModel.create({_id:docId.toString(),docId:docId.toString(),data:""});

        document.save();
        return  document;
      }
    }catch(err){
      console.log(err);
    }

  }
  async saveDoc(docId:number,data:any){
    if(docId==null) return;

    try{
      let document= await this.docModel.findOne({ docId: docId.toString() }).exec();
      if(!document){
        return;
      }
      document.data=data;
      document.save();
    }catch(err){
      console.log(err);
    }

  }
}
