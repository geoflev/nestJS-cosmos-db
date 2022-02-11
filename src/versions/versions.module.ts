import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";
import { CommandHandlers } from "./commands";
import { Queryhandlers } from "./queries";
import { VersionsController } from "./versions.controller";

@Module({
    imports: [
        CqrsModule,
    ],
    controllers: [VersionsController],
    providers: [
        CosmosService,
        ...Queryhandlers,
        ...CommandHandlers
    ],
    exports: [
        CosmosService
    ]
})
export class VersionsModule { }