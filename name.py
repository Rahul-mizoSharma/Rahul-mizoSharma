# # Function to greet a user
def greet():
    name = input("Please enter your name: ") 
    return f"Hello, {name}!"
print(greet()) 



# # Function to check if a string is a palindrome
def is_palindrome():
    s = input("Please enter a string: ")  
    return s == s[::-1]
if is_palindrome():
    print("The string is a palindrome.")
else:
    print("The string is not a palindrome.")



# # Lambda to calculate square
square = lambda x: x ** 2
print(square(5))   
print(square(10))  
print(square(15)) 





# # lambda for letter starting woth a
filter_a = lambda words: list(filter(lambda word: word.startswith('a'), words))
words_list = ["apple", "banana", "avocado", "cherry", "alpine"]
filtered_words = filter_a(words_list)
print(filtered_words)  




# #lambda for divisible by 3
is_divisible_by_3 = lambda x: x % 3 == 0
for i in range(1, 21):
    if is_divisible_by_3(i):
        print(f"{i} is divisible by 3")