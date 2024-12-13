import { getServerSession } from "next-auth";

const Home = async () => {
  const sesion = await getServerSession();

  console.log(sesion?.user);

  return (
    <div>
      Home
      {sesion?.user?.email}
    </div>
  );
};

export default Home;
