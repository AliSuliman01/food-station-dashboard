import { Typography } from "@material-tailwind/react";
import Select from "react-select";



const MultiSelectForm = ({label, selectComponents, selectValue, selectOptions, selectOnChange}) => {

    return (
        
        <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-4 font-medium"
        >
          {label}
        </Typography>

        <Select
          closeMenuOnSelect={false}
          components={selectComponents}
          isMulti
          value={selectValue}
          options={selectOptions}
          onChange={selectOnChange}
        />
      </div>
    )
}

export default MultiSelectForm;