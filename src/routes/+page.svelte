<script lang="ts">
  import Canvas from "$lib/Canvas.svelte";
</script>

<Canvas
  width={400}
  height={400}
  minX={-4}
  minY={-4}
  maxX={4}
  maxY={4}
  update={(cx) => {
    cx.strokeWeight(3);
    cx.stroke(0, 132, 255);
    cx.rect(0, 0, 1, 1, 0.2);
    cx.stroke(255, 0, 0);
    cx.rect(1, -1, 1, 1, 0.2);
    console.log(cx.uv(1));
  }}
/>
