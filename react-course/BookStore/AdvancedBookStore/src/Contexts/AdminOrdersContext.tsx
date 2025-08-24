import { createContext, useEffect, useState } from "react";
import type { OrderType } from "./UserContext";
import {collection, getDocs, deleteDoc, doc, deleteAllPersistentCacheIndexes} from "firebase/firestore";
import {db} from "../Config/fireBase"

export interface AdminOrders{
  
    name: string;
    orders : OrderType;
    id : string;
}

interface AdminOrderContextType{
    adminOrders : AdminOrders[],
    setAdminOrders : (o : AdminOrders[]) => void;
}

const AdminOrdersContext = createContext<AdminOrderContextType | null>(null);

export const AdminOrdersProvider = ({children} : {children : React.ReactNode}) => {

    const [adminOrders, setAdminOrders] = useState<AdminOrders[]>([]);

    const [loadingAdminOrders, setLoadingAdminOrders] = useState<boolean>(false);

    useEffect(()=>{

        const getOrdersFromFireBase = async() => {

            const ordersCollectionRef = collection(db, "orders");

            setLoadingAdminOrders(true);

            try{
                const data = await getDocs(ordersCollectionRef);

                const filteredData: AdminOrders[] = data.docs.map((doc) => ({
                    ...(doc.data() as Omit<AdminOrders, "id">),
                    id: doc.id,
                    }));

                setAdminOrders(filteredData);
                
                
            }

        }
    })
}