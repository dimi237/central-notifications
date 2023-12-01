import { isEmpty } from "lodash";
import { User } from "./models";
import { UsersRepository } from "./users.repository";
import { BaseService } from "common";
import { Service } from "typedi";
import { hash } from "bcrypt";
import { config } from "convict-config"


@Service()
export class UsersService extends BaseService<User> {

    constructor(private readonly userRepository: UsersRepository) {
        super(userRepository);
    }

    async getUserById(filter: any) {
        try { return await this.userRepository.getUserById(filter.id); }
        catch (error) { throw (error); }
    }


    async createUser(user: User) {
        try {
            const { email } = user;

            delete user._id;
            const existing = await this.userRepository.findOne({ filter: { email } });

            if (!isEmpty(existing)) { return new Error('EmailAllreadyUsed'); }

            const { password } = user;

            user.password = await hash(password, config.get('saltRounds'));

            const result = await this.userRepository.create(user as any);

            const data = { _id: result.insertedId };

            return data;
        }
        catch (error) { throw (error); }
    }

}
