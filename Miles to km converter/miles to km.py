from tkinter import *


def miles_to_km():
    Miles = float(Miles_input.get())
    Km = round(Miles*1.689)
    km_result_label.config(text=f"{Km}")


window = Tk()
window.title("Miles to KM converter")
window.minsize(width=300, height=50)
window.config(padx=50, pady=50)

Miles_input = Entry(width=7)
Miles_input.grid(column=1, row=0)

Miles_label = Label(text="Miles")
Miles_label.grid(column=2, row=0)

is_equal_label = Label(text="is equal to")
is_equal_label.grid(column=0, row=1)

km_result_label = Label(text='0')
km_result_label.grid(column=1, row=1)

km_label = Label(text="KM")
km_label.grid(column=2, row=1)

button = Button(text="calculate", command=miles_to_km)
button.grid(column=1, row=2)

window.mainloop()


