import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { userController } from './user.controller';
import { User, UserSchema, UserDocument } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '../auth/guards/authGuard';
import { authModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import Utils from './utils/utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    authModule,
  ],
  controllers: [userController],
  providers: [userService, User, Utils],
  exports: [userService, MongooseModule, User],
})
export class userModule {}
