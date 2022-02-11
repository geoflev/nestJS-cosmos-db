import { CreateVersionCommandHandler } from "./create-version.command";
import { DeleteVersionCommandHandler } from "./delete-version.command";
import { UpdateVersionCommandHandler } from "./update-version.command";

export const CommandHandlers = [CreateVersionCommandHandler, UpdateVersionCommandHandler, DeleteVersionCommandHandler]