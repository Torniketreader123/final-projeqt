import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://veshapidzetornike:hyqJxQCr8ppkxJ14@cluster0.hjrfjlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
