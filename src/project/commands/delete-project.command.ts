import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class DeleteProjectCommand {
    constructor(readonly projectId: string) {
        this.projectId = projectId;
    }
}

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectCommandHandler implements ICommandHandler<DeleteProjectCommand>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(command: DeleteProjectCommand): Promise<any> {
        const { resource: item } = await this.cosmosService.projectsContainer().item(command.projectId, command.projectId).read();
        if (!item) {
            throw new NotFoundException('Project was not found!')
        }

        await this.cosmosService.projectsContainer().item(item.id, item.id).delete()
    }

}