/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { DocumentGateway } from "src/gateways/document/document.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Doc, DocSchema } from "src/schemas/document.schema";
import { DocService } from "src/services/doc/doc.service";
@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  controllers: [],
  providers: [DocumentGateway,DocService],
})
export class DocumentModule {}
