import bcrypt from "bcrypt";
import User from "@modules/user/model/User";

export const createInitialData = async () => {
  const saltRounds = 10;
  try {
    await User.sync({ force: true });

    const encryptedPassword = await bcrypt.hash("qwe123", saltRounds);

    await User.create({
      name: "TestUser",
      email: "user@email.com",
      password: encryptedPassword,
    });
  } catch (error) {
    console.error(error);
  }
};
