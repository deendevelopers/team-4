import os
from pathlib import Path
import pandas as pd
import pickle
import nltk

from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.tokenize import RegexpTokenizer

from gensim.models.doc2vec import Doc2Vec
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')


class Query:

    def __init__(self):
        path = Path(os.path.realpath(__file__))

        self.dv = Doc2Vec.load("./models/doc2vec_model")
        self.tf = pickle.load(open("./models/tfidf_model.pkl", "rb"))
        self.svd = pickle.load(open("./models/svd_model.pkl", "rb"))
        self.svd_feature_matrix = pickle.load(open("./models/lsa_embeddings.pkl", "rb"))
        self.doctovec_feature_matrix = pickle.load(open("./models/doctovec_embeddings.pkl", "rb"))
        self.quran_df = pd.read_csv("./data/quran_with_trans.csv")
        self.hadtih_df = pd.read_csv("./data/all_hadiths_clean.csv")
        self.full_df = self.quran_df.append(self.hadtih_df.dropna())

    @staticmethod
    def stem_words(text):
        text = text.split()
        stemmer = SnowballStemmer('english')
        stemmed_words = [stemmer.stem(word) for word in text]
        text = " ".join(stemmed_words)
        return text

    @staticmethod
    def make_lower_case(text):
        return text.lower()

    @staticmethod
    def remove_stop_words(text):
        text = text.split()
        stops = set(stopwords.words("english"))
        text = [w for w in text if not w in stops]
        text = " ".join(text)
        return text

    @staticmethod
    def remove_punctuation(text):
        tokenizer = RegexpTokenizer(r'\w+')
        text = tokenizer.tokenize(text)
        text = " ".join(text)
        return text

    def clean_message(self, message):
        message = self.make_lower_case(message)
        message = self.remove_stop_words(message)
        message = self.remove_punctuation(message)
        message = self.stem_words(message)
        return message

    def get_message_tfidf_embedding_vector(self, message):
        message_array = self.tf.transform([message]).toarray()
        message_array = self.svd.transform(message_array)
        message_array = message_array[:, 0:50].reshape(1, -1)
        return message_array

    def get_message_doctovec_embedding_vector(self, message):
        message_array = self.dv.infer_vector(doc_words=message.split(" "),
                                             epochs=200)
        message_array = message_array.reshape(1, -1)
        return message_array

    @staticmethod
    def get_similarity_scores(message_array, embeddings):
        cosine_sim_matrix = pd.DataFrame(cosine_similarity(X=embeddings,
                                                           Y=message_array,
                                                           dense_output=True))
        cosine_sim_matrix.set_index(embeddings.index, inplace=True)
        cosine_sim_matrix.columns = ["cosine_similarity"]
        return cosine_sim_matrix

    def get_ensemble_similarity_scores(self, message):
        message = self.clean_message(message)
        bow_message_array = self.get_message_tfidf_embedding_vector(message)
        semantic_message_array = self.get_message_doctovec_embedding_vector(message)

        bow_similarity = self.get_similarity_scores(bow_message_array,
                                                    self.svd_feature_matrix)
        semantic_similarity = self.get_similarity_scores(semantic_message_array,
                                                         self.doctovec_feature_matrix)

        ensemble_similarity = pd.merge(semantic_similarity, bow_similarity, left_index=True, right_index=True)
        ensemble_similarity.columns = ["semantic_similarity", "bow_similarity"]
        ensemble_similarity['ensemble_similarity'] = \
            (ensemble_similarity["semantic_similarity"] + ensemble_similarity["bow_similarity"])/2
        ensemble_similarity.sort_values(by="ensemble_similarity",
                                        ascending=False,
                                        inplace=True)
        return ensemble_similarity

    def query_similar_items(self, message, n=5):
        similar_items = self.get_ensemble_similarity_scores(message)
        top_n = similar_items.sort_values(by='ensemble_similarity',
                                          ascending=False).head(n)
        results_df = self.full_df.ix[top_n.index.values]
        return results_df.head(n)