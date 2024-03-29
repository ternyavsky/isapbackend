"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersService", {
    enumerable: true,
    get: function() {
        return UsersService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _usersentity = require("./users.entity");
const _typeorm1 = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UsersService = class UsersService {
    async findOne(username) {
        return this.usersRepository.findOneBy({
            username
        });
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async createUser(CreateUser) {
        if (await this.usersRepository.findOneBy({
            username: CreateUser.username
        })) {
            throw new _common.ConflictException('User already exist!');
        }
        const user = this.usersRepository.create(CreateUser);
        return this.usersRepository.save(user);
    }
    async AuthTgUser(TgUser) {
        if (await this.usersRepository.findOneBy({
            password: TgUser.password
        })) {
            const user = this.usersRepository.findOneBy({
                password: TgUser.password
            });
            const newData = {
                ...user,
                username: TgUser.username || (await user).username,
                password: TgUser.password || (await user).password,
                img: TgUser.img || (await user).img,
                role: TgUser.role || (await user).role
            };
            this.usersRepository.update({
                password: TgUser.password
            }, newData);
            return user;
        } else {
            const user = this.usersRepository.create(TgUser);
            return this.usersRepository.save(user);
        }
    }
    async changeUser(username, user) {
        const User = this.usersRepository.findOneBy({
            username: user.username
        });
        if (await this.usersRepository.findOneBy({
            username: username
        })) {
            throw new _common.ConflictException('Username already exist!');
        }
        const updUser = {
            ...User,
            username: username
        };
        await this.usersRepository.update({
            id: user.id
        }, updUser);
        return this.usersRepository.findOneBy({
            username: username
        });
    }
    constructor(usersRepository){
        this.usersRepository = usersRepository;
    }
};
UsersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_usersentity.User)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], UsersService);
