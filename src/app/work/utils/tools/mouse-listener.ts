export class MouseListener {
  private _isClicked: boolean = false;
  private _isHovering: boolean = false;

  private target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;

    target.addEventListener("mousedown", () => {
      this._isClicked = true;
    });
    target.addEventListener("mouseup", () => {
      this._isClicked = false;
    });
    target.addEventListener("mouseenter", () => {
      this._isHovering = true;
    });
    target.addEventListener("mouseleave", () => {
      this._isHovering = false;
    });
  }

  get currentClick(): "l" | "r" {
    return "l";
  }

  get isClicked(): boolean {
    return this._isClicked;
  }

  get isHovering(): boolean {
    return this._isHovering;
  }
}
