import User from "../model/User";

export default class UserRepository {
  async findById(id: number) {
    try {
      return await User.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async findByEmail(email: string) {
    try {
      return await User.findOne({
        where: { email },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
