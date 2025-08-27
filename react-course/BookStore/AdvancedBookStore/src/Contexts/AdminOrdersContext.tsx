import { createContext, use, useContext, useEffect, useState } from "react";
import { useUser, type CartType, type OrderType } from "./UserContext";
import { collection, doc, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { db } from "../Config/fireBase";

export interface AdminOrders {
  userName: string;
  userId: string;
  order: OrderType;
  id: string;
  createdAt : Date;
}

interface AdminOrderContextType {
  adminOrders: AdminOrders[];
  setAdminOrders: (o: AdminOrders[]) => void;
  loadingAdminOrders: boolean;
  setLoadingAdminOrders: (s: boolean) => void;
}

const AdminOrdersContext = createContext<AdminOrderContextType | null>(null);

export const AdminOrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminOrders, setAdminOrders] = useState<AdminOrders[]>([]);
  const [loadingAdminOrders, setLoadingAdminOrders] = useState<boolean>(false);

  const {user, setUser} = useUser();
  useEffect(() => {
    const ordersCollectionRef = collection(db, "orders");

    setLoadingAdminOrders(true);

    // Écoute en temps réel
    const unsubscribe = onSnapshot(
      ordersCollectionRef,
      (snapshot) => {
        const updatedOrders: AdminOrders[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<AdminOrders, "id">),
          id: doc.id,

        }));

        setAdminOrders(updatedOrders);
        setLoadingAdminOrders(false);
      },
      (error) => {
        console.error("Error fetching admin orders:", error);
        setLoadingAdminOrders(false);
      }
    );

    return () => unsubscribe(); // cleanup
  }, []);


  useEffect(()=>{

    const updateAfterDelivering = async () => {

          if(!user) return null;
          const newOrders = user?.orders.filter((o)=> o.status !== "Delivered");

          const userRef = doc(db, "users", user.id);
          await updateDoc(userRef, {
            orders : [...newOrders]
          });

          setUser({
             ...user,
             orders : [...newOrders]
          });

          }

          updateAfterDelivering();
  }, [adminOrders]);
  return (
    <AdminOrdersContext.Provider
      value={{ adminOrders, setAdminOrders, loadingAdminOrders, setLoadingAdminOrders }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useAdminOrders = () => {
  const context = useContext(AdminOrdersContext);
  if (!context) throw new Error("Use the useAdminOrders inside the AdminOrdersProvider");
  return context;
};
