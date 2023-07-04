import useLocalStorage from "../../../../hooks/useLocalStorage";




import ModelDataTable from "../../components/IngredientsDataTable";
import ModelSideBar from "../../components/IngredientSideBar";

export default function (){
  const [state, setState] = useLocalStorage(`ingredientsOpenSlidbar`, true);

    return <div>
       <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <ModelSideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      
      <div className={state ? "col-span-8" : "col-span-10"}>
        <ModelDataTable />
      </div>
    </div>
    </div>;
}