import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SelectItems from "./SelectItems";
import ItemList from "./ItemList";

export default function Room(props) {
  const [showItems, setShowItems] = useState(false);

  const show = () => {
    if (showItems)
      return (
        <div>
          <SelectItems
            showItems={showItems}
            setShowItems={setShowItems}
            addItem={props.addItem}
          />
        </div>
      );
  };

  return (
    <div className="currentRoom">
      <div className="roomDetails">
        <h2 style={{ color: "white" }}>{props.currentRoom.type}</h2>
        <h2 style={{ color: "white" }}>{props.currentRoom.name}</h2>
      </div>
      <div className="addItemButton">
        <button
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            fontSize: "25px",
            backgroundColor: "orange"
          }}
          onClick={() => setShowItems(!showItems)}
        >
          Add Item
        </button>
      </div>
      <div>{show()}</div>
      <div>
        {props.currentRoom.items.map((item, index) => {
          return (
            <ItemList
              removeItem={props.removeItem}
              activateItem={props.activateItem}
              index={index}
              showItems={showItems}
              item={item}
              key={uuidv4()}
            />
          );
        })}
      </div>
    </div>
  );
}
