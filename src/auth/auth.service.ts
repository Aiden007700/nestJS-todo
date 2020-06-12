import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReposetory } from './user.reposetory';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserReposetory)
        private UserReposetory: UserReposetory,
    ){}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UserReposetory.signUp(authCredentialsDto)
    }
}
