# Fanvue's Fullstack challenge

Setup the project:

Make sure you install all the dependencies (currently yarn, but you can opt-out) and start the solution in dev mode.

There is a simple homepage with links to the tasks below.

First Task:

DONE - in the "feed" page, show a centered column of posts (use https://jsonplaceholder.typicode.com/ to get the data) which are simple boxes with the title and body properties returned
DONE - for each post, fetch its relative comments and show the counter, or nothing if there are no comments
DONE - when clicking on the comment counter, the comments appear below it

Second Task:

DONE - create a "vault" page, showing a responsive grid of square pictures (use https://jsonplaceholder.typicode.com/ to get the data) which are simple thumbnails
DONE - when clicking on a thumbnail, the fullscreen image opens

Touch base on the following:

DONE - SSR considerations, if you have time, implement a simple server-side rendering
DONE - Type the responses from the API calls
DONE - create meaningful tags in the head of each page, or any other SEO consideration
DONE - add the favicon stealing it from fanvue.com ;)
PARTIALLY DONE- a11y considerations


Note:

DONE - Styling is not required, you should use MUI5 components out-of-the box, check docs here https://mui.com/material-ui/
DONE - You can install your favourite fetch library, but you can also use the built-in fetch API


Jeremy's comments:

1. Axios vs Fetch
Limited Features : Fetch API lacks some advanced features found in Axios, such as request/response interceptors, request
cancellation, and automatic JSON parsing, which may require additional coding effort to implement.

Axios has 49m weekly downloads

2. I added <meta> description tag made of all of the related 'title' text of the posts and photos.
3. I would move the code to fetch API data into a single method in a utils.ts file. This allows for easier testing and
less code.
4. An SEO consideration - the remote API doesn't allow me to paginate requests so I had to request ALL the posts. This 
is ok for SEO. I would use ISR for this, not SSR as requested in the task.
5. Each Post's comments need to be fetched separately. I decided not to do this on the server since it would cause an
unacceptable delay to the user to fetch 100 Posts' comments. Instead I opted to fetch comments per Post as the Post
enters the Viewport. I used a 3rd party library for this, I hope it's ok. It uses the browser's intersection-observer API.
I have used it before. I could code it from scratch but felt that time is against me.
6. Use import { Button, TextField } from '@mui/material'; for tree-shaking to minimise bundle size!
7. Removed all '^' from package.json libs to ensure dev, QA, prod are using the same versions (avoids bug eg Sequilize 
had a breaking change with String!)
8. The jsonplaceholder API doesn't allow for pagination. Fetching 5000 photos is bad! Next warned me the page size was 
1.2Mbytes so I manually shortened the fetched array to 100 just to prevent any delays. In a real task I would use a more
sophisticated API that would allow me to fetch paginated sets of photos. Next.js lazy loads each image as it appears in
the viewport, however, the enclosing MUI code is very heavy. I would use an infinity list for this.
9. Why is the original _index.tsx wrapped n a <div> vs <> ?
10. memo - I checked and the <Comment> is called once per render (twice with reactStrictMode: true). Photos are also only rendered effectively once.
11. Width of popup image needs to be 600x600 when the viewport allows
12. Minor error handling. In a real app I would add a logger (eg Datadog) and pending business requirements, show an error page or re-try to fetch data.
13. Types were added.
14. Responsive design was added to the /feed page. I use the MUI theme to respond to media-query breakpoints.
15. Clean code is followed - minimal comments, small components with a single responsibility.

WITH MORE TIME 
14. add a loader when fetching APIs
15. a re-try mechanism when fetching APIs
16. add skeleton html component while content is loading
17. add Vitest tests and mock APIs
18. Move API fetching code to a function in utils.ts
19. Create a 'Posts.tsx' component that renders <Post> components.
20. add a 'x' icon to Photo.tsx but I needed to add MUI icons and unsure if this is allowed.