import React from "react";
import { useCartContext } from "../Contexts/CartContext";
import { useOrderContext } from "../Contexts/OrderContext";
export default function PayementSummary({setMsg}){

    const {cart, calculateTotalCost,calculateHandling,totalBeforeTax, calculateTax, calculateOrderTotal} = useCartContext();

    const {addOrder} = useOrderContext();
        function calculateQuantity(){

        let quantity = 0;

        cart.forEach((item)=>{
            quantity += Number(item.quantite);
        });

        return quantity;
    }

    const quantity = calculateQuantity();

    return(

        <div className="p-5 border border-gray-300 rounded-s w-[350px] h-[335px] flex flex-col max-[765px]:w-[330px] max-[400px]:w-[320px]">
            <h1 className="text-[1.1em] font-bold">Payment Summary</h1>
            <div className="flex flex-col text-gray-950">
                <div className="flex flex-row mt-3 w-full justify-between items-center">
                    <p className="text-[15px]">Items({quantity}):</p>
                    <p>{calculateTotalCost().toFixed(2)}Dzd</p>
                </div>

                <div className="flex flex-row mt-1 w-full justify-between items-center">
                    <p className="text-[15px]">Shipping & handling:</p>
                    <p>{calculateHandling().toFixed(2)}Dzd</p>
                </div>
            </div>

            <div className="flex flex-col text-gray-950">
                <div className="flex flex-row mt-[10px] w-full justify-between items-center">
                    <p className="text-[15px]">Total before tax:</p>
                    <p className="border-t-1 border-t-gray-300 pt-[10px]">{totalBeforeTax().toFixed(2)}Dzd</p>
                </div>

                <div className="flex flex-row mt-1 w-full justify-between items-center">
                    <p className="text-[15px]">Estimated tax (10%):</p>
                    <p>{calculateTax().toFixed(2)}Dzd</p>
                </div>
            </div>

            
                <div className="flex flex-row justify-between w-full border-t-1 border-t-gray-300 pt-4 mt-3">
                    <p className="text-yellow-600 font-bold text-[18px]">Order total:</p>
                    <p className="text-yellow-600 font-bold text-[18px]">{calculateOrderTotal().toFixed(2)}Dzd</p>
                </div>
            

            <button className="mt-5 bg-yellow-600 text-white h-[40px] rounded-[7px] font-bold cursor-pointer transition-opacity hover:opacity-70 active:opacity-50" onClick={()=>{
                addOrder(cart)
                setMsg(true)

                setTimeout(()=>{
                    setMsg(false);
                }, 1500)
            }}>Place your order</button>
        </div>
    )
}