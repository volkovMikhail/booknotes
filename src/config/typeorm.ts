import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const asyncTypeormConfig: TypeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mongodb',
      url: process.env.MONGO_URL,
      entities: ['dist/db/entities/*{.ts,.js}'],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    };
  },
};
