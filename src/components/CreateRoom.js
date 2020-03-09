import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateRoom(props) {
  const [room, setRoom] = useState({ name: "", color: "", type: "" });

  const addNewRoom = () => {
    props.addRoom(room.name, room.color, room.type);
  };

  const options = ["Room type", "Bedroom", "Bathroom", "Kitchen"];
  const addOption = options.map(option => {
    return (
      <option style={{ fontWeight: "bold" }} key={option} value={option}>
        {option}
      </option>
    );
  });

  const updateRoom = (key, value) => {
    setRoom({ ...room, [key]: value });
  };

  return (
    <div className="creationScreen">
      <select
        style={{
          backgroundColor: "orange",
          opacity:"0.8",
          marginBottom: "5px",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px"
        }}
        onChange={e => {
          updateRoom("type", e.target.value);
        }}
      >
        {addOption}
      </select>
      <input
        style={{
          marginBottom: "5px",
          backgroundColor:"orange",
          opacity:"0.8",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          paddingLeft: "3px"
        }}
        placeholder="Room name"
        onChange={e => {
          updateRoom("name", e.target.value);
        }}
        type="text"
      ></input>
      <input
        style={{
          marginBottom: "5px",
          backgroundColor:"orange",
          opacity:"0.8",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          paddingLeft: "3px"
        }}
        placeholder="Room color"
        onChange={e => {
          updateRoom("color", e.target.value);
        }}
        type="text"
      ></input>
      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            minWidth: "200px",
            minHeight: "30px",
            backgroundColor: "orange",
            borderRadius: "10px",
            fontSize: "20px"
          }}
          onClick={addNewRoom}
        >
          Add Room
        </button>
      </Link>
    </div>
  );
}
