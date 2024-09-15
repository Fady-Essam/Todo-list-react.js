import { useState } from "react";
import Items from "./Items";

export default function PackingList({
  items,
  onDeleteItems,
  onClearItems,
  onToggleItems,
}) {
  const [sortby, setSortby] = useState("packed");
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  else if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Items
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Select by input order</option>
          <option value="description">Select by description</option>
          <option value="packed">Select by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}
