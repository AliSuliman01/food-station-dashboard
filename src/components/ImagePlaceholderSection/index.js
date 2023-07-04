import { Typography } from "@material-tailwind/react"
import { BanknotesIcon } from "@heroicons/react/24/solid";

export default () => {
    return (
        <div className="grid place-items-center py-8 px-4 text-center bg-main ">
        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
          <BanknotesIcon className="h-10 w-10" />
        </div>
        <Typography variant="h4" color="white">
          Upload Photo
        </Typography>
      </div>
    )
}