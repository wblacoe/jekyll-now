---
layout: post
title: Sudoku Solver in Python
tags: [Computer Science, Games, Programming, Python]
---

<img class="floatright" src="/images/sudoku.png" />
Ever since I was introduced to the sudoku puzzles I enjoyed working on them. It has always been a nice distraction and a good way to practise mental focus. Initially my attempts at solving them were quite random, but over time my solution methods became more systematic. Recently I wanted to see if I could teach a computer to do what I do when confronted with a sudoku puzzle (instead of using a brute force algorithm). So I needed to formally express the routine that had become quite intuitive for me.

Initially certain cells on the board are filled with the numbers that are assumed to be correct. After that the board is scanned for opportunities to infer the numbers in other cells. There are 3 types of inferences that I use. The first two are deterministic, that is, they only take steps that are necessarily correct. The third, on the other hand, guesses the number of an empty cell. This randomised step is only taken when the first two do not suffice to solve the entire puzzle. In some more detail, this is what the 3 steps do:

1. Each cell *c* keeps track of the numbers that it can possibly contain. Whenever a number *n* gets assigned elsewhere in the same row, column or square as cell *c*, then *n* gets removed from *c*'s list of still possible numbers. When for a cell there is only one possible number left, then it is filled with that number. I call this **positive deduction** (POS_DED in the program).

2. Each row, colum and square maps each of the numbers from 1 to 9 to the subset of its cells that could possibly get that number. Due to cells in its neighbourhood being assigned individual numbers those subsets shrink over time. When any number is mapped to a set of only one cell, then that cell gets that number. I call this **negative deduction** (NEG_DED in the program).

3. When the solver cannot progress with only the help of the former 2 steps, it randomly chooses an empty cell and fills it with a random number that is deemed possible for that cell. This can obviously lead to a wrong decision. A mistake becomes apparent when the solver tries to assign two different numbers to the same cell, or when in a row, column or square there is no room for any one number (because of that cell's restrictions given by its neighbourhood).

If the algorithm ever gets stuck in an insoluble state it backtracks and guesses again when necessary. Of course this means that if the initial board setting is such that the sudoku is impossible to solve, then the algorithm ends up in an infinite loop. Otherwise, once a solution is reached, a summary tells you how often the algorithm needed to backtrack and how many guesses were involved in its final phase.

You can **try out the program below**. The program has already started with an example setting. All you need to do is to type 'solve' and press Enter. You will be shown the sequence of steps that the algorithm takes to solve the sudoku (named INIT, POS_DED, NEG_DED1, NEG_DED2 and GUESS). For an explanation of how to create your own sudoku and further commands type 'help' and hit Enter.


<iframe src="https://trinket.io/embed/python/186a44617b?outputOnly=true&runOption=run&start=result" width="100%" height="450" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>

To view the <b>code</b> go to this [repository](https://github.com/wblacoe/sudoku_solver).

After I finished implementing my own sudoku solver I was curious to see other people's approaches. It was crazy to find out how much deeper this rabbit hole can go. There are more thought-out methods to solve such puzzles like the 'X-Wing' and 'Swordfish' methods that I found on [this website](http://sudokudragon.com/sudokustrategy.htm). I wonder if such methods make it possible to solve any sudoku deterministically, i.e., without any guessing.
