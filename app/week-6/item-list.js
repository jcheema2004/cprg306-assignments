"use client";

import Item from "./item";
import items from "./items.json"; 
import { useState } from "react";

export default function ItemList() {
  
  
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItemsArray = [...items].sort((a,b) => {

    if ( sortBy === "name") {
      return a.name.localeCompare(b.name);
    }else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;

  });

  const groupedItemsArray = items.reduce((accumulator, item) => {

    const category = item.category;
    if ( !accumulator[category] ) {
      accumulator[category] = [];
    }
    accumulator[category].push(item);
    return accumulator;

  }, {});

  Object.keys(groupedItemsArray).forEach(category => {
    groupedItemsArray[category].sort((a,b) => a.name.localeCompare(b.name));
  });
  const sortedCategories = Object.keys(groupedItemsArray).sort();


  return (
    <main>
      <div className="mb-4 flex items-center">
        <span className="text-white mr-2">Sort by: </span>
        {/* <div> */}
          <button type="button" className={`px-4 py-2 mr-2 rounded ${sortBy === "name" && !groupByCategory ? "bg-blue-500" : "bg-gray-500"} text-white`} onClick={() => {setSortBy("name"); setGroupByCategory(false);}}>Name</button>
          <button type="button" className={`px-4 py-2 mr-2 rounded ${sortBy === "category" && !groupByCategory ? "bg-blue-500" : "bg-gray-500"} text-white`} onClick={() => {setSortBy("category"); setGroupByCategory(false);}}>Category</button>
          <button type="button" className={`px-4 py-2 rounded ${groupByCategory ? "bg-blue-500" : "bg-gray-500"} text-white`} onClick={() => setGroupByCategory(true)}>Grouped Category</button>
        {/* </div> */}
      </div>

      {groupByCategory ? (
        <div>
          {sortedCategories.map(category => (
            <div key={category} className="mb-6">
              <h2 className="text-xl font-bold text-white capitalize mb-2">{category}</h2>
              <ul>
                {groupedItemsArray[category].map((item) => (
                  <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                ))}
              </ul>
            </div>
          ))}
        </div>
       ) : (
      <ul>
        {sortedItemsArray.map((item) => (
          <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
        ))}
      </ul>
       )}
    </main>
  );
}
