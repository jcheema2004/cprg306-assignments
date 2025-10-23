import Item from "./item";
import ItemList from "./item-list";

export default function Page(){


    return(
        <main className="bg-slate-950 __className__ p-4">
            <h1 className="text-3xl text-white font-bold m-2">Shopping List</h1>
            <ItemList />
        </main>
    )
}