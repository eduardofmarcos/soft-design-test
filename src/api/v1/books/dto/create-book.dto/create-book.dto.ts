import { IsBoolean, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly author: string;
  @IsString()
  readonly publisher: string;
  @IsString()
  readonly lengthInPages: string;
  @IsString()
  readonly publishedIn: string;
  @IsString({ each: true })
  readonly topic: string[];
  @IsString({ each: true })
  readonly format: string[];
  @IsBoolean()
  readonly isAvailable: boolean;
}
