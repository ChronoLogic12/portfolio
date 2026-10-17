---
title: BookMarks
summary: A community book review site with accounts, ratings and search. Users add books, rate and review them, and find their next read. Built with Flask and MongoDB.
year: 2022
section: featured
order: 4
role: Code Institute coursework
stack: [Python, Flask, MongoDB, Jinja, Materialize]
screenshot: https://bookmarks-5lb2.onrender.com/home
links:
  live: https://bookmarks-5lb2.onrender.com/
  repo: https://github.com/ChronoLogic12/bookmarks
---

BookMarks is a place to share opinions on books you've read and find your next one. It was one of my Code Institute projects: a full-stack app with its own accounts and database.

## What it does

- **Home** shows the six highest-rated books and a set of editors' picks, each with a short write-up
- **Search** matches a term against every book's title, author, summary and genre, and says how many results it found
- **Accounts**: anyone can browse, but adding books and reviews needs an account. Passwords are hashed, never stored as typed
- **Ownership**: the person who added a book can edit or delete it. Deleting asks for confirmation first and removes the book's reviews with it
- **Reviews**: one per user per book, editable later, and each book's average rating updates as reviews come in

## How it's built

A Flask app rendering Jinja templates, with MongoDB holding the users, books and reviews. Pages are rendered on the server, styled with Materialize.

## Keeping it running

It moved from Heroku to Render in 2022, when Heroku's free tier ended. In March 2026 I brought it up to date: Flask 3, plain `pymongo` in place of the Flask-PyMongo wrapper, and `uv` for dependencies and the Render build.
