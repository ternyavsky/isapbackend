"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _chatsservice = require("./chats.service");
describe('ChatsService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _chatsservice.ChatsService
            ]
        }).compile();
        service = module.get(_chatsservice.ChatsService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});
