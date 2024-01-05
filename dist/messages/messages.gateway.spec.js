"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messagesgateway = require("./messages.gateway");
const _messagesservice = require("./messages.service");
describe('MessagesGateway', ()=>{
    let gateway;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _messagesgateway.MessagesGateway,
                _messagesservice.MessagesService
            ]
        }).compile();
        gateway = module.get(_messagesgateway.MessagesGateway);
    });
    it('should be defined', ()=>{
        expect(gateway).toBeDefined();
    });
});
