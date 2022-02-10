import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
  NotFoundException,
  Patch
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './commands/create-project.command';
import { UpdateProjectCommand } from './commands/update-project.command';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectDto } from './dtos/project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { GetProjectsQuery } from './queries/get-projects.query';
import { GetSingleProjectQuery } from './queries/get-single-project.query';

@Controller('api/projects')
export class ProjectController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get()
  async getAllProjects(): Promise<any> {
    return await this.queryBus.execute(new GetProjectsQuery());
  }

  @Get(':projectId')
  async getProject(@Param('projectId') projectId) {
    return await this.queryBus.execute(new GetSingleProjectQuery(projectId))
  }

  @Post()
  async createProject(
    @Body()
    projectData: CreateProjectDto,
  ) {
    return await this.commandBus.execute(new CreateProjectCommand(projectData))
  }

  @Put(':projectId')
  async saveProject(@Param('projectId') projectId, @Body() projectData: UpdateProjectDto) {
    return await this.commandBus.execute(new UpdateProjectCommand(projectId, projectData));
  }

  // @Patch(':rowKey')
  // async updateProjectDetails(@Param('rowKey') rowKey, @Body() projectData: Partial<ProjectDto>) {
  //   try {
  //     const project = new Project();
  //     // Disclaimer: Assign only the properties you are expecting!
  //     Object.assign(project, projectData);

  //     return await this.projectService.update(rowKey, project);
  //   } catch (error) {
  //     throw new UnprocessableEntityException(error);
  //   }
  // }

  // @Delete(':rowKey')
  // async deleteProject(@Param('rowKey') rowKey) {
  //   try {
  //     const response = await this.projectService.delete(rowKey, new Project());

  //     if (response.statusCode === 204) {
  //       return null;
  //     } else {
  //       throw new UnprocessableEntityException(response);
  //     }
  //   } catch (error) {
  //     throw new UnprocessableEntityException(error);
  //   }
  // }
}
