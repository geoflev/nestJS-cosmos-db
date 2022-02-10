import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CosmosService } from "src/services/cosmos.service";

export class GetSingleProjectQuery {
    readonly projectId: string;
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}

@QueryHandler(GetSingleProjectQuery)
export class GetSingleProjectQueryHandler implements IQueryHandler<GetSingleProjectQuery>{
    constructor(private cosmosService: CosmosService) { }

    async execute(query: GetSingleProjectQuery): Promise<any> {
        const { resource: item } = await this.cosmosService.projectsContainer().item(query.projectId, query.projectId).read();
        
        return item;
    }

}