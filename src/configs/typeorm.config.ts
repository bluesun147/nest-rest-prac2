import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'bluesun',
    database: 'board-app2',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}