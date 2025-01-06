
# NOTE: USE IMPORT NUMPY AS NP FOR EACH PROGRAM MENTIONED BELOW:

1.
import numpy as np
array_1 = np.arange(5, 16)
print(array_1)

2.
array_2 = np.arange(10, 50, 2)
print(array_2)

3.
arr = np.array([10, 20, 30, 40, 50])
element_at_index_3 = arr[3]
print(element_at_index_3)


4.
arr = np.array([1, 2, 3, 4, 5, 6])
last_element = arr[-1]
print(last_element)


5.
arr = np.array([100, 200, 300, 400, 500])
sliced_array = arr[1:4]  
print(sliced_array)

6.
random_array = np.random.randint(1, 101, size=7)
print(random_array)

7.
array_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(array_2d)

8.   
arr = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])
element = arr[1, 2]
print(element)

9.
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
second_row = arr[1]
print(second_row)

10.
arr = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])
second_column = arr[:, 1]
print(second_column)



11.
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
every_other_column = arr[:, ::2]
print(every_other_column)

