import { useEffect } from "react";
import { refreshContexmenuePreventing, toImagePath } from "../../../helpers/functions";

export default ({ images, onContextMenu, onSelectImage }) => {

  useEffect(() => {
    refreshContexmenuePreventing()
  }, [])
  return (
    <>
      <input type="file" id="imageFileInput" hidden onChange={onSelectImage} />

      <div className="flex flex-wrap p-3 prevent-contextmenu">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="w-16 h-16 mr-3 mb-3 flex justify-center items-center cursor-pointer rounded-md"
              onContextMenu={() => onContextMenu(image) }
            >
              <img src={toImagePath(image.path)} className="object-cover relative" />
            </div>
          );
        })}
        <div
          className="w-16 h-16 flex justify-center items-center cursor-pointer rounded-md bg-blue-gray-50"
          onClick={() => {
            document.getElementById("imageFileInput").click();
          }}
        >
          <span className="m-4">+</span>
        </div>
      </div>
    </>
  );
};
