# Welcome to JourBooks

A site to shelve books, keep track of reading progress, chat with other readers, and journal about books you're reading or interested in. By utilizing Open Library's powerful API, users are able to search through Open Library's rich collection of books and save any books they're interested in.

Following this [link](https://github.com/Vnovnick/jourbooks_backend) will take you to the backend portion of this project as well as descriptions for the endpoints that this project accesses for the frontend.

## Currently In-Progress Features

- Updating Shelved Book info from book view page

### Backlogged Issues (set up as reminders for future enhancements)

[Enhancement/backlogged issues](https://github.com/Vnovnick/jourbooks/issues)

## Pushed Back in priority

- Profile Page

## Completed Features

- Create a simple login
- Utilize Open Library's Search API to allow users to search for books
- (12/8) Add shelve "read" books request to entry component and test new endpoint
  - (12/9) fix issues with request in backend (tested and working)
- ~~(12/10) Create endpoint and client-side call of user "read" books~~
  - ~~checks read books with search results to display shelved/saved books from DB~~
- (12/12) improved previous feature of shelving to "read" to instead allow user to shelve to multiple shelf types
  - same check made when searching for books, but now for whatever shelf type assigned
- (12/21) Incorporate Tanstack Svelte Query and have updating book displays on the homepage
- (1/4) Adding query parameters to browsebooks url
  - viewing a book from the search and then navigating back to the search page will re-run the search
- (1/11) Created the book journal entry feature for the frontend along with the backend endpoints in the backend
- (1/13) Added the ability to delete and update journal entries in the frontend and the backend
  - Incorporated a modal component to confirm deletion for entries
- (1/20) Finished adding functionality for the review tab and the corresponding requests for them in the backend
