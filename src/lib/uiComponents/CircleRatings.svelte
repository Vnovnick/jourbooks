<script lang="ts">
  export let rating: number;
  const defaultCircleStyling = "w-4 h-4 border-black border rounded-full";
</script>

<div class="flex gap-x-1">
  <div class={`${defaultCircleStyling} ${rating >= 1 ? "bg-black" : ""}`} />
  <div class={`${defaultCircleStyling} ${rating >= 2 ? "bg-black" : ""}`} />
  <div class={`${defaultCircleStyling} ${rating >= 3 ? "bg-black" : ""}`} />
  <div class={`${defaultCircleStyling} ${rating >= 4 ? "bg-black" : ""}`} />
  <div class={`${defaultCircleStyling} ${rating === 5 ? "bg-black" : ""}`} />
</div>
