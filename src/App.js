import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import HomePage from "./components/HomePage";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRooms = localStorage.getItem("smart-house");
    const storedCurrentRoom = localStorage.getItem("current-room");
    if (storedRooms) {
      setRooms(JSON.parse(storedRooms));
    }
    if (storedCurrentRoom) {
      setCurrentRoom(JSON.parse(storedCurrentRoom));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("smart-house", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("current-room", JSON.stringify(currentRoom));
  }, [currentRoom]);

  const addRoom = (name, color, type) => {
    if (name === "" || type === "") {
      return alert("ERROR");
    }
    setRooms(oldRooms => [
      ...oldRooms,
      {
        type: type,
        name: name,
        color: color,
        key: uuidv4(),
        items: []
      }
    ]);
  };

  const updateRoom = index => {
    setCurrentRoom(index);
  };

  const removeRoom = i => {
    const newRooms = rooms.filter((room, index) => index !== i);
    setRooms([...newRooms]);
  };

  const addItem = item => {
    if (item === null || item === "Choose item") {
      return;
    }
    const oldRoom = rooms[currentRoom];
    const newRoom = {
      ...oldRoom,
      items: [...oldRoom.items, { name: item, active: false, color: "red" }]
    };
    setRooms(
      rooms.map((room, index) => {
        if (currentRoom === index) {
          if (room.items.length >= 5) {
            alert("ERROR");
            return room;
          }
          if (item === "Boiler") {
            if (room.type === "Bathroom") {
              return newRoom;
            } else {
              alert("ERROR");
              return room;
            }
          }
          if (item === "Stereo") {
            let stereo = false;
            room.items.map(item => {
              if (item.name === "Stereo") {
                stereo = true;
              }
              return item;
            });
            if (stereo) {
              alert("ERROR");
              return room;
            }
            return newRoom;
          } else {
            return newRoom;
          }
        }
        return room;
      })
    );
  };

  const activateItem = (i, item) => {
    const oldRoom = rooms[currentRoom];
    const on = { name: item, active: true, color: "green" };
    const off = { name: item, active: false, color: "red" };
    const changeItem = oldRoom.items.map((item, index) => {
      if (index === i) {
        if (item.active) {
          return off;
        }
        return on;
      }
      return item;
    });
    const newRoom = { ...oldRoom, items: changeItem };
    setRooms(
      rooms.map((room, index) => {
        if (currentRoom === index) {
          return newRoom;
        }
        return room;
      })
    );
  };

  const removeItem = i => {
    const oldRoom = rooms[currentRoom];
    const newItems = oldRoom.items.filter((item, index) => index !== i);
    setRooms(
      rooms.map((room, index) => {
        if (currentRoom === index) {
          return { ...oldRoom, items: [...newItems] };
        }
        return room;
      })
    );
  };

  if (loading) {
    return <div />;
  }
  return (
    <div className="appOwner">
      <Router>
        <div className="App">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1
              style={{
                color: "white",
                backgroundColor: "orange",
                padding:"10px",
                borderRadius: "10px"
              }}
            >
              Smart House
            </h1>
          </div>
          <Link to="/">
            <button
              style={{
                backgroundColor: "gray",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "100px",
                height: "30px",
                fontSize: "20px"
              }}
            >
              Home
            </button>
          </Link>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <HomePage
                  {...props}
                  removeRoom={removeRoom}
                  updateRoom={updateRoom}
                  rooms={rooms}
                />
              )}
            />
            <Route
              exact
              path="/create-room"
              render={props => <CreateRoom {...props} addRoom={addRoom} />}
            />
            <Route
              exact
              path="/room"
              return
              render={props => (
                <Room
                  {...props}
                  removeItem={removeItem}
                  activateItem={activateItem}
                  setRooms={setRooms}
                  addItem={addItem}
                  currentRoom={rooms[currentRoom]}
                  rooms={rooms}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
