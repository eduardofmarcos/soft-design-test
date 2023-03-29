import { IsOptional } from 'class-validator';

export class QueryFilter {
  @IsOptional()
  page: string;
  @IsOptional()
  fields: string;
  @IsOptional()
  limit: string;
  @IsOptional()
  sort: string;
  @IsOptional()
  _id: string;
  @IsOptional()
  title: string;
  @IsOptional()
  author: string;
  @IsOptional()
  publisher: string;
  @IsOptional()
  lengthInPages: string;
  @IsOptional()
  publishedIn: string;
  @IsOptional()
  topic: string[];
  @IsOptional()
  format: string[];
  @IsOptional()
  isAvailable: string;
}
