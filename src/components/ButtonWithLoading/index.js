import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { BounceLoader } from "react-spinners";

const ButtonWithLoading = ({ children, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  return (
    <Button
      type="button"
      className="bg-main flex items-center"
      onClick={handleClick}
    >
      {children}
      {loading && <BounceLoader size={20} color="#fff" className="ml-2" />}
    </Button>
  );
};

export default ButtonWithLoading;
