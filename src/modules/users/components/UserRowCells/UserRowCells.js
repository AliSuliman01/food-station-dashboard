import { Avatar, Typography } from "@material-tailwind/react";
import { toImagePath } from "../../../../helpers/functions";

const UserRowCells = ({
  tableRow,
  classes,
}) => {
  const { id, name, email, photo_path, created_at } = tableRow;
  
  return (
    <>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar src={toImagePath(photo_path)} alt={name} size="sm" />
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
              {email}
            </Typography>
          </div>
        </div>
      </td>
      {/* <td className={classes}>
      <div className="w-max">
        <Chip
          variant="ghost"
          size="sm"
          value={online ? "online" : "offline"}
          color={online ? "green" : "blue-gray"}
        />
      </div>
    </td> */}
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {new Date(created_at).toDateString()}
        </Typography>
      </td>
   
    </>
  );
};

export default UserRowCells;
