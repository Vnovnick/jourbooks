<script>
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import "../app.css";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <div class="page-container h-full w-full flex overflow-auto">
    <slot />
  </div>
</QueryClientProvider>

<style>
  .page-container {
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
