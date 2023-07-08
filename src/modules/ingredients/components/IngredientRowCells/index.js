import { Avatar, Chip, Typography } from "@material-tailwind/react";
import { toImagePath } from "../../../../helpers/functions";

export default ({
  tableRow,
  classes,
}) => {
  const {
    id,
    translation,
    main_image:image,
    created_at
  } = tableRow;

  
  return (
    <>
     <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={toImagePath(image?.path)} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {translation.name}
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

