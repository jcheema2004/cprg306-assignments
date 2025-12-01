"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import { useState } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const router = useRouter();

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

  if (!user) {
    return (
      <main className="bg-slate-950 min-h-screen p-4 text-white">
        <p>Must be logged in to view this page!</p>
      </main>
    );
  }

  return (
    <main className="bg-slate-950 min-h-screen p-4 flex flex-row items-start gap-4 overflow-x-auto">
      <div className="w-[420px] flex flex-col flex-shrink-0">
        {/* <h1 className="text-3xl text-white font-bold m-2">Shopping List</h1> */}

        <div className="flex justify-between items-center m-2">
          <h1 className="text-3xl text-white font-bold">Shopping List</h1>
          <button
            onClick={firebaseSignOut}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>

          {/* <button
            onClick={async () => {
              await firebaseSignOut();
              router.push("/week-9"); // your login page
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button> */}
        </div>

        <NewItem onAddItem={handleAddItem} />

        <div className="mt-6">
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
      </div>
      <div className="w-[420px] flex-shrink-0">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
