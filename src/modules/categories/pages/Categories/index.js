import useLocalStorage from "../../../../hooks/useLocalStorage";
import CategoryDataTable from "../../components/CategoryDataTable";
import CategorySideBar from "../../components/CategoySideBar";

export default function (){
  const [state, setState] = useLocalStorage('productsOpenSlidbar', true);

    return <div>
       <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <CategorySideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      
      <div className={state ? "col-span-8" : "col-span-10"}>
        <CategoryDataTable />
      </div>
    </div>
    </div>;
}