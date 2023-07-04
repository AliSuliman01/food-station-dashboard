import { Button } from "@material-tailwind/react";
import { Children } from "react";
import { useState } from "react";
import { BounceLoader } from "react-spinners";

const NativeButtonWithLoading = ({ children,className, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    
    const clickPromise = new Promise(onClick);
    
    clickPromise.then(() => {
      setLoading(false);
    });
  };
  return (
    <a
      className={`flex items-center ${className}`}
      onClick={handleClick}
    >
      {children}
      {loading && <BounceLoader size={15} color="#fff" className="ml-2" />}
    </a>
  );
};

export default NativeButtonWithLoading;
