import {  useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/UserContext"
import { useEffect } from "react";


const HomeRedirect = () => {

    const {user} = useUser();
    const navigate = useNavigate();

    useEffect(()=> {
        if(user){
            if(user.role === "admin"){
                navigate("/admin/dashboard");

            }else{
                navigate("/");
            }
        }
    },[user, navigate]);

    return null;
}

export default HomeRedirect;