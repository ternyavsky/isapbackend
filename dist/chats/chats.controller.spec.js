"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _chatscontroller = require("./chats.controller");
describe('ChatsController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _chatscontroller.ChatsController
            ]
        }).compile();
        controller = module.get(_chatscontroller.ChatsController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
