import { CreateProjectCommandHandler } from "./create-project.command";
import { DeleteProjectCommandHandler } from "./delete-project.command";
import { UpdateProjectCommandHandler } from "./update-project.command";

export const CommandHandlers = [CreateProjectCommandHandler, UpdateProjectCommandHandler, DeleteProjectCommandHandler]