This project is a searchable database of almost all motions at all levels of governance of the Mathematics Society of the University of Waterloo since 2022.

[Try it here!](https://mathsoc-minutes.vercel.app/)

# Motivation

The Mathematics Society, or MathSoc, has an amnesia problem.

At the University of Waterloo, almost all students are in the Waterloo co-op program, a program that breaks up their time at university into four-month semesters that alternate between on-campus study and off-campus work placements. The entire university operates on this four-month cycle. In contrast to other universities, almost all student clubs at the University of Waterloo rotate their leadership every four months. You can't run events in Waterloo while on co-op in San Francisco. MathSoc is no exception; its composition of volunteers changes dramatically every four months at every level of the organization.

MathSoc is a large organization. It comprises over one hundred fifty volunteers every term, who are tasked with supporting student clubs within the Math Faculty, running events for all Math students, operating a physical on-campus store and office space five days a week, and advocating on students' behalf. It's a behemoth of an organization. Most large decisions - budget allocation, advocacy stance-making, and policy changes, for example - are made by one of three bodies: MathSoc Council, the MathSoc Board of Directors, or at a MathSoc General Meeting.

Given the amnesia problem, anything that occurs in one of these meetings can be reliably expected to be forgotten about two years later. MathSoc tries to fight this by keeping detailed records of what is discussed at each meeting, but these minutes are strewn across isolated Google documents, with no centralized way to know what is in the history of minutes, or where to find it.

An information retrieval engine can fix this problem. By indexing all meetings, we now have one central entrypoint through which to search minutes, making our historical records far more usable than they previously were.

# Implementation

## Finding the minutes

All MathSoc meeting minutes are publicly available\* [on the MathSoc website](https://mathsoc.uwaterloo.ca/resources/meetings) - which I personally single-handedly redeveloped in Summer 2025.

\* They _should_ be, anyways. It's MathSoc policy to make them public, but trying to push for the culture of transparency-by-default that leads to them consistently _being_ public, within an organization that forgets everything every eight months, makes one envy Sisyphus.

All minutes are in Google Documents. As it turns out, it's incredibly easy to download a file as Markdown.

![](/works/coding/mathsoc-minutes/drive-download.png)
[caption](it's that easy)

It doesn't always work, but it's mostly successful. Some documents are, in some inscrtuable way, seemingly configured to require that you log in with a Google account to download them. As my script is not logged in, it fails to retrieve these. Still, its success rate is around 80%; we take a win.

## Parsing out motions

Parsing the motions was surprisingly straightforward. Each MathSoc agenda since 2022 has been formatted in the exact same format: each motion is delineated by a Heading 1, starting with its motion number.

![](/works/coding/mathsoc-minutes/sample-minutes.png)
[caption](they all look basically like this)

Identifying motions therefore didn't take much more than simple string-splitting on the `#` character. I then parsed out some further relevant details for each one - relevant MathSoc clubs, whether the motion involves budget, etc..

## Graduating from storing everything in the repo

next step. learn how free databases work fr.

I've been mostly able to get by in various side projects by using big JSON files to do all data storage. This time, however, I wanted to do it right.

Once all motions are parsed, they're uploaded to Google Firebase. Similarly, the list of searchable document features and all meetings are also stored in Firebase. On user interaction, the Vercel frontend can easily pull this data from Firestore. Better yet, this is all on the Spark plan, i.e. free.

## Searching for a place for my search index

Search is implemented using `lunr.js`. It's a search library I'm a big fan of. Unlike some other popular options, like `flexsearch`, `lunr.js` uses BM25 retrieval under the hood. BM25 is relatively simple; it just compares term and document weights using a linear equation. These are solid fundamentals though; unlike `flexsearch`'s fuzzy-matching approach, BM25 scores relatively high in the average relevance of the results it retrieves.

`lunr.js` implementation takes four simple steps:

1. Build an index of all documents you'd like to be able to search.
2. Put that index somewhere.
3. On a user's query, retrieve that index.
4. Use the index to find documents relative to the user's query.

`lunr` makes steps 1. and 4. really easy. Combined, they are less than 10 lines of code. After building the index, you obtain a 1.8 MB JavaScript object, which `lunr` can easily unwrap later for parsing.

In the meantime... what do you do with a 1.8 MB JavaScript object? Firestore items cap out at 1 MB; Google does not allow you to upload anything larger.

Simple. Turn it into a string. Store smaller strings.

![](/works/coding/mathsoc-minutes/index-table.png)
[caption](my 1.8 MB index as stored in a database)

Does S3 exist? Yes. Is it free? No.

This works, and it's free. It's technically kinda gross, but you have to know your audience, and my audience of me does not really wish to spend money on this.

## Drawing the rest of the owl

The frontend is a simple NextJS site, built with using Sass for styling and `useQuery` for the API layer. Zod validation is implemented in the most complex endpoint, the motions search endpoint.

The site supports backend-driven sorting, filtering, and pagination. There's no hacks; all operations are done at the data layer.

The site is hosted on Vercel.

# Learnings

I think this was a valuable project in terms of things learned. Highlights include:

- Learning that you can just download a Google document in Markdown. It's really that easy.
- Realizing you can DIY a free blob storage solution
- Rediscovering various fascinating motions from MathSoc terms past

In terms of use, it has already been used a few times to support MathSoc's decision making.

I'll call that a win. :)
