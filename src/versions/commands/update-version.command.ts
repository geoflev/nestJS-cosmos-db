import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";
import { UpdateVersionDto } from "../dtos/update-version.dto";

export class UpdateVersionCommand {
    constructor(
        readonly projectId: string,
        readonly versionId: string,
        readonly form: UpdateVersionDto,
    ) {
        this.projectId = projectId
        this.versionId = versionId
        this.form = form
    }
}

@CommandHandler(UpdateVersionCommand)
export class UpdateVersionCommandHandler implements ICommandHandler<UpdateVersionCommand>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(command: UpdateVersionCommand): Promise<any> {
        const { resource: project } = await this.cosmosService.projectsContainer().item(command.projectId, command.projectId).read();
        if (!project) {
            throw new NotFoundException('Project was not found!')
        }

        project.versions.forEach(version => {
            if (version.name === command.versionId) {
                version.name = command.form.name;
                version.description = command.form.description;
            }
        });

        const { resource: replaced } = await this.cosmosService.projectsContainer()
            .item(command.projectId, command.projectId)
            .replace(project);

        return replaced;
    }

}