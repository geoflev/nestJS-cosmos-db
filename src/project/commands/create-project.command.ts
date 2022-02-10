import { UnprocessableEntityException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";
import { CreateProjectDto } from "../dtos/create-project.dto";

export class CreateProjectCommand {
    readonly form: CreateProjectDto;
    constructor(form: CreateProjectDto) {
        this.form = form;
    }
}

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand>{
    constructor(private cosmosService: CosmosService) { }

    async execute(command: CreateProjectCommand): Promise<any> {
        try {
            const newProject = {
                name: command.form.name,
                description: command.form.description,
                versions: []
            };
            const { resource: createdItem } = await this.cosmosService.projectsContainer().items.create(newProject);
            return createdItem;
        } catch (err) {
            throw new UnprocessableEntityException(err);
        }
    }
}