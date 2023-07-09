import { Avatar, Chip, Typography } from "@material-tailwind/react";
import defaultImage from  '../../../../assets/category/default.jpg';
import { toImagePath } from "../../../../helpers/functions";

export default ({
  tableRow,
  classes,
}) => {
  const {
    id,
    name,
    slug,
    translation,
    main_image:image,
    parent_category,
    created_at
  } = tableRow;

  
  return (
    <>
    <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {id}
        </Typography>
      </td>
     <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={image?.path ? toImagePath(image.path) : defaultImage} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {translation?.name}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {parent_category?.translation?.name}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {name}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {slug}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {new Date(created_at).toDateString()}
        </Typography>
      </td>
    </>
  );
};

