doc = document.createElement('html')
head = document.createElement('head')
body = document.createElement('body')

title = document.createElement('title')
title.innerHTML = "Awesomeness"
head.appendChild(title)

img = document.createElement('img')
img.setAttribute('src', 'http://i.imgur.com/3fcc3ZN.png')
img.setAttribute('style', 'width: 30%')
body.appendChild(img)

doc.appendChild(head)
doc.appendChild(body)