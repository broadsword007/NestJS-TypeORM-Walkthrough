import { Module } from '@nestjs/common';
import { ManagementModule } from './management/management.module';
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    username: 'sql12242542',
    password: 'sYIaHqABq7',
    database: 'sql12242542',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }),ManagementModule, UserModule],
  controllers: [],
  providers: []
})
export class ApplicationModule {}
