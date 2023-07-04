import { useState } from "react";
import WhitePlate from "./assets/WhitePlate.png";
import ButtonWithLoading from "../../../../components/ButtonWithLoading";
import useApi from "../../../../hooks/useApi";
import UsersApi from "../../../../api/users";
import InputForm from "../../../../components/form/InputForm";

const SignUp = ({ setAuthUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupApi = useApi(UsersApi.signup);

  const handleSignup = () => {
    signupApi.request({ name, email, password }).then((response) => {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setAuthUser(response.data.user);
      window.location.reload();
    });
  };

  return (
    <div className="w-full md:grid md:grid-cols-12 gap-10 items-center flex flex-col-reverse ">
      <div className="col-span-6 mx-5 fadeAnimation1">
        <form className="shadow-md rounded-lg px-5 py-3  mx-auto w-full px-auto">
          <div className="my-4">
            <InputForm label="Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="my-4">
            <InputForm
              type="email"
              label="Email"
              setValue={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4">
            <InputForm
              type="password"
              label="Password"
              setValue={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4">
            <InputForm
              type="password"
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="my-4">
            <div className="flex justify-center">
              <ButtonWithLoading onClick={handleSignup}>
                SignUp
              </ButtonWithLoading>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-6 flex justify-center fadeAnimation2">
        <img src={WhitePlate} />
      </div>
    </div>
  );
};

export default SignUp;
