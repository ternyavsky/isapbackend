import { Controller, Get, Inject, Req, UseGuards, forwardRef } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api')
export class ChatsController {
    constructor(
        private readonly chatService: ChatsService,
    ) { }


    @UseGuards(AuthGuard)
    @Get("/chats")
    getChats(@Req() req: Request) {
        console.log(req["user"].username, "15 string")
        return this.chatService.findChatUser(req["user"])
    }




}
