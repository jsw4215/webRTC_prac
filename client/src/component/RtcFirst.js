import React, { useState } from "react";
import {Link} from "react-router-dom";

function RtcFirst() {

const [name, setName] = useState('')
const [room, setRoom] = useState('')


  return (
    <div className="App">
      <div className="welcome">
        <form>
          <input
            className="roomName"
            type="text"
            placeholder="Room Name"
            onChange={(event) => setRoom(event.target.value)}
          >
          </input>
          <input
            className="nickname"
            type="text"
            placeholder="Your Nickname"
            onChange={(event) => setName(event.target.value)}
          >
          </input>
          <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/rtc?name=${name}&room=${room}`}
        >
          <button className={'button mt-20'} type='submit'>
            채팅방 입장
          </button>
        </Link>
        </form>
      </div>
    </div>
  )};
  
export default RtcFirst;