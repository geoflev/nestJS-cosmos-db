import { UnprocessableEntityException } from "@nestjs/common";
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
        const form = {
            name: command.form.name,
            description: command.form.description,
            versions: []
        };
        try {
            const { resources: projects } = await this.cosmosService.projectsContainer().items
                .query(`select * from projects as project where project.id =  '${command.projectId}'`).fetchAll();

            //TODO

            const { resource: updatedItem } = await this.cosmosService.projectsContainer().items.upsert(form, {});
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

}