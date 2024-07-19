import {ConfigService} from '@nestjs/config';
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';


export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService)
  }

}

const getMongoString = (configService: ConfigService) =>
  'mongodb://localhost'+
  ':'+
  configService.get('MONGO_PORT')+
  '/'+
  configService.get('MONGO_DATABASE')