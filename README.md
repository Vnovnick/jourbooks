# Welcome to JourBooks

A site to shelve books, keep track of reading progress, chat with other readers, and journal about books you're reading or interested in. By utilizing Open Library's powerful API, users are able to search through Open Library's rich collection of books and save any books they're interested in.

Following this [link](https://github.com/Vnovnick/jourbooks_backend) will take you to the backend portion of this project as well as descriptions for the endpoints that this project accesses for the frontend.

## Currently In-Progress Features

- Profile Page View and Editing
  - ~~Book shelf~~
  - Separate /profile/edit route
  - Posts Tab
  - Reviews Tab

## Backlogged Issues (TODOs)

[Enhancement/backlogged issues](https://github.com/Vnovnick/jourbooks/issues)

## Completed Features

#### 23'

- Create a simple login
- Utilize Open Library's Search API to allow users to search for books
- (12/8) Add shelve "read" books request to entry component and test new endpoint
  - (12/9) fix issues with request in backend (tested and working)
- ~~(12/10) Create endpoint and client-side call of user "read" books~~
  - ~~checks read books with search results to display shelved/saved books from DB~~
- (12/12) improved previous feature of shelving to "read" to instead allow user to shelve to multiple shelf types
  - same check made when searching for books, but now for whatever shelf type assigned
- (12/21) Incorporate Tanstack Svelte Query and have updating book displays on the homepage

#### 24'

- (1/4) Adding query parameters to browsebooks url
  - viewing a book from the search and then navigating back to the search page will re-run the search
- (1/11) Created the book journal entry feature for the frontend along with the backend endpoints in the backend
- (1/13) Added the ability to delete and update journal entries in the frontend and the backend
  - Incorporated a modal component to confirm deletion for entries
- (1/20) Finished adding functionality for the review tab and the corresponding requests for them in the backend
- (2/17) Finished visuals for shelved book page and extracted queries to `+page.server.ts` file
- (2/18) Finished pagination for book search along with page query param values
- (2/19) Created Profile book shelf view
  - (2/20) Finish styling and create function to dynamically add more shelves in order to avoid horizontal scroll
- (2/21) Add page number and shelf type to journal forms along with fields in the db
- (2/21) Add all Journal Entries endpoint and view for all entries in the profile page
