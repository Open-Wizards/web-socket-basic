// emit.js
import { socket } from "./socket";

export const test = () => {
	socket.emit("test");
};

//  any component can import test() and call it to emit a test event