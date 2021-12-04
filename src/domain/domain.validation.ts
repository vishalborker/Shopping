import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateDomainDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}  
  
export class FindById {
    @IsString()
    @IsNotEmpty()
    id: string;
}