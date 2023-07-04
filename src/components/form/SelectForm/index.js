import { Option, Select, Typography } from "@material-tailwind/react";

export default ({ label, value, onSelect, options }) => {
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
        label={label}
        value={value}
        onSelect={onSelect}
      >
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
