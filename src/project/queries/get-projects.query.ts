import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class GetProjectsQuery { }

@QueryHandler(GetProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetProjectsQuery>{
    constructor(private cosmosService: CosmosService) { }

    execute(query: GetProjectsQuery): Promise<any> {
        return this.cosmosService.projectsContainer().items.readAll().fetchAll();
    }
}