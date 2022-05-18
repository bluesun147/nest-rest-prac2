import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        // const title = createBoardDto.title;
        // const description = createBoardDto.description;
        const {title, description} = createBoardDto; // 같은 의미
        const board: Board = {
            id: uuid(), // 유니크한 id 값
            title, // title: title
            description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board); // 배열에 넣어줌
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
 
    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        // 원 게시물 중 아이디 다른 것만 남김
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}