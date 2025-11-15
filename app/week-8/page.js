"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleaned = itemName
      .replace(/,.*|[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "")
      .trim()
      .toLowerCase();
    setSelectedItemName(cleaned);
  };

  return (
    <main className="bg-slate-950 min-h-screen p-4 flex flex-row items-start gap-4 overflow-x-auto">
      <div className="w-[420px] flex flex-col flex-shrink-0">
        <h1 className="text-3xl text-white font-bold m-2">Shopping List</h1>

        <NewItem onAddItem={handleAddItem} />

        <div className="mt-6">
            
             <ItemList items={items} onItemSelect={handleItemSelect}/>

        </div>
      </div>
      <div className="w-[420px] flex-shrink-0">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
