import { Injectable, OnModuleDestroy, OnModuleInit, Scope } from "@nestjs/common";
import { environment } from '../environments/environment';
import { Container, CosmosClient, Database, Items } from '@azure/cosmos';

@Injectable({ scope: Scope.DEFAULT })
export class CosmosService implements OnModuleInit, OnModuleDestroy {
    private readonly _client: CosmosClient
    private _database: Database;
    private _projectsContainer: Container;
    private _versionsContainer: Container;

    constructor() {
        this._client = new CosmosClient(environment.cosmosConnectionString);
    }
    onModuleInit() {
        this._database = this._client.database('neuro');
        this._projectsContainer = this._database.container('projects');
        this._versionsContainer = this._database.container('versions');
        this._projectsContainer.items;
        this._versionsContainer.items;
    }

    onModuleDestroy() {
        this._client.dispose();
    }

    public projectsContainer(): Container | undefined {
        return this._projectsContainer;
    }

    public versionsContainer(): Container | undefined {
        return this._versionsContainer;
    }
}   