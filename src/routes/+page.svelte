<script lang="ts">
  import Canvas from "$lib/Canvas.svelte";
  import p5Svelte from "p5-svelte";
</script>

<div class="grid">
  <Canvas
    class="entry"
    width={400}
    height={400}
    minX={-4}
    minY={-4}
    maxX={4}
    maxY={4}
    update={(cx) => {
      cx.strokeWeight(3);
      cx.setDash(5, 5);
      cx.stroke(128);
      cx.bezier(-1, -1.5, 0, -1.5, 0, 1.5, 1, 1.5);
      cx.stroke(0, 132, 255);
      cx.resetDash();
      cx.fill(0, 132, 255, 100);
      cx.rect(-2, -2, 0.9, 0.9, 0.2);
      cx.translate(3, 3);
      cx.rect(-2, -2, 0.9, 0.9, 0.2);
    }}
    mouseClicked={(e, cx) => {
      if (cx.rectMouse(-2, -1, 1, 1)) {
        alert(1);
      }
    }}
  />
  <Canvas
    class="entry"
    width={400}
    height={400}
    minX={-4}
    minY={-4}
    maxX={4}
    maxY={4}
    update={(cx) => {
      cx.strokeWeight(3);
      cx.stroke(128);
      cx.line(-0.5, 0.5, 2.5, 0.5);
      cx.line(-2.5, -1.5, -2.5, 2.5);
      cx.fill(200);
      cx.circle(-0.5, 0.5, 0.3);
      cx.circle(2.5, 0.5, 0.3);
      cx.circle(-2.5, -1.5, 0.3);
      cx.circle(-2.5, 2.5, 0.3);
      cx.stroke(0, 132, 255);
      cx.fill(0, 132, 255, 100);
      cx.rect(cx.bound(cx.mx - 0.5, -1, 2), 0, 1, 1, 0.2);
      cx.rect(-3, cx.bound(cx.my - 0.5, -2, 2), 1, 1, 0.2);
    }}
  />

  <Canvas
    class="entry"
    width={400}
    height={400}
    minX={-4}
    minY={-4}
    maxX={4}
    maxY={4}
    maxScale={4}
    gridSize={32}
    update={(cx) => {
      cx.stroke(0, 132, 255);

      cx.strokeWeight(16);
      cx.point(-1, 0);
      cx.strokeWeight(4);
      cx.line(-2, -1, -2, 1);

      cx.strokeWeight(cx.uv(0.5));
      cx.point(1, 0);
      cx.strokeWeight(cx.uv(0.1));
      cx.line(2, -1, 2, 1);
    }}
  />
  <Canvas
    class="entry"
    width={400}
    height={400}
    minX={-4}
    minY={-4}
    maxX={4}
    maxY={4}
    gridSize={32}
    update={(cx) => {
      cx.stroke(0, 132, 255);
      cx.fill(0, 132, 255, 100);
      cx.rect(cx.inx(32), cx.iny(32), cx.in(64), cx.in(64), cx.in(8));
      cx.stroke(128);
      cx.fill(128, 100);
      cx.p5.rect(-64, -64, 64, 64, 8);
    }}
  />
</div>

<style>
  .grid {
    display: grid;
    width: fit-content;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  :global(.entry) {
    border: 5px solid #0001;
    border-radius: 0.5rem;
  }
</style>
