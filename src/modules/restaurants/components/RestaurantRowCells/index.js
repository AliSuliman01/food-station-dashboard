import { Avatar, Typography } from "@material-tailwind/react";
import { toImagePath } from "../../../../helpers/functions";

const RestaurantRowCells = ({
  tableRow,
  classes,
}) => {
  const {
    id,
    name,
    latitude,
    longitude,
    full_address,
    cover_image_path,
    user,
    created_at
  } = tableRow;

  
  return (
    <>
     <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={toImagePath(cover_image_path)} alt={name} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {name}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {full_address}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {latitude} / {longitude}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user?.name ?? "None"}
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

export default RestaurantRowCells;
