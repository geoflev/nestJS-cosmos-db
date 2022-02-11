import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class DeleteVersionCommand {
    constructor(
        readonly projectId: string,
        readonly versionId: string) {
        this.projectId = projectId;
        this.versionId = versionId;
    }

}

@CommandHandler(DeleteVersionCommand)
export class DeleteVersionCommandHandler implements ICommandHandler<DeleteVersionCommand>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(command: DeleteVersionCommand): Promise<any> {
        const { resource: project } = await this.cosmosService.projectsContainer().item(command.projectId, command.projectId).read();
        if (!project) {
            throw new NotFoundException('Project was not found!')
        }

        const newVersions = project.versions.filter(x => x.name !== command.versionId);
        project.versions = newVersions;

        const { resource: replaced } = await this.cosmosService.projectsContainer()
            .item(command.projectId, command.projectId)
            .replace(project);

        return replaced;
    }

}