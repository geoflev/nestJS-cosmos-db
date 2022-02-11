export class VersionDto {
    constructor(name: string, description: string) {
        this.name = name
        this.description = description
    }
    name: string;
    description: string;
}