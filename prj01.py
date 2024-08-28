# -*- coding: utf-8 -*-
"""
Created on Thu Jun 20 12:54:58 2024

@author: BHUPENDRA
"""

import tkinter as tk
from tkinter import * # string operation
window=tk.Tk() # window has been created
window.title("True and False news")
window.configure(bg='deepskyblue')
window.geometry('900x600')
window.grid_rowconfigure(0, weight=1)
window.grid_columnconfigure(0,weight=1)
def prediction():
    import numpy as np
    import pandas as pd
    import re
    from nltk.corpus import stopwords
    from nltk.stem.porter import PorterStemmer
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score
    import nltk
    nltk.download('stopwords')
    print(stopwords.words('english'))
    news_dataset=pd.read_csv('train.csv')
    news_dataset = news_dataset.fillna('')
    news_dataset['content'] = news_dataset['author']+' '+news_dataset['title']
    print(news_dataset['content'])
    X = news_dataset.drop(columns='label', axis=1)
    Y = news_dataset['label']
    port_stem = PorterStemmer()
    def stemming(content):
        stemmed_content = re.sub('[^a-zA-Z]',' ',content)
        stemmed_content = stemmed_content.lower()
        stemmed_content = stemmed_content.split()
        stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
        stemmed_content = ' '.join(stemmed_content)
        return stemmed_content
    news_dataset['content'] = news_dataset['content'].apply(stemming)
    print(news_dataset['content'])
    X = news_dataset['content'].values
    Y = news_dataset['label'].values
    print('HI')
    print(X)
    print(Y)
    print(Y.shape)
    vectorizer = TfidfVectorizer()
    vectorizer.fit(X)
    X = vectorizer.transform(X)
    print(X)
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, stratify=Y, random_state=2)
    model = LogisticRegression()
    model.fit(X_train, Y_train)
    # take input from front end
    x1=authorvar.get()
    x2=titlevar.get()
    # use input
    inp=vectorizer.transform([x1,x2])
    print(inp)
    out_pred=model.predict(inp)
    print(out_pred[0])
    if out_pred[0]==0:
        print('Real news')
        outvar.set("Real news")
    else:
        print('Fake news')
        outvar.set("Fake news")
    
lb=tk.Label(window,text="WELCOME  TO REAL/FAKE NEWS",fg='green',bg='deepskyblue',height='1',width=30,font=('times',24,'bold'))
lb.place(x=200,y=90)

author=tk.Label(window,text="Enter author's name",height=2,width=20)
author.place(x=150,y=200)

authorvar=StringVar()
authorEntry=tk.Entry(window,textvariable=authorvar,width=40,font=('times',20))
authorEntry.place(x=300,y=200)

title=tk.Label(window,text="Enter Title",height=2,width=20)
title.place(x=150,y=300)

titlevar=StringVar()
titleEntry=tk.Entry(window,textvariable=titlevar,width=40,font=('times',20))
titleEntry.place(x=300,y=300)

out=tk.Label(window,text="TEST RESULT",bg='green',fg='white',height='2',width=20,font=('times',13,'bold'))
out.place(x=150,y=500)

outvar=StringVar()
outEntry=tk.Entry(window,textvariable=outvar,width=20,font=('time',15))
outEntry.place(x=380,y=508)

but=tk.Button(window,text="TEST",command=prediction,font=('times',15,'bold'),bg='red',fg='black',height=1,width=15)
but.place(x=400,y=400) 

but1=tk.Button(window,text="QUIT",command=window.destroy,font=('times',15,'bold'),bg='red',fg='black',height=1,width=15)
but1.place(x=650,y=500) 

window.mainloop()