"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateMessageDto", {
    enumerable: true,
    get: function() {
        return UpdateMessageDto;
    }
});
const _mappedtypes = require("@nestjs/mapped-types");
const _createmessagedto = require("./create-message.dto");
let UpdateMessageDto = class UpdateMessageDto extends (0, _mappedtypes.PartialType)(_createmessagedto.CreateMessageDto) {
};
