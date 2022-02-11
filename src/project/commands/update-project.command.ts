import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";
import { UpdateProjectDto } from "../dtos/update-project.dto";

export class UpdateProjectCommand {
    readonly projectId: string;
    readonly form: UpdateProjectDto;
    constructor(projectId: string, form: UpdateProjectDto) {
        this.projectId = projectId;
        this.form = form;
    }
}

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler implements ICommandHandler<UpdateProjectCommand>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(command: UpdateProjectCommand): Promise<any> {
        try {
            const { resource: oldItem } = await this.cosmosService.projectsContainer().item(command.projectId, command.projectId).read();
            if (!oldItem) {
                throw new NotFoundException('Project was not found!')
            }
            const newItem = oldItem;
            newItem.name = command.form.name;
            newItem.description = command.form.description;

            const { resource: replaced } = await this.cosmosService.projectsContainer()
                .item(command.projectId, command.projectId)
                .replace(newItem);

            return newItem;
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

}