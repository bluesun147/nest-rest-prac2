import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
        ) {}

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     // const title = createBoardDto.title;
    //     // const description = createBoardDto.description;
    //     const {title, description} = createBoardDto; // 같은 의미
    //     const board: Board = {
    //         id: uuid(), // 유니크한 id 값
    //         title, // title: title
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board); // 배열에 넣어줌
    //     return board;
    // }

     
    async createBoard(createBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }   
     

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }
 
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     // 원 게시물 중 아이디 다른 것만 남김
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}