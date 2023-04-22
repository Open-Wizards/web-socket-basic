// socket.js
import io from "socket.io-client";
import { socketEvents } from "./events";

export const socket = io('http://localhost:5050/');

export const initSockets = ({ setValue }: any) => {
	socketEvents({ setValue });
};