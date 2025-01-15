While working on Faire's search infrastructure team in early 2024, I realized that despite the breadth of topics I had been exposed to as part of my University of Waterloo education, search systems had been entirely missed. Luckily, one of my fellow co-op students had recently taken a course MSE 541: Search Engines that he could not recommend highly enough.

In Fall 2024, I took his advice and enrolled in MSE 541. In the course, students are taught how to construct the fundamentals of a text retrieval engine. To demonstrate our understanding, we were given a full dataset of every LATimes article published in the years 1989 and 1990, and told to build a search engine based on it.

## Components

### Indexing

Indexing a 131 000-document collection was fun. I was lucky enough to be able to construct the inverted index and lexicon on RAM*, although through the course I was also introduced to alternative mechanisms for larger datasets. Each document, upon being unzipped, had to be tokenized, with any new tokens saved to a lexicon of all words in the collection. Key attributes, like article titles and document lengths, were extracted and written into metadata files. Most importantly, the token frequencies were then counted and added to an inverted index; a data structure that compresses a `n_words` x `n_documents` matrix of term frequencies per document.

*At least, I was able to do so on a modern thinkpad. My poor 2017 PC had a bit more difficulty :(

To help to conflate like terms, I implemented stemming as a part of this process, using the Porter stemmer. This allowed for terms like "run," "ran," "running," "runner," etc., to all be mapped to the same token. This significantly helps to improve the engine's recall of results, at a small penalty to its precision.

### Ranking methods

I implemented several methods of retrieving documents from the collection. First was Boolean AND retrieval; a simple retrieval method identifying each from the user's query and returning all documents containing all words from the query. This is a famously bad mechanism, but it served as a good measurement baseline to compare against later.

I then advanced to more complex mechanisms. Using a generic `Query` object, I was able to swap out different types of query based on the context of the program I was executing - or in particular, what I was hoping to measure at the time. I implemented two more retrieval methods: cosine similarity and BM25 retrieval. Cosine similarity retrieval took the dot product of the term frequency and inverse document frequency of each term in the query and document vectors, then used that value as the score by which to rank documents. BM25 retrieval did a similar thing, but with a distinctly more complex computation powering it.

Ultimately, both boiled down to a neat core idea that the relevance of a document to a user is a function that increases with the number of times query terms appear in the document, and decrease with the number of times the term appears in all documents. A word like 'osteoporosis' appearing multiple times could contribute a substantial amount to a document this way, while a word like 'the' appearing multiple times has almost no effect.

### Query-biased summaries and the retrieval interface

The last key part of the project involved constructing a user interface by which people could search the 131 000 documents. For simplicity, I only ever displayed the top 10 results.

![](/works/coding/mse541/summaries.png)

Notice how each of the document summaries has been custom-constructed to suit my query term "molasses." This is the implementation of query-biased summaries. When generating the search engine results page, for each item, I split up all of the sentences into mini-documents, then perform mini-retrieval on them, scoring them based on their relevance to the query. From this, I can then construct a description that highlights the most relevant parts of the document, giving the user a sense of the document's topic without having to actually access it.

### Evaluation mechanisms

One last thing I implemented was retrieval metrics. Using a dataset of TREC evalutors' relevance decisions on the set of LATimes articles with respect to a predefined list of queries, I was able to calculate metrics including average precision, precision@n, and NDCG@n. I could then measure the varying retrieval methods to one another, seeing in what areas each one excelled.

## Future work

Now that the associated course is done, I don't intend to work on this particular engine much further. However, I've taken many of the principles and software patterns within it, and applied them to the website you are currently reading. Using the search functionality, you may find a very familiar highlighting logic as displayed above. 

I'd like to soon implement more interesting features to ingest into the ranking algorithm: tags, query history and interaction history, and more. Unfortunately, I am still _searching_ for time :)
