import { useRouteError } from "react-router-dom";

export default () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.status} {error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};
