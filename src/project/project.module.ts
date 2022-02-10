import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { CosmosService } from 'src/services/cosmos.service';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [ProjectController],
  providers: [
    CosmosService,
    ...QueryHandlers,
    ...CommandHandlers
  ],
  exports: [
    CosmosService
  ]
})
export class ProjectModule { }
