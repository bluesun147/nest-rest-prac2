import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { BoardsService } from './boards/boards.service';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class AppModule {}
