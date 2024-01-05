"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messagescontroller = require("./messages.controller");
describe('MessagesController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _messagescontroller.MessagesController
            ]
        }).compile();
        controller = module.get(_messagescontroller.MessagesController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});
