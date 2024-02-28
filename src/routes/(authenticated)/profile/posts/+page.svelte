<script lang="ts">
  import axios from "axios";
  import type { JournalEntryType, Book } from "$lib/typesAndInterfaces";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import JournalEntry from "../../home/[slug]/JournalEntry.svelte";
  import { expressServerURL } from "$lib/endpointAssets";
  export let data;
  const bookData: Book[] = data.bookData;
  const userId: string = data.userData.id;
  let combinedData: {
    bookInfo: Book | undefined;
    entries: JournalEntryType[];
  }[];
  const queryClient = useQueryClient();

  const getAllJournalEntries = createQuery({
    queryKey: ["profile:allJournalEntries"],
    queryFn: () =>
      axios
        .get(`${expressServerURL}/v1/book/shelved/journal/all/${userId}`)
        .then((res) => res.data),
  });

  $: combinedData = $getAllJournalEntries.isSuccess
    ? $getAllJournalEntries.data.map((entry: any) => {
        const matchingBook = bookData.find((book) => book.id === entry.book_id);
        return {
          bookInfo: matchingBook,
          entries: entry.entries,
        };
      })
    : undefined;
</script>

<div class="flex flex-col gap-y-5 mt-5">
  {#if combinedData}
    {#each combinedData as post}
      <div class="flex pb-2.5">
        {#if post.bookInfo}
          <a
            href={`/home/${post.bookInfo.id}`}
            class="w-[220px] flex flex-col items-center text-center group"
          >
            <img
              loading="lazy"
              src={`https://covers.openlibrary.org/b/olid/${post.bookInfo.cover_key}-M.jpg`}
              alt={`Cover for ${post.bookInfo.title}`}
              class="h-[180px] w-36 object-scale-down"
            />
            <div class="group-hover:underline">
              <p class="text-lg">{post.bookInfo.title}</p>
              <p>{post.bookInfo.author}</p>
            </div>
          </a>
          <div class="grow">
            {#each post.entries as entry}
              <JournalEntry
                slug={post.bookInfo?.id}
                post={entry}
                {userId}
                onEditSettled={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["profile:allJournalEntries"],
                  });
                }}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>
