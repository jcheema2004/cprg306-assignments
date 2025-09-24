"use client";

import { use, useState } from "react";


export default function NewItem(){

    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        if(quantity < 20){
            setQuantity(quantity + 1);
        }
    }

    const decrement = () => {
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
    }

    const buttonStyles = "w-8 h-10 m-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed";

    return(
            <div className="bg-white rounded-xl p-2 flex items-center gap-1 shadow-lg">
                
                    <span className="text-3xl mx-4 min-w-[10px] text-center text-black mr-4">{quantity}</span>
                    
                        <button 
                            onClick={decrement} 
                            disabled={quantity <= 1}
                            className={buttonStyles}>
                                -
                        </button>
                        <button 
                            onClick={increment} 
                            disabled={quantity >= 20}
                            className={buttonStyles}>
                                +
                        </button>
                   
                
            </div>
        
    )
}