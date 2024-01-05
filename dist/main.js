"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _swagger = require("@nestjs/swagger");
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule, {});
    const config = new _swagger.DocumentBuilder().setTitle('Isap Chat').setDescription('Api docs for isap chat app').setVersion('1.0').build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('swagger', app, document);
    app.enableCors({
        credentials: true,
        origin: true
    });
    app.useGlobalPipes(new _common.ValidationPipe());
    (0, _classvalidator.useContainer)(app.select(_appmodule.AppModule), {
        fallbackOnErrors: true
    });
    await app.listen(8000);
}
bootstrap();
