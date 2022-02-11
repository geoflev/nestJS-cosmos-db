import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateVersionCommand } from "./commands/create-version.command";
import { DeleteVersionCommand } from "./commands/delete-version.command";
import { UpdateVersionCommand } from "./commands/update-version.command";
import { CreateVersionDto } from "./dtos/create-version.dto";
import { UpdateVersionDto } from "./dtos/update-version.dto";
import { GetAllVersionsQuery } from "./queries/get-all-versions.query";
import { GetSingleProjectVersionQuery } from "./queries/get-single-project-version.query";

@Controller('api/project')
export class VersionsController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandbus: CommandBus
    ) { }

    @Get(':projectId/version/:versionId')
    async getSingleProjectVersion(
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string): Promise<any> {
        return await this.queryBus.execute(new GetSingleProjectVersionQuery(projectId, versionId));
    }

    @Get(':projectId/versions')
    async getAllVersions(@Param('projectId') projectId: string): Promise<any> {
        return await this.queryBus.execute(new GetAllVersionsQuery(projectId));
    }

    @Post(':projectId/versions')
    async createVersion(
        @Param('projectId') projectId: string,
        @Body() versionForm: CreateVersionDto
    ): Promise<any> {
        return await this.commandbus.execute(new CreateVersionCommand(projectId, versionForm));
    }

    @Put(':projectId/version/:versionId')
    async updateVersion(
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string,
        @Body() versionForm: UpdateVersionDto
    ): Promise<any> {
        return await this.commandbus.execute(new UpdateVersionCommand(projectId, versionId, versionForm));
    }

    @Delete(':projectId/version/:versionId')
    async deleteVersion(
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string
    ): Promise<any> {
        return await this.commandbus.execute(new DeleteVersionCommand(projectId, versionId));
    }
}