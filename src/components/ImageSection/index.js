import { Button } from "@material-tailwind/react";

export default ({ image_path, onClearImage }) => {
  return (
    <>
      <img src={image_path} className="object-cover relative" />
      <div className="w-full flex justify-center">
        <Button
          className="bg-main relative overflow-hidden my-3"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClearImage();
          }}
        >
          Clear
        </Button>
      </div>
    </>
  );
};
