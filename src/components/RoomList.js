import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function RoomList(props) {
  const updateRoom = () => {
    props.updateRoom(props.index);
  };

  const remove = () => {
    props.removeRoom(props.index);
  };
  return (
    <div className="rooms">
      <Link to="/Room">
        <button
          onClick={updateRoom}
          style={{
            backgroundColor: props.color,
            borderRadius: "10px",
            minWidth: "200px",
            maxWidth: "fit-content",
            height: "30px",
            marginBottom: "10px",
            fontSize: "20px",
            marginLeft:"10px"
          }}
          key={uuidv4()}
        >
          {props.name}
        </button>
      </Link>
      <div>
        <button
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            backgroundColor: "orange"    
          }}
          onClick={remove}
        >
          X
        </button>
      </div>
    </div>
  );
}
