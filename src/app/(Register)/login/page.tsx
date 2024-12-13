import MainContainer from "@/components/Container/MainContainer";
import LoginModel from "@/components/Model/LoginModel";

const Page = () => {
  return (
    <div
      className="bg-login bg-center bg-cover bg-fixed min-h-screen
      flex items-center justify-center"
    >
      <MainContainer>
        <LoginModel />
      </MainContainer>
    </div>
  );
};

export default Page;
