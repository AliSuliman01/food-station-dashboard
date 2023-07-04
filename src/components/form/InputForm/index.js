import { Input, Typography } from "@material-tailwind/react"

export default ({label,inputLabel,type="text", name, value, onChange}) =>{
    return (
        <div>
            {
                label && 
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-4 font-medium"
        >
          {label}
        </Typography>}
        <Input
          type={type}
          label={inputLabel}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    )
}