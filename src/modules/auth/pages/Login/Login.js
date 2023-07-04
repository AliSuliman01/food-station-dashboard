import WhitePlate from "./assets/WhitePlate.png";
import { useEffect, useState } from "react";
import ButtonWithLoading from "../../../../components/ButtonWithLoading";
import UsersApi from "../../../../api/users";
import useApi from "../../../../hooks/useApi";
import InputForm from "../../../../components/form/InputForm";

const Login = ({ setAuthUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginApi = useApi(UsersApi.login);

  const handleLogin = async () => {
    return loginApi.request({ email, password }).then((response) => {
      if (response.success) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.reload();
      }
    });
  };

  return (
    <div className="md:grid md:grid-cols-12  items-center flex flex-col-reverse">
      <div className=" md:w-full md:col-span-6 lg:col-span-5 fadeAnimation1">
        <form className="rounded-lg px-5 py-3 w-full px-auto shadow-md">
          <div className="my-4">
            <InputForm
              inputLabel="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4">
            <InputForm
              inputLabel="Passwoed"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <ButtonWithLoading onClick={handleLogin}>Login</ButtonWithLoading>
          </div>
        </form>
      </div>
      <div className="md:col-span-6 lg:col-span-7 flex justify-center fadeAnimation2">
        <img src={WhitePlate} className="object-cover" />
      </div>
    </div>
  );
};
export default Login;
