import ItemList from "./item-list";

export default function Item({name, quantity, category}){

    

    return(
        <li className="p-2 m-4 bg-slate-900 max-w-sm text-cyan-200 rounded-lg border border-cyan-700">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="text-sm"> Buy {quantity} in {category}</div>
        </li>
    )
}