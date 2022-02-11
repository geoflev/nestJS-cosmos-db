import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";
import { CreateVersionDto } from "../dtos/create-version.dto";
import { VersionDto } from "../dtos/version.dto";

export class CreateVersionCommand {
    constructor(
        readonly projectId: string,
        readonly form: CreateVersionDto
    ) {
        this.projectId = projectId;
        this.form = form;
    }
}

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler implements ICommandHandler<CreateVersionCommand>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(command: CreateVersionCommand): Promise<any> {
        const { resource: project } = await this.cosmosService.projectsContainer().item(command.projectId, command.projectId).read();
        if (!project) {
            throw new NotFoundException('Project was not found!')
        }
        project.versions.push(new VersionDto(command.form.name, command.form.description))

        const { resource: replaced } = await this.cosmosService.projectsContainer()
            .item(command.projectId, command.projectId)
            .replace(project);

        return replaced;
    }
}

