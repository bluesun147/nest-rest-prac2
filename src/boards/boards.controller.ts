import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     // @Body('title') title: string,
    //     // @Body('description') description: string
    //     @Body() createBoardDto: CreateBoardDto
    //     ): Board {
    //         return this.boardsService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise <Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus 
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}