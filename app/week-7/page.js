"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";

export default function Page(){

    const [items, setItems] = useState(itemsData);

    const handleAddItem = (newItem) => {

        setItems((prevItems) => [...prevItems, newItem]);
    }

    return(
        <main className="bg-slate-950 min-h-screen p-4">
            <h1 className="text-3xl text-white font-bold m-2">Shopping List</h1>
            
            <NewItem onAddItem={handleAddItem} />
            
            <ItemList items={items} />
        </main>
    )
}