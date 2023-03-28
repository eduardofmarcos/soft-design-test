import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService:JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signupDto: SignUpDto) {
    try {
      await this.isUserRegistred(signupDto.email);
      console.log(signupDto)
      const user = new this.userModel();
      user.email = signupDto.email;
      user.password = await this.hashingService.hash(signupDto.password);
      await user.save();
    } catch (err) {
      throw err;
    }
  }

  async signIn(SignInDto: SignInDto) {
    const user = await this.userModel.findOne({ email: SignInDto.email });

    if (!user) {
      throw new UnauthorizedException('user does not exists');
    }

    const isEqual = await this.hashingService.compare(
      SignInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user._id,
        email: user.email,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return {
        accessToken
    }
  }

  async isUserRegistred(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) throw new ConflictException('conflict');
    return true;
  }
}
