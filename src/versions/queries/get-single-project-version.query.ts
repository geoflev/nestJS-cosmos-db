import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class GetSingleProjectVersionQuery {
    constructor(
        readonly projectId: string,
        readonly versionId: string) {
        this.projectId = projectId;
        this.versionId = versionId;
    }
}

@QueryHandler(GetSingleProjectVersionQuery)
export class GetSingleProjectVersionQueryHandler implements IQueryHandler<GetSingleProjectVersionQuery>{
    constructor(private readonly cosmosService: CosmosService) { }

    async execute(query: GetSingleProjectVersionQuery): Promise<any> {
        const { resource: item } = await this.cosmosService.projectsContainer().item(query.projectId, query.projectId).read();
        return item.versions.filter(x => x.name === query.versionId)
    }
}