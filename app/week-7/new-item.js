"use client";

import { useState } from "react";


export default function NewItem({onAddItem}){

    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState(""); //initialize name state
    const [category, setCategory] = useState("produce"); //initialize category state

    const handleSubmit = (event) => {
        event.preventDefault();//preventing default form submission behavior
        //logging item Object to console
        console.log({name, quantity, category});
        //reset form

        // let item = {
        //     name: name,
        //     quantity: quantity,
        //     category: category
        // }

        const newItem = {
            id : (typeof crypto !=="undefined" && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2,9),
            name: name.trim(),
            quantity: quantity,
            category: category
        }

        //calling parent handler 
        onAddItem(newItem);

        //Displaying an alert with current state values
        //alert(`Added Item: ${name}, quantity: ${quantity}, category: ${category}`);

        //resetting the state variables to their initial values
        setName("");
        setQuantity(1);
        setCategory("produce");

    }

    const handleNameChange = (event) => setName(event.target.value);
    //const handleQuantityChange = (event) => setQuantity(event.target.value);
    const handleCategoryChange = (event) => setCategory(event.target.value);
    

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

    const buttonStyles = "w-9 h-9 text-lg font-bold rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-colors shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75";
    

    return(
        //creating a form....
           <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-xl mx-auto p-8 w-[400px] flex flex-col gap-2 border border-gray-200" >
            <div>
                <h1 className="text-blue-950 font-semibold text-center mb-2">Add an Item</h1>
            </div>

            <div className="flex-1 min-w-[180px] bg-white rounded-2xl">
                <input 
                    type="text"  
                    value={name} //tied to name state variable and displays the current value of name state
                    onChange={handleNameChange} //updating name state on input change
                    className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
                    placeholder="Item Name"
                    required
                />
            </div>
            <div className="flex items-center justify-between gap-3">
                <div className="bg-white rounded-xl p-2 flex items-center gap-1 shadow-lg">
                
                    <span className="text-xl font-semibold text-gray-800 w-10 text-center" >{quantity}</span> 
                    
                        <button type="button"
                            onClick={decrement} 
                            disabled={quantity <= 1}
                            className={buttonStyles}>
                                -
                        </button>
                        <button type="button"
                            onClick={increment} 
                            disabled={quantity >= 20}
                            className={buttonStyles}>
                                +
                        </button>
                   
                
                </div>
                <div className="flex items-center justify-between gap-3 py-3 ">
                    <select 
                        value={category} 
                        onChange={handleCategoryChange} //updating category state on select change
                        className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                    >
                        <option value="" disabled>Category</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen foods">Frozen Foods</option>
                        <option value="canned goods">Canned Goods</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>
                </div>          
            </div>   
            <div>
                <button type="submit" className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    +
                </button>
            </div>
           </form>
        
    )
}