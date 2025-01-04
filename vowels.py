#count the vowels

text = "Welcome to python Training"
vowels = 'aeiouAEIOU'
for i in vowels:
    vowel_count=text.count(i)
    print("Vowel occurrences:", vowel_count)