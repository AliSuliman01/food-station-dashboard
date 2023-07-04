import { Avatar, Chip, Typography } from "@material-tailwind/react";
import defaultImage from  '../../../../assets/category/default.jpg';

export default ({
  tableRow,
  classes,
}) => {
  const {
    id,
    translation,
    main_image:image,
    parent_category,
    created_at
  } = tableRow;

  
  return (
    <>
     <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={image?.path ?? defaultImage} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {translation.name}
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
          {new Date(created_at).toDateString()}
        </Typography>
      </td>
    </>
  );
};

