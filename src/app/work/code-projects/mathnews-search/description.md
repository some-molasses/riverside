[Click here to be redirected to the search engine.](https://mathnews-search.river-stanley.me/)

## Motivation

After a long semester of CS 452: Real-time programming at the University of Waterloo, I decided to unwind by doing yet more programming. I've spent several semesters contributing to the University of Waterloo's student publication mathNEWS, a student-run creative newsletter published once every two weeks. You can read it [here](https://mathnews.uwaterloo.ca/).

At the moment, mathNEWS has no convenient way to search through its repository of articles. Editors can use the site's internals to search for particular phrases or by author, but this power is cannot extended to regular contributors - if it were, it would violate the privacy of many of our authors, who write under changing pseudonyms depending on how identifiable they wish to be. Regular readers can enter a google search for _"mathnews" <query here>_, but even that can only do so much - in particular, Google's search engine results page still doesn't link to the PDF pages matched by the query.

## PDF Parsing

If I wanted to solve mathNEWS' information retrieval problem, I'd have to start with indexing. Problem: mathNEWS is print-first. We only release issues in PDF format online. As an editor, I had access to our internal article database, but that contained many articles deleted or substantially altered late in the editing process, without such modifications applied. In short, the only way I had to get a version of the articles that reflected mathNEWS' true contents was to parse the PDFs.

PDFs are hard to work with. I used pdf.js to speed things up, but even pdf.js only gave me a long array of randomly-divided text segments. It then fell to me to subdivide them into articles. Although I initially took the approach of font-matching, using the "mathNEWS" logo at the top of the page as a consistent reference for the title font (since the internal font name provided by pdf.js changed on each page), this fell victim to various problems of mismatching to the titles, with too many false positives and false negatives both. I ended up using font size matching to identify article titles, then font family with font size matching to identify the author names.

This scheme led to fairly successful article identification. Still, problems remained. Miscapitalizations are a continuous source of flaws; issues from 2017-2018 seem to have completely random captialization of their titles, despite the title font being all uppercase (EXAMPLE -> exAMpLe). Further, many words became squished together; this was solved by adding spaces before each block of capital letters, with carve-outs for known words like "mathNEWS." Further, because of its tight bounds to particular font sizes, it will inevitably fail if given any issues before the current mathNEWS style was adopted.

## Indexing and retrieval

I've used FlexSearch as the underlying search engine, which has provided quick development time in trade for any degree of precision of results. In particlar, FlexSearch's precomputed scores don't allow for the boosting of certain fields over others in matches against multi-field JSON objects - that is, there is no straightforward way to make matches to titles and authors more valuable than matches to bodies. 

After any substantial update, I manually trigger a re-indexing job. This downloads all mathNEWS PDFs and constructs an index of their articles. This index is then stored in a Vercel blob.

On retrieval, the index is retrieved from the blob and queried. Article IDs are returned, which I can then use to reference a simple document store (read: an array) of articles to retrieve article data. This data is passed to the frontend, which can use them to generate a search engine results page.

There certainly remain refinements that can be made. The goal, however, was to have it started and completed within April 2025, so the required timeframe has now closed.

[Click here to see how it turned out.](https://mathnews-search.river-stanley.me/)
