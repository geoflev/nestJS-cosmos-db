import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class GetAllVersionsQuery {
    constructor(readonly projectId: string) {
        this.projectId = projectId;
    }
}


@QueryHandler(GetAllVersionsQuery)
export class GetAllVersionsQueryhandler implements IQueryHandler<GetAllVersionsQuery>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(query: GetAllVersionsQuery): Promise<any> {
        const { resource: item } = await this.cosmosService.projectsContainer().item(query.projectId, query.projectId).read();
        return item.versions;
    }
}