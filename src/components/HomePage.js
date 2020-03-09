import React from "react";
import RoomList from "./RoomList";
import { Link } from "react-router-dom";

export default function HomePage(props) {
  return (
    <div className="home">
      {props.rooms.map((room, index) => {
        return (
          <RoomList
            removeRoom={props.removeRoom}
            index={index}
            updateRoom={props.updateRoom}
            name={room.name}
            color={room.color}
            id={room.key}
            key={room.key}
          />
        );
      })}
      <div>
        <Link to="/create-room">
          <button className="createRoom">+</button>
        </Link>
      </div>
    </div>
  );
}
