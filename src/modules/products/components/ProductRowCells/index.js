import { Avatar, Chip, Typography } from "@material-tailwind/react";
import { toImagePath } from "../../../../helpers/functions";

export default ({
  tableRow,
  classes,
}) => {
  const {
    id,
    price,
    translation,
    main_image:image,
    ingredients,
    restaurant,
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
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {restaurant?.name}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {price}
        </Typography>
      </td>
      <td className={classes}>
      <div className="flex flex-wrap w-56">
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              variant="ghost"
              size="sm"
              value={ingredient.translation.name}
              color="blue-gray"
              className="m-1"
            />
          ))}
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

