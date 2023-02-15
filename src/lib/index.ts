import Canvas from "./Canvas.svelte";
import type { p5 as p5type } from "p5-svelte";
export type cxType = {
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

    stroke(...args: Parameters<typeof this.p5.stroke>): void;
    noStroke: ()=>void;
    noFill();
    uvx(x: number): number 
    uvy(y: number): number 
    uv(c: number): number 
    inx(x: number): number 
    iny(y: number): number 
    in(c: number): number 
    strokeWeight(c: number, relative: boolean): void 
    fill(...args: Parameters<typeof this.p5.fill>): void 
    setDash(line: number, gap: number): void
    resetDash(): void
    setShadow(x: number, y: number, blur: number, color: string): void
    resetShadow(): void
    pop(): void
    push(): void
    translate(x: number, y: number): void
    line(x1: number, y1: number, x2: number, y2: number): void
    rect(
      x: number,
      y: number,
      w: number,
      h: number | undefined,
      r: number,
      tr: number,
      br: number,
      bl: number
    ): void 
    rectDetail(
      x: number,
      y: number,
      w: number,
      h: number,
      detailX: number,
      detailY: number
    ): void 
    ellipse(
      x: number,
      y: number,
      w: number,
      h: number | undefined,
      detail: number | undefined
    ): void 
    arc(
      x: number,
      y: number,
      w: number,
      h: number,
      start: number,
      stop: number,
      ...args: any
    ): void 
    circle(x: number, y: number, d: number): void
    point(x: number, y: number): void
    quad(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ): void 
    bezier(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ) : void 
    curve(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ): void 
    bezierDetail(detail: number)
    bezierPoint(...args: Parameters<typeof this.p5.bezierPoint>)
    curvePoint(...args: Parameters<typeof this.p5.curvePoint>)
    bezierTangent(...args: Parameters<typeof this.p5.bezierTangent>)
    triangle(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ): void 
    square(x: number, y: number, s: number, r: number, tr: number, br: number, bl: number): void 
    beginContour(): void 
    beginShape(...args: Parameters<typeof this.p5.beginShape>): void 
    bezierVertex(
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ): void 
    quadraticVertex(cx: number, cy: number, x3: number, y3: number): void 
    vertex(x: number, y: number): void 
    curveVertex(x: number, y: number): void 
    endContour(): void  
    endShape(...args: Parameters<typeof this.p5.endShape>): void  
    noise(...args: Parameters<typeof this.p5.noise>): void  
    noiseDetail(...args: Parameters<typeof this.p5.noiseDetail>): void  
    noiseSeed(...args: Parameters<typeof this.p5.noiseSeed>): void  
    bounded(x: number, min: number, max: number): boolean 
    bound(x: number, min: number, max: number): number 
    region(
      x: number,
      y: number,
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ): boolean
    rectBounded(
      x: number,
      y: number,
      x0: number,
      y0: number,
      w: number,
      h: number
    ): boolean
    boundedMouseX(min: number, max: number): boolean
    boundedMouseY(min: number, max: number): boolean
    regionMouse(
      minX: number,
      minY: number,
      maxX: number,
      maxY: number
    ): boolean
    rectMouse(x: number, y: number, w: number, h: number): boolean 
    distance(x1: number, y1: number, x2: number, y2: number): number
    radius(d: number, x1: number, y1: number, x2: number, y2: number): boolean 
    radiusMouse(d: number, x: number, y: number): boolean 
    distanceMouse(x: number, y: number): number 
    color(...args): typeof this.p5.color 
    lerpColor(from, to, value): typeof this.p5.lerpColor 
  };
export default Canvas;
