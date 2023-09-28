export default {
  directByBlockEvent: function (event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  },
  directByCapture: function (el: Element): void {
    el.addEventListener("click", e => this.directByBlockEvent(e));
  },
};
