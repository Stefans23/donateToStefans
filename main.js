"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const actions_1 = require("@solana/actions");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors(actions_1.ACTIONS_CORS_HEADERS));
    await app.listen(80);
}
bootstrap();
//# sourceMappingURL=main.js.map