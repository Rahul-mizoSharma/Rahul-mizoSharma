import turtle as t
import random
tim = t.Turtle()
directions = [0, 90, 180, 270]
colours = ["forest green", "medium blue", "medium purple", "black", "orange red", "dark violet"]
tim.pensize(30)
tim.speed("fastest")

for i in range(200):
    tim.forward(30)
    tim.setheading(random.choice(directions))
    tim.color(random.choice(colours))


screen = t.Screen()
screen.exitonclick()
