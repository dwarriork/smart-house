import React, { useState } from "react";

export default function SelectItems(props) {
  const [selectedItem, setSelectedItem] = useState(null);

  const setItem = item => {
    setSelectedItem(item);
  };

  const newItem = () => {
    props.addItem(selectedItem);
    props.setShowItems(!props.showItems);
  };

  const items = ["Choose item", "Air conditioner", "Stereo", "Lamp", "Boiler"];
  const itemOptions = items.map(item => (
    <option style={{ fontWeight: "bold" }} key={item} value={item}>
      {item}
    </option>
  ));

  return (
    <div className="selectItem">
      <select
        style={{
          backgroundColor: "orange",
          opacity: "0.8",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px"
        }}
        onChange={e => setItem(e.target.value)}
      >
        {itemOptions}
      </select>
      <button style={{borderRadius:"10px",backgroundColor:"gray"}} onClick={newItem}>Add</button>
    </div>
  );
}
