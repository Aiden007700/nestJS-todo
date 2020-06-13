import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './interface/jwt-token.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserReposetory } from './user.reposetory'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserReposetory)
        private userReposetory: UserReposetory
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'gshsgastgusalus'
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload
        const user = await this.userReposetory.findOne({username})

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}