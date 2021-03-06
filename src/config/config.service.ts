import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import Utils from './utils/utils';
import { ConfigDocument } from './entities/config.entity';
import { ApplicationException } from 'src/utils/exception/ApplicationException';
import { createConfigDTO } from './dtos/createConfig.dto';

@Injectable()
export class configService {
  private readonly logger = new Logger('userService');

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('Config')
    private readonly configModel: Model<ConfigDocument>,
    public utils: Utils,
  ) {}

  async createConfig(createConfigDTO: createConfigDTO) {
    const config = await this.configModel.create({
      enabled: true,
      projectId: createConfigDTO.projectId,
      owner: createConfigDTO.owner,
    });

    return config;
  }

  async toggleService(projectId: string, ownerId: string) {
    const config = await this.configModel.findOne({
      projectId: projectId,
      owner: ownerId,
    });
    if (!config) {
      throw new ApplicationException('invalid projectid', 400);
    }
    config.enabled = !config.enabled;
    await config.save();
    return config;
  }

  async viewUsers(
    ownerId: string,
    projectId: string,
    per_page: string,
    page_param: string,
  ) {
    const config = await this.configModel.findOne({
      projectId: projectId,
      owner: ownerId,
    });

    if (!config) {
      throw new ApplicationException(
        'Invalid projectId or you dont have access to this project',
        400,
      );
    }

    const { perPage, page } = this.utils.fetchPaginationParams(
      per_page,
      page_param,
    );

    const count = await this.userModel.count({ projectId: projectId });
    const users = await this.userModel.find(
      { projectId: projectId },
      {},
      {
        skip: page * perPage,
        limit: perPage,
      },
    );

    return { users, count };
  }
}
