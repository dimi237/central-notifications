import { BaseRepository } from "common";
import { Service } from "typedi";


@Service()
export class UsersRepository extends BaseRepository {

    constructor() { super(); }

    async getUserById(id: string) {
        try { return await this.findOne({ filter: { _id: id } }); }
        catch (error) { throw(error); }
    }

    async updateUserById(id: string, user: any) {
        try { return await this.update({ _id: id }, user); }
        catch (error) { throw(error); }
    }

}
