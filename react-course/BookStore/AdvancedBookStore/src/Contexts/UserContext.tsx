import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { auth, db, googleProvider } from "../Config/fireBase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc,updateDoc } from "firebase/firestore";
import type {User as FirebaseUser, User} from "firebase/auth";
import { useBooks, type Book } from "./BooksContext";
import { deliveryOptions } from "../deliveryOptions";
import { increment } from "firebase/firestore";

// ------------------ TYPES ------------------
export interface BookCartType {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  price: number;
  disprice: number;
  image: string;
  keyWords: string[];
  categorie: string;
  quantity: number;

   
}

export interface CartType{
  books : BookCartType[];
    deliveryOption : {
    id : string;
    name : string;
    delayDays : number;
    price : number;
   
  }
}


export interface OrderType {
  order : CartType;
  orderDate: string;
  price: number;
  orderId: string;
  status : string;
}

export interface UserType {
  id: string;
  name: string;
  email: string | null;
  cart: CartType;
  orders: OrderType[];
  role: string;
  dateCreation: string;
}

interface UserContextType {
  user: UserType | null;
  userData: UserType | null;
  initializing: boolean;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  SignInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  addToCart : (book : Book, setMsg : (msg: { show: boolean; text: string; color: string }) => void) => void;
  loadingUsers : boolean;
  users : UserType[];
  setUsers : (users : UserType[]) => void;
  
}


const UserContext = createContext<UserContextType | null>(null);


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const {books, setBooks} = useBooks();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  

  
  const SignInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const signedInUser = result.user;

      const userRef = doc(db, "users", signedInUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        const newUser: UserType = {
          id: signedInUser.uid,
          name: signedInUser.displayName || "",
          email: signedInUser.email,
          cart: {
            books : [],
            deliveryOption : deliveryOptions[0]
          },
          orders: [],
          dateCreation: new Date().toISOString(),
          role: "user",
        };

        await setDoc(userRef, newUser);
        setUser(newUser);
        setUserData(newUser);
        console.log("User added with success");
      } else {
        const existingUser = docSnap.data() as UserType;
        setUser(existingUser);
        setUserData(existingUser);
      }
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const firestoreUser = docSnap.data() as UserType;
          setUser(firestoreUser);
          setUserData(firestoreUser);
          
        } else {
          setUser(null);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);


  const addToCart = async (book : Book, setMsg :(msg : {show : boolean, text : string, color : string})=> void) => {

    

    if(!user){
      return;
    }

    if(book.stock === 0){
      return;
    }
    const findBook = user?.cart.books.find((b)=> b.id === book.id);

    if(findBook){
      setMsg({
        show : true,
        color  : "red",
        text : "Already in cart"

      });

      setTimeout(()=>{
       setMsg({
        show : false,
        text : "",
        color: "red"
       })
      }, 1500);
    }else{

      const newBook : BookCartType = {
         ...book,
         quantity : 1,
         
        
      }

 const updatedUser = {
  ...user,
  cart: {
          ...user.cart,
          books : [...user.cart.books, newBook]
        }
};





      const userRef = doc(db, "users", user.id);

      await updateDoc(userRef, {
        cart : {
          ...user.cart,
          books : [...user.cart.books, newBook]
        }
      });

      const newBooks = books.map((b)=>{
        if(b.id === book.id){
          return{
            ...b,
            stock : b.stock - 1
          }
        }

        return b;
      });

      setBooks(newBooks);

      const bookRef = doc(db, "books", book.id);

      await updateDoc(bookRef, {
        stock : increment(-1)
      });
      setUser(updatedUser);

      setMsg({
        show : true,
        color : "green",
        text : "✓ Added"
      });

      setTimeout(()=>{
                 setMsg({
                show : false,
                text : "",
                color: "red"
              })

      }, 1500);

      console.log(user);
       
    }
  }

  
  const getUsersFromFireStore = async() => {

    const usersCollectionRef = collection(db, "users");

    setLoadingUsers(true);
    try{
        const data = await getDocs(usersCollectionRef);

        const filteredData : UserType[] = data.docs.map((doc)=>{
          return{
            ...(doc.data() as UserType)
          }
        });

        console.log(filteredData);
        setUsers(filteredData);
    }catch(err){
      console.error('Error in getting users from fireStore : ', err);
    }finally{
      setLoadingUsers(false);
    }

  }

  useEffect(()=>{
    getUsersFromFireStore();
  }, []);


  return (
    <UserContext.Provider
      value={{ user, userData, initializing, loading, setUser, SignInWithGoogle, logOut, addToCart, users, loadingUsers, setUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ------------------ HOOK ------------------
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
