import { Injectable } from '@nestjs/common';
// import { MyBookService } from 'src/my-book/my-book.service';
// import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MyBookHistoryService {
  // constructor(
  //   private readonly prismaService: PrismaService,
  //   private readonly myBookService: MyBookService,
  // ) {}
  // async createMyBookHistory(payload: CreateMyBookHistoryPayload) {
  //   const myBook = await this.myBookService.validateMyBook({
  //     id: payload.myBookId,
  //     userId: payload.userId,
  //   });
  //   const myBookHistory = await this.prismaService.myBookHistory.create({
  //     data: {
  //       date: payload.date,
  //       startPage: payload.page,
  //       myBookId: myBook.id,
  //     },
  //   });
  //   return myBookHistory;
  // }
  // async getMyBookHistoryList(payload: GetMyBookHistoryListPayload) {
  //   return this.prismaService.myBookHistory.findMany({
  //     where: {
  //       myBookId: payload.id,
  //     },
  //   });
  // }
  // async getMyBookHistory(payload: GetMyBookHistoryPayload) {
  //   const myBookHistory = await this.prismaService.myBookHistory.findUnique({
  //     where: {
  //       id: payload.id,
  //     },
  //   });
  //   if (!myBookHistory) throw new NotFoundException('해당 History를 찾을 수 없습니다.');
  //   return myBookHistory;
  // }
  // async updateMyBookHistory(payload: UpdateMyBookHistoryPayload) {
  //   const myBookHistory = await this.getMyBookHistory({ id: payload.id });
  //   await this.myBookService.validateMyBook({
  //     id: myBookHistory.myBookId,
  //     userId: payload.userId,
  //   });
  //   return this.prismaService.myBookHistory.update({
  //     where: {
  //       id: myBookHistory.id,
  //     },
  //     data: {
  //       date: payload.date,
  //       startPage: payload.page,
  //     },
  //   });
  // }
  // async deleteMyBookHistory(payload: deleteMyBookHistoryPayload) {
  //   const myBookHistory = await this.getMyBookHistory({ id: payload.id });
  //   await this.myBookService.validateMyBook({
  //     id: myBookHistory.myBookId,
  //     userId: payload.userId,
  //   });
  //   return this.prismaService.myBookHistory.delete({
  //     where: {
  //       id: myBookHistory.id,
  //     },
  //   });
  //}
}
