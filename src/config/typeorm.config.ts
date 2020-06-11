import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModule = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'nest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: 'true',
};
