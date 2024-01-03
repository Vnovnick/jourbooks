<script lang="ts">
  import { expressServerURL } from "$lib/endpointAssets";
  import type { Book } from "$lib/typesAndInterfaces";
  import { createQuery } from "@tanstack/svelte-query";
  import axios from "axios";
  import Jellyfish from "svelte-loading-spinners/Jellyfish.svelte";
  export let data;

  const specificBookQuery = createQuery<Book>({
    queryKey: ["spcificBook"],
    queryFn: () =>
      axios
        .get(`${expressServerURL}/v1/book/shelved/${data.slug}`)
        .then((res) => res.data),
  });

  $: bookData = $specificBookQuery.isSuccess
    ? $specificBookQuery.data
    : undefined;
</script>

<div class="w-full flex flex-col">
  {#if $specificBookQuery.isLoading}
    <div class="mt-24 mx-auto">
      <Jellyfish size="100" color="#6ee7b7" unit="px" duration="3s" />
    </div>
  {/if}
  {#if $specificBookQuery.isSuccess && !$specificBookQuery.isLoading && bookData}
    <div class="flex ml-5 mt-5">
      <img
        src={`https://covers.openlibrary.org/b/olid/${bookData.cover_key}-L.jpg`}
        alt={`Cover for ${bookData.title}`}
        class="w-60 object-scale-down"
      />
      <div class="mt-5 mx-5">
        <p class="text-3xl font-bold">{bookData?.title}</p>
        <p class="text-2xl">{bookData?.author}</p>
        <p>{bookData?.page_count}</p>
        <p>{bookData?.publication_year}</p>
      </div>
    </div>
  {/if}
</div>
