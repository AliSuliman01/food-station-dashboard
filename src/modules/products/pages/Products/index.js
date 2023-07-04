import useLocalStorage from "../../../../hooks/useLocalStorage";
import ProductsDataTable from "../../components/ProductsDataTable";
import ProductSideBar from "../../components/ProductSideBar";

export default function (){
  const [state, setState] = useLocalStorage('productsOpenSlidbar', true);

    return <div>
       <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <ProductSideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      
      <div className={state ? "col-span-8" : "col-span-10"}>
        <ProductsDataTable />
      </div>
    </div>
    </div>;
}