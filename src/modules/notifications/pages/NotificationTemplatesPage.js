import { Button } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const NotificationTemplatesPage = () => {

    const handleAdd =  () => {

    }
  return (
    <>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4 flex flex-col border h-72 overflow-y-scroll">
          <Link to={"./template_1"} className="p-2">
            {" "}
            Template 1{" "}
          </Link>
          <Link to={"./template_2"} className="p-2">
            {" "}
            Template 2{" "}
          </Link>
          <Link to={"./template_3"} className="p-2">
            {" "}
            Template 3{" "}
          </Link>
          <Link to={"./template_4"} className="p-2">
            {" "}
            Template 4{" "}
          </Link>
          <Link to={"./template_1"} className="p-2">
            {" "}
            Template 1{" "}
          </Link>
          <Link to={"./template_2"} className="p-2">
            {" "}
            Template 2{" "}
          </Link>
          <Link to={"./template_3"} className="p-2">
            {" "}
            Template 3{" "}
          </Link>
          <Link to={"./template_4"} className="p-2">
            {" "}
            Template 4{" "}
          </Link>
          <Link to={"./template_1"} className="p-2">
            {" "}
            Template 1{" "}
          </Link>
          <Link to={"./template_2"} className="p-2">
            {" "}
            Template 2{" "}
          </Link>
          <Link to={"./template_3"} className="p-2">
            {" "}
            Template 3{" "}
          </Link>
          <Link to={"./template_4"} className="p-2">
            {" "}
            Template 4{" "}
          </Link>
          <Link to={"./template_1"} className="p-2">
            {" "}
            Template 1{" "}
          </Link>
          <Link to={"./template_2"} className="p-2">
            {" "}
            Template 2{" "}
          </Link>
          <Link to={"./template_3"} className="p-2">
            {" "}
            Template 3{" "}
          </Link>
          <Link to={"./template_4"} className="p-2">
            {" "}
            Template 4{" "}
          </Link>
          <Link to={"./template_1"} className="p-2">
            {" "}
            Template 1{" "}
          </Link>
          <Link to={"./template_2"} className="p-2">
            {" "}
            Template 2{" "}
          </Link>
          <Link to={"./template_3"} className="p-2">
            {" "}
            Template 3{" "}
          </Link>
          <Link to={"./template_4"} className="p-2">
            {" "}
            Template 4{" "}
          </Link>
        </div>
        <div className="col-span-8 border">
          <Outlet />
        </div>
      </div>

      <Button
        className="bg-main my-3"
        onClick={handleAdd}
      >
        {"Add"}
      </Button>
    </>
  );
};

export default NotificationTemplatesPage;
