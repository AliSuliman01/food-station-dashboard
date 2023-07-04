import { useState } from "react";
import RestaurantSideBar from "../../components/RestaurantSideBar";
import RestaurantsDataTable from "../../components/RestaurantsDataTable";
import useLocalStorage from "../../../../hooks/useLocalStorage";

export default function () {
  const [state, setState] = useLocalStorage('restaurantsOpenSlidbar', true);
 
  return (
    <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <RestaurantSideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      
      <div className={state ? "col-span-8" : "col-span-10"}>
        <RestaurantsDataTable />
      </div>
    </div>
  );
}
