import { IsBoolean, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsBoolean()
  readonly isAvailable: boolean;
}