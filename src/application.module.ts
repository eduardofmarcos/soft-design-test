import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    MongooseModule.forRoot('mongodb://localhost:27017/soft_design_db'),
    UsersModule,
    IamModule,
  ],
})
export class AppplicationModule {}
