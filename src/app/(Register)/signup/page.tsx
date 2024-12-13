import MainContainer from "@/components/Container/MainContainer";
import SignUpModel from "@/components/Model/SignUpModel";

const Page = () => {
  return (
    <div
      className="bg-signup bg-center bg-cover bg-fixed min-h-screen
      flex justify-center items-center "
    >
      <MainContainer>
        <SignUpModel />
      </MainContainer>
    </div>
  );
};

export default Page;
