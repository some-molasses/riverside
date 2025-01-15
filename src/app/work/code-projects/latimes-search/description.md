While working on Faire's search infrastructure team in early 2024, I realized that despite the breadth of topics I had been exposed to as part of my University of Waterloo education, search systems had been entirely missed. Luckily, one of my fellow co-op students had recently taken a course MSE 541: Search Engines that he could not recommend highly enough.

In Fall 2024, I took his advice and enrolled in MSE 541. In the course, students are taught how to construct the fundamentals of a text retrieval engine. To demonstrate our understanding, we were given a full dataset of every LATimes article published in the years 1989 and 1990, and told to build a search engine based on it.

# Components

## Indexing

Indexing a 131 000-document collection was fun. I was lucky enough to be able to construct the inverted index and lexicon on RAM*, although through the course I was also introduced to alternative mechanisms for larger datasets. Each document, upon being unzipped, had to be tokenized, with any new tokens saved to a lexicon of all words in the collection. Key attributes, like article titles and document lengths, were extracted and written into metadata files. Most importantly, the token frequencies were then counted and added to an inverted index; a data structure that compresses a `n_words` x `n_documents` matrix of term frequencies per document.

*At least, I was able to do so on a modern thinkpad. My poor 2017 PC had a bit more difficulty :(

## Ranking methods

I implemented several methods of retrieving documents from the collection. First was Boolean AND retrieval; a simple retrieval method identifying each from the user's query and returning all documents containing all words from the query. This is a famously bad mechanism, but it served as a good measurement baseline to compare against later.

I then advanced to more complex mechanisms. Using a generic `Query` object, I was able to swap out different types of query based on the context of the program I was executing - or in particular, what I was hoping to measure at the time. I implemented two more retrieval methods: cosine similarity and BM25 retrieval. Cosine similarity retrieval took the dot product of the term frequency and inverse document frequency of each term in the query and document vectors, then used that value as the score by which to rank documents. BM25 retrieval did a similar thing, but with a distinctly more complex computation powering it.

Ultimately, both boiled down to a neat core idea that the relevance of a document to a user is a function that increases with the number of times query terms appear in the document, and decrease with the number of times the term appears in all documents. A word like 'osteoporosis' appearing multiple times could contribute a substantial amount to a document this way, while a word like 'the' appearing multiple times has almost no effect.

## Query-biased summaries and the retrieval interface

The last key part of the project involved constructing a user interface by which people could search the 131 000 documents. 

![image](public\works\coding\mse541\summaries.png)

# Evaluation mechanisms
