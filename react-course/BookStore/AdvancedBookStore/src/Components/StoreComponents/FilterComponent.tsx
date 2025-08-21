import { memo } from "react"
import { useFilter } from "../../Contexts/FilterContext";
import { useNavigate } from "react-router-dom";


const FilterComponent = () => {

    const {categorie, setCategorie} = useFilter();
    const navigate = useNavigate();

    const SearchCategorie = () => {

        if(!categorie || categorie === "") return;

        navigate("/filter");
    }

    return(
        <div className="flex flex-row justify-center items-center gap-2 mt-7 mb-5">
             <select 
             name="" 
             id="" 
             onChange={(e : React.ChangeEvent<HTMLSelectElement>)=> setCategorie(e.target.value)}
             className="w-[150px] border-2 px-3 py-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-400">
                <option value="">Categories</option>
                <option value="fiction">Fiction</option>
                <option value="history">History</option>
                <option value="literature">Literature</option>
                <option value="biographies">Biographies</option>
                <option value="developement">Developement</option>
                <option value="education">Education</option>
                <option value="science">Science</option>
                <option value="business">Business and Economics</option>
                <option value="children">Children</option>
             </select>

             <button className="w-[90px] h-[38px] font-bold text-white bg-blue-500 rounded-lg cursor-pointer transition-color duration-200 hover:bg-white hover:text-blue-500 border border-blue-500" onClick={SearchCategorie}>Filter</button>
        </div>
    )
}

export default memo(FilterComponent);