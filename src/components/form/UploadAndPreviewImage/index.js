import { toImagePath } from "../../../helpers/functions";
import ImagePlaceholderSection from "../../ImagePlaceholderSection";
import ImageSection from "../../ImageSection";


export default ({imagePath, onSelectImage, onClearImage}) => {
    return (

        <div
        onClick={() => {
         document.getElementById("mainImageFileInput").click();
       }}
       >

          <input
             type="file"
             id="mainImageFileInput"
             hidden
             onChange={onSelectImage}
           />

       {imagePath? (
         <ImageSection
           image_path={toImagePath(imagePath)}
           onClearImage={onClearImage}
         />
       ) : (
         <ImagePlaceholderSection />
       )}
       </div>

    )
}