import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserReposetory extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        const user = new User();
        user.username = username
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);


        try {
            await user.save();
        } catch (error) {
            console.log(error.code, error.code === 'ER_DUP_ENTRY')
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('username alredy exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto
        const user = await this.findOne({username})
        if (!user) {
            
        }
        return 
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}