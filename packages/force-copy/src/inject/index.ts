import { MOUSE_DOWN, MOUSE_UP } from "copy/src/constant/event";
import { EVENTS_TYPE, EventBus } from "./utils/bus";

window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_TYPE.MOUSE_UP_BUBBLE, e));
window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_TYPE.MOUSE_DOWN_BUBBLE, e));
window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_TYPE.MOUSE_UP_CAPTURE, e), true);
window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, e), true);

console.log(111);
