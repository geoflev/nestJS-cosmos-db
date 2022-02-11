import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { VersionsModule } from './versions/versions.module';

@Module({
  imports: [
    ProjectModule,
    VersionsModule
  ]
})
export class AppModule { }
