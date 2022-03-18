import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import Utils from '../config/utils/utils';
import { ConfigDocument } from '../config/entities/config.entity';
import { ApplicationException } from 'src/utils/exception/ApplicationException';

@Injectable()
export class userService {
  private readonly logger = new Logger('userService');

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    public utils: Utils,
  ) {}

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
