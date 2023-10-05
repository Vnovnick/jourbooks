<script>
  import "../app.css";
</script>

<div class="page-container">
  <slot />
</div>

<style>
  .page-container {
    display: flex;
    height: 100%;
    width: 100%;
    background: linear-gradient(300deg, #0a9708, #30c88e, #5ce7b1);
    background-size: 180% 180%;
    animation: gradient-animation 18s ease infinite;
    font-family: "Lora", serif;
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
