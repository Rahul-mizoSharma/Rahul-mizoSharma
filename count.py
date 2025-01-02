#count of words

sentence = "To change the overall look of your document. To change the look available in the gallery"
words = sentence.lower().replace('.', '').split()  

word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

print("Word occurrences:", word_count)





