import { Controller } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorators';
import { AuthType } from 'src/iam/authentication/enums/auth-types.enum';

@Auth(AuthType.Bearer)
@Controller('app')
export class AppController {}
