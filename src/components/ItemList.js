import React from "react";

export default function ItemList(props) {
  const execute = () => {
    props.activateItem(props.index, props.item.name);
  };

  const remove = () => {
    props.removeItem(props.index);
  };

  return (
    <div className="currentItems">
      <button style={{backgroundColor:props.item.color,borderRadius:"10px"}} onClick={execute}>{props.item.name}</button>
      <button style={{borderRadius:"10px",backgroundColor:"orange"}} onClick={remove}>X</button>
    </div>
  );
}
