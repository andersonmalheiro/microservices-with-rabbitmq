import bcrypt from "bcrypt";
import UserModel from "@modules/user/model/User";

export const createInitialData = async () => {
  const saltRounds = 10;
  try {
    await UserModel.sync({ force: true });

    const encryptedPassword = await bcrypt.hash("qwe123", saltRounds);

    await UserModel.create({
      name: "TestUser",
      email: "user@email.com",
      password: encryptedPassword,
    });
  } catch (error) {
    console.error(error);
  }
};
