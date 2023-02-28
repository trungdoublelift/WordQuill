/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentController } from './controllers/document/document.controller';
import { DocumentGateway } from './gateways/document/document.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DocService } from './services/doc/doc.service';
import { DocumentModule } from './modules/document.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://trungdoublelift:4262129a@mongotestdb.pcazezb.mongodb.net/document'),DocumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
