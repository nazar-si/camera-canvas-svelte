
<script lang="ts">
  import Canv, { type p5 } from "p5-svelte";
  import type { Sketch } from "p5-svelte";
  import type { p5 as p5type } from "p5-svelte";
  import { listen } from "svelte/internal";
  export let width: number;
  export let height: number;
  export let hideGrid = false;
  export let gridSize = 32;
  let visualGrid = gridSize;
  export let gridResizeFactor = 4;
  export let gridAutoResize = false;
  export let minGridSize = 8;
  export let X: number = 0;
  export let Y: number = 0;
  export let scale: number = 1;
  export let update: (cx: cx) => any = () => {};
  export let minScale = 1 / 2 ** 4;
  export let maxScale = 2;
  export let init = () => {};
  export let backgroundColor: string | [number | number | number] = "#fff";
  export let mouseClicked: (e: PointerEvent, cx: cx) => any = () => {};
  export let doubleClicked: (e: MouseEvent, cx: cx) => any = () => {};
  export let rightMousePressed: (e: PointerEvent, cx: cx) => any = () => {};
  export let leftMousePressed: (e: PointerEvent, cx: cx) => any = () => {};
  export let mousePressed: (e: PointerEvent, cx: cx) => any = () => {};
  export let mouseReleased: (e: PointerEvent, cx: cx) => any = () => {};
  export let minX = -1000;
  export let minY = -1000;
  export let maxX = 1000;
  export let maxY = 1000;
  export let hideBoudary = false;
  let className = "";
  export { className as class };
  let scaleBuff = scale;

  let startScale = 1;
  let startX = 0;
  let startY = 0;
  let startDrag = false;
  let startMouseX = 0;
  let startMouseY = 0;

  class cx {
    p5: p5type;
    POINTS: number;
    LINES: number;
    TRIANGLES: number;
    TRIANGLE_FAN: number;
    TRIANGLE_STRIP: number;
    QUADS: "quads";
    QUAD_STRIP: "quad_strip";
    CLOSE: "close";
    PI: number;
    TAU: number;
    HPI: number;
    DEGREES: "degrees";
    RADIANS: "radians";
    mouseX: number;
    mouseY: number;
    mx: number;
    my: number;
    mouseOutside: boolean;

    constructor(p5: p5type) {
      this.p5 = p5;
      this.POINTS = p5.POINTS;
      this.LINES = p5.LINES;
      this.TRIANGLES = p5.TRIANGLES;
      this.TRIANGLE_FAN = p5.TRIANGLE_FAN;
      this.TRIANGLE_STRIP = p5.TRIANGLE_STRIP;
      this.QUADS = p5.QUADS;
      this.QUAD_STRIP = p5.QUAD_STRIP;
      this.CLOSE = p5.CLOSE;
      this.PI = p5.PI;
      this.TAU = p5.TAU;
      this.HPI = p5.HALF_PI;
      this.DEGREES = p5.DEGREES;
      this.RADIANS = p5.RADIANS;
      this.mouseX = 0;
      this.mouseY = 0;
      this.mx = 0;
      this.my = 0;
      this.mouseOutside = false;
    }
    stroke(...args: Parameters<typeof this.p5.stroke>): void {
      this.p5.stroke(...args);
    }
    noStroke() {
      this.p5.noStroke();
    }
    noFill() {
      this.p5.noFill();
    }
    uvx(x: number): number {
      return (x - X) * scale * gridSize;
    }
    uvy(y: number): number {
      return (y - Y) * scale * gridSize;
    }
    uv(c: number): number {
      return c * scale * gridSize;
    }
    inx(x: number): number {
      return x / (scale * gridSize) + X;
    }
    iny(y: number): number {
      return y / (scale * gridSize) + Y;
    }
    in(c: number): number {
      return c / (scale * gridSize);
    }
    strokeWeight(c: number, relative = false): void {
      this.p5.strokeWeight(relative ? this.uv(c) : c);
    }
    fill(...args: Parameters<typeof this.p5.fill>): void {
      this.p5.fill(...args);
    }
    setDash(line: number, gap: number) {
      this.p5.drawingContext.setLineDash([line, gap]);
    }
    resetDash() {
      this.p5.drawingContext.setLineDash([]);
    }
    setShadow(x: number, y: number, blur: number, color: string) {
      this.p5.drawingContext.shadowOffsetX = x;
      this.p5.drawingContext.shadowOffsetY = y;
      this.p5.drawingContext.shadowBlur = blur;
      this.p5.drawingContext.shadowColor = color;
    }
    resetShadow() {
      this.p5.drawingContext.shadowOffsetX = 0;
      this.p5.drawingContext.shadowOffsetY = 0;
      this.p5.drawingContext.shadowBlur = 0;
      this.p5.drawingContext.shadowColor = "#0000";
    }
    pop() {
      this.p5.pop();
    }
    push() {
      this.p5.push();
    }
    translate(x: number, y: number) {
      this.p5.translate(this.uv(x), this.uv(y));
    }
    line(x1: number, y1: number, x2: number, y2: number): void {
      this.p5.line(this.uvx(x1), this.uvy(y1), this.uvx(x2), this.uvy(y2));
    }
    rect(
      x: number,
      y: number,
      w: number,
      h: number | undefined = undefined,
      r = 0,
      tr = 0,
      br = 0,
      bl = 0
    ) {
      this.p5.rect(
        this.uvx(x),
        this.uvy(y),
        this.uv(w),
        this.uv(h ? h : w),
        this.uv(r),
        ...(bl ? [this.uv(tr), this.uv(br), this.uv(bl)] : [])
      );
    }
    rectDetail(
      x: number,
      y: number,
      w: number,
      h: number,
      detailX: number,
      detailY: number
    ) {
      this.p5.rect(
        this.uvx(x),
        this.uvy(y),
        this.uv(w),
        this.uv(h),
        detailX,
        detailY
      );
    }
    ellipse(
      x: number,
      y: number,
      w: number,
      h: number | undefined = undefined,
      detail: number | undefined = undefined
    ) {
      this.p5.ellipse(
        this.uvx(x),
        this.uvy(y),
        this.uv(w),
        this.uv(h ? h : w),
        detail
      );
    }
    arc(
      x: number,
      y: number,
      w: number,
      h: number,
      start: number,
      stop: number,
      ...args: any
    ) {
      this.p5.arc(
        this.uvx(x),
        this.uvy(y),
        this.uv(w),
        this.uv(h),
        start,
        stop,
        ...args
      );
    }
    circle(x: number, y: number, d: number) {
      this.p5.circle(this.uvx(x), this.uvy(y), this.uv(d));
    }
    point(x: number, y: number) {
      this.p5.point(this.uvx(x), this.uvy(y));
    }
    quad(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ) {
      this.p5.quad(
        this.uvx(x1),
        this.uvy(y1),
        this.uvx(x2),
        this.uvy(y2),
        this.uvx(x3),
        this.uvy(y3),
        this.uvx(x4),
        this.uvy(y4)
      );
    }
    bezier(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ) {
      this.p5.bezier(
        this.uvx(x1),
        this.uvy(y1),
        this.uvx(x2),
        this.uvy(y2),
        this.uvx(x3),
        this.uvy(y3),
        this.uvx(x4),
        this.uvy(y4)
      );
    }
    curve(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ) {
      this.p5.curve(
        this.uvx(x1),
        this.uvy(y1),
        this.uvx(x2),
        this.uvy(y2),
        this.uvx(x3),
        this.uvy(y3),
        this.uvx(x4),
        this.uvy(y4)
      );
    }
    bezierDetail(detail: number) {
      this.p5.bezierDetail(detail);
    }
    bezierPoint(...args: Parameters<typeof this.p5.bezierPoint>) {
      this.p5.bezierPoint(...args);
    }
    curvePoint(...args: Parameters<typeof this.p5.curvePoint>) {
      this.p5.curvePoint(...args);
    }
    bezierTangent(...args: Parameters<typeof this.p5.bezierTangent>) {
      this.p5.bezierTangent(...args);
    }
    triangle(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ) {
      this.p5.triangle(
        this.uvx(x1),
        this.uvy(y1),
        this.uvx(x2),
        this.uvy(y2),
        this.uvx(x3),
        this.uvy(y3)
      );
    }
    square(x: number, y: number, s: number, r = 0, tr = 0, br = 0, bl = 0) {
      this.p5.square(
        this.uvx(x),
        this.uvy(y),
        this.uv(s),
        this.uv(r),
        ...(bl ? [this.uv(tr), this.uv(br), this.uv(bl)] : [])
      );
    }
    beginContour() {
      this.p5.beginContour();
    }
    beginShape(...args: Parameters<typeof this.p5.beginShape>) {
      this.p5.beginShape(...args);
    }
    bezierVertex(
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ) {
      this.p5.bezierVertex(
        this.uvx(x2),
        this.uvy(y2),
        this.uvx(x3),
        this.uvy(y3),
        this.uvx(x4),
        this.uvy(y4)
      );
    }
    quadraticVertex(cx: number, cy: number, x3: number, y3: number) {
      this.p5.quadraticVertex(
        this.uvx(cx),
        this.uvy(cy),
        this.uvx(x3),
        this.uvy(y3)
      );
    }
    vertex(x: number, y: number) {
      this.p5.vertex(this.uvx(x), this.uvy(y));
    }
    curveVertex(x: number, y: number) {
      this.p5.curveVertex(this.uvx(x), this.uvy(y));
    }
    endContour() {
      this.p5.endContour();
    }
    endShape(...args: Parameters<typeof this.p5.endShape>) {
      this.p5.endShape(...args);
    }
    noise(...args: Parameters<typeof this.p5.noise>) {
      return this.p5.noise(...args);
    }
    noiseDetail(...args: Parameters<typeof this.p5.noiseDetail>) {
      return this.p5.noiseDetail(...args);
    }
    noiseSeed(...args: Parameters<typeof this.p5.noiseSeed>) {
      return this.p5.noiseSeed(...args);
    }
    bounded(x: number, min: number, max: number): boolean {
      return x >= min && x <= max;
    }
    bound(x: number, min: number, max: number): number {
      return Math.min(Math.max(x, min), max);
    }
    region(
      x: number,
      y: number,
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ): boolean {
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
    rectBounded(
      x: number,
      y: number,
      x0: number,
      y0: number,
      w: number,
      h: number
    ): boolean {
      return x >= x0 && x <= x0 + w && y >= y0 && y <= y0 + h;
    }
    boundedMouseX(min: number, max: number): boolean {
      return this.bounded(this.mx, min, max);
    }
    boundedMouseY(min: number, max: number): boolean {
      return this.bounded(this.my, min, max);
    }
    regionMouse(
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ): boolean {
      return this.region(this.mx, this.my, minX, minY, maxX, maxY);
    }
    rectMouse(x: number, y: number, w: number, h: number): boolean {
      return this.region(this.mx, this.my, x, y, x + w, y + h);
    }
    distance(x1: number, y1: number, x2: number, y2: number): number {
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }
    radius(d: number, x1: number, y1: number, x2: number, y2: number): boolean {
      return this.distance(x1, y1, x2, y2) <= d;
    }
    radiusMouse(d: number, x: number, y: number): boolean {
      return this.radius(d, x, y, this.mx, this.my);
    }
    distanceMouse(x: number, y: number): number {
      return this.distance(x, y, this.mx, this.my);
    }
    color(...args): typeof this.p5.color {
      return this.p5.color(...args);
    }
    lerpColor(from, to, value): typeof this.p5.lerpColor {
      return this.p5.lerpColor(from, to, value);
    }
    text(str: string | number | boolean | object | any[], x:number, y:number, x2?:number, y2?:number) {
      this.p5.text(str, this.uvx(x), this.uvy(y), !isNaN(x2)?this.uvx(x2):undefined, !isNaN(y2)?this.uvy(y2):undefined);
    }
    textSize(theSize:number, minScreenSize?: number, maxScreenSize?: number){
      let size = this.uv(theSize);
      if (maxScreenSize && maxScreenSize < size) size = maxScreenSize 
      if (minScreenSize && minScreenSize > size) size = minScreenSize 
      this.p5.textSize(size);
    }
  }
  
  const sketch: Sketch = (p5: p5type) => {
    p5.setup = () => {
      p5.createCanvas(width, height);
      init();
    };
    let c: cx = new cx(p5);
    p5.draw = () => {
      if (typeof backgroundColor === "string") p5.background(backgroundColor);
      else p5.background(...backgroundColor);
      p5.translate(p5.width / 2, p5.height / 2);
      c.resetDash();
      c.resetShadow();

      scale = scale + (scaleBuff - scale) * 0.2;
      c.mouseX = p5.mouseX - p5.width / 2;
      c.mouseY = p5.mouseY - p5.width / 2;
      c.mx = c.inx(p5.mouseX - p5.width / 2);
      c.my = c.iny(p5.mouseY - p5.height / 2);
      if (startDrag) {
        let x = c.in(c.mouseX - startMouseX);
        let y = c.in(c.mouseY - startMouseY);
        X = startX - x;
        Y = startY - y;
      }
      X = Math.min(Math.max(X, minX), maxX);
      Y = Math.min(Math.max(Y, minY), maxY);
      let ty = Math.max(c.iny(-p5.height / 2), minY);
      let by = Math.min(c.iny(p5.height / 2), maxY);
      let lx = Math.max(c.inx(-p5.width / 2), minX);
      let rx = Math.min(c.inx(p5.width / 2), maxX);
      if (!hideGrid) {
        if (gridAutoResize)
          visualGrid =
            Math.max(
              1,
              gridResizeFactor **
                Math.ceil(-Math.log(scale) / Math.log(gridResizeFactor))
            ) * gridSize;
        if (gridSize * scale < minGridSize) visualGrid = minGridSize / scale;
        let sw = p5.width / (visualGrid * scale);
        let sh = p5.height / (visualGrid * scale);
        let rel = visualGrid / gridSize;
        let dx = Math.floor(X / rel);
        let dy = Math.floor(Y / rel);

        p5.stroke(128, 50);
        p5.strokeWeight(2);
        for (let i = Math.ceil(-sw / 2); i < sw / 2 + 1; i++) {
          if (!c.bounded(c.inx((i + dx) * rel), c.inx(minX), c.inx(maxX)))
            continue;
          c.line((i + dx) * rel, ty, (i + dx) * rel, by);
        }
        for (let i = Math.ceil(-sh / 2); i < sh / 2 + 1; i++) {
          if (!c.bounded(c.iny((i + dy) * rel), c.iny(minY), c.iny(maxY)))
            continue;
          c.line(lx, (i + dy) * rel, rx, (i + dy) * rel);
        }
        visualGrid = gridSize;
      }
      if (!hideBoudary) {
        p5.stroke(128, 60);
        p5.strokeWeight(3);
        p5.noFill();
        c.rect(minX, minY, maxX - minX, maxY - minY);
      }
      c.mouseOutside =
        c.mouseX < -p5.width / 2 ||
        c.mouseX > p5.width / 2 ||
        c.mouseY < -p5.height / 2 ||
        c.mouseY > p5.height / 2;

      p5.noStroke();
      p5.fill(255);
      update(c);
    };
    p5.mouseWheel = (e: WheelEvent) => {
      if (c.mouseOutside) return;
      let wheel = Math.max(Math.min(-e.deltaY, 1), -1);
      scaleBuff *= 2 ** (wheel / 2);
      scaleBuff = Math.max(Math.min(maxScale, scaleBuff), minScale);
    };
    p5.mousePressed = (e: PointerEvent) => {
      if (c.mouseOutside) return;
      if (e.button == 2) {
        startScale = scale;
        startX = X;
        startY = Y;
        startMouseX = c.mouseX;
        startMouseY = c.mouseY;
        startDrag = true;
      }
      mousePressed(e, c);
      if (e.button == 2) {
        rightMousePressed(e, c);
      }
      if (e.button == 0) {
        leftMousePressed(e, c);
      }
    };
    p5.mouseClicked = (e: PointerEvent) => {
      if (c.mouseOutside) return;
      mouseClicked(e, c);
    };
    p5.doubleClicked = (e: MouseEvent) => {
      if (c.mouseOutside) return;
      doubleClicked(e, c);
    };
    p5.mouseReleased = (e: PointerEvent) => {
      if (e.button == 2) {
        startDrag = false;
      }
      mouseReleased(e, c);
    };
    p5.windowResized = (e) => {
      p5.resizeCanvas(width, height);
    };
  };
</script>

<div
  on:contextmenu={(e) => e.preventDefault()}
  on:wheel={(e) => e.preventDefault()}
  class={className}
>
  <Canv {sketch} />
</div>
