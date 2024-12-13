import bcrypt from "bcryptjs";

interface Hash {
  password: string;
}

interface Compare {
  password: string;
  hashedPassword: string;
}

const cryptpassword = () => {
  const hashPassword = async ({ password }: Hash) => {
    const hashed = await bcrypt.hash(password, 12);
    return hashed;
  };

  const comparePassword = async ({ hashedPassword, password }: Compare) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  };

  return { hashPassword, comparePassword };
};

export default cryptpassword;
