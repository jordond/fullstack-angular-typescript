# Hoogflix Landing page

A landing page front-end for my Plex server.  This is mainly a practice application for me using TypeScript.
The initial code base is from John Papa's [hottowel-angular-typescript](https://github.com/johnpapa/hottowel-angular-typescript), modified for my purposes.

I will not be focusing heavily on testing, but I will try to test the server side.

## Features

- Written with typescript
- More to come hopefully

## To-do

- Query plex instance for basic stats such as:
  - On/offline
  - Number of active users
  - Count of items in each library
- If offline show reason and message
- Link to go to plex
- Email form to request access to plex server
  - Rate limit
  - XSS protection
- Optionally
  - Admin dashboard
    - Added users
    - Pending users
    - Form stats
  - Turn into a docker application
  - Generify it so others can use it

## Installing

1. Clone the repo `git clone git@github.com:jordond/hoogflix.git`
2. Install dependencies `npm install`
3. Compile by running `gulp build`

## Running

1. Export production environment `export ENV=production`
2. Run the server `node build/server/app.js`
  - Optionally run `ENV=production node build/server/app.js`

## License

```
The MIT License (MIT)

Copyright (c) 2015 Jordon de Hoog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```