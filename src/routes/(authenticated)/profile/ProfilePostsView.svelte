<script lang="ts">
  import type { JournalEntryType, Book } from "$lib/typesAndInterfaces";
  import JournalEntry from "../home/[slug]/JournalEntry.svelte";
  export let journalEntries: { book_id: string; entries: JournalEntryType[] }[];
  export let bookData: Book[];
  export let userId: string;

  const combinedData: {
    bookInfo: Book | undefined;
    entries: JournalEntryType[];
  }[] = journalEntries.map((entry) => {
    const matchingBook = bookData.find((book) => book.id === entry.book_id);
    return {
      bookInfo: matchingBook,
      entries: entry.entries,
    };
  });

  // TODO add invalidate for post edit/delete in profile posts view
</script>

<div class="flex flex-col gap-y-5 mt-5">
  {#each combinedData as post}
    <div class="flex pb-2.5">
      {#if post.bookInfo}
        <div class="w-[220px] flex flex-col items-center text-center">
          <img
            loading="lazy"
            src={`https://covers.openlibrary.org/b/olid/${post.bookInfo.cover_key}-M.jpg`}
            alt={`Cover for ${post.bookInfo.title}`}
            class="h-[180px] w-36 object-scale-down"
          />
          <div>
            <p class="text-lg">{post.bookInfo.title}</p>
            <p>{post.bookInfo.author}</p>
          </div>
        </div>
        <div class="grow">
          {#each post.entries as entry}
            <JournalEntry slug={post.bookInfo?.id} post={entry} {userId} />
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>
