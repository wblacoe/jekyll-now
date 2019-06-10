---
layout: post
title: Exponential Prime Factor Trees
tags: [Mathematics, Number theory]
---

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<img class="floatleft" src="/images/evangelists.jpg" />
We usually think of the **natural numbers** 1, 2, 3, ... as elements on a straight line that extends infinitely. That is, the relationship between 2 and 3 is the same as between 3 and 4 and so on: they have the same distance between them. In the case of a distance of 1 we might call them neighbours. This perspective focuses on the linearity and additivity of numbers: the linear distance from one number to another number can be expressed as a number. Human thinking is intuitively linear in many situations, even when that does not reflect the entire nature of the considered system. Examples include systems of exponential growth or exponential decay, or systems that involve subtle interaction among subsystems whose behaviour cannot be predicted by assuming "more of $$x$$ means (proportionally) more of $$y$$".

The internal structure of the natural numbers $$\mathbb{N}$$ is also far from this simple. In fact, [number theory](https://en.wikipedia.org/wiki/Number_theory) is an ancient discipline that concerns itself with **understanding the nature of numbers**. This often includes the study of prime numbers: every natural number is either prime $$(\mathrm{e.g.}\ 2, 3, 5, 7, 11, ...)$$ or the product of multiple prime numbers. In this way the primes are a base that all other numbers are built on. We know that there are infinitely many of them, but we don't fully understand how they work. Hence there is no known way to efficiently decide whether a number $$n$$ is prime or not. One inefficient method to check for this is to test for all numbers $$x$$ from $$2$$ to $$\sqrt{n}$$ if $$n$$ is divisible by $$x$$. In awkward ways like this we have found $$2^{82,589,933} - 1$$ to be the [largest known prime number](https://en.wikipedia.org/wiki/Largest_known_prime_number) as of January 2019. And the computers keep searching and searching for even larger prime numbers. Since there are infinitely many prime numbers, this search for the next prime number is only a matter of time, but a long time.

We could make use of numbers so much more efficiently if we understood their internal (hidden) structure better. In fact it would be advantageous to humans if we started thinking of them more in terms of their prime number structure than in a linear, additive way. To do so I suggest a tree structure, so-called **exponential prime number trees**. I will develop this notion here in a few steps. (To differentiate from [prime factor trees](https://socratic.org/questions/how-do-you-make-a-factor-tree-for-210), I added the "exponential". Rather than multiplying along paths in our trees we exponentiate along them.)

The number $$19845$$, for example, can be decomposed into these prime factors:

$$3\times 5\times 3\times 7\times 5\times 7\times 3\times 3$$

Since multiplication is commutative and associative this is equal to

$$(3\times 3\times 3\times 3)\times 5\times (7\times 7)$$

where the primes are grouped and sorted from small to large. Prime factors that occur more than once can be summarised with exponentiation:

$$3^4\times 5\times 7^2$$

Therefore natural numbers can be represented by a multi-set of prime numbers, each of them pointing to their exponent:

$$\{3:4, 5:1, 7:2\}$$

But if we want to express numbers purely in prime numbers, what is to be done with this "alien" number $$4$$ that appears inside the representation. A straightforward solution is that this number, too, gets decomposed, that is

$$2\times 2=2^2\equiv\{2:2\}$$

This is a recursive step. In other words, the exponents in the multi-set representing a natural number are themselves natural numbers and can thus in turn be represented by multi-sets over prime numbers. In the interest of avoiding illegible bracketings when writing multi-sets nested within multi-sets arbitrarily deep, a tree-shaped notation is advisable. In our case:

$$19845 \equiv$$

<div class="mxgraph" style="border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;toolbar&quot;:&quot;layers lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile modified=\&quot;2019-06-10T13:34:26.376Z\&quot; host=\&quot;www.draw.io\&quot; agent=\&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36\&quot; etag=\&quot;BmiL7g1-wmavhmaw9v_t\&quot; version=\&quot;10.7.5\&quot;&gt;&lt;diagram id=\&quot;hVIxuqVEzdTEunJplugI\&quot; name=\&quot;Page-1\&quot;&gt;7Vlbc6IwFP41PjaTCwR4bG23nc50Z2d8aHffqERgFgmLWLW/fkOTABEvaNeq2zoZJCcnOcl3viTHY4/0x/Pb3M+iBx6wpIdhMO+R6x7GCEMovkrJQkqojaQgzONAKdWCQfzKlFD1C6dxwCaGYsF5UsSZKRzyNGXDwpD5ec5nptqIJ6bVzA9ZSzAY+klb+hgHRSSlrg1r+R2Lw0hbRnrBY18rK8Ek8gM+a4jITY/0c84L+Tae91lSgqdxkf2+rWmtJpaztOjS4f72cRTdf3+46/PHxXP863c6eL1AthzmxU+masVqtsVCQxDmfJopNZYXbL4KeP9Zq8P2xFC1XMETxsesyBdCRQ2keyiGYATUpGY14MilUhY1wCa6p6+cHFZj1ziIFwXFLrBsR0WMIjgoKlezKC7YIPOHZctMbAMhi4qxMHiNxKs/ySQxR/GcCaNXa6FsQrbBW2uBpA5wqVUXpwWjDQF2YKNYbVTX6fxzkHEHkNPgstzEopbylJnACqzyxZOoQEEYVf3ZbLsucYFVbaFr87h40nri/WdDXncpK7qHnBcLWkdFJ3+JFfFpPmQbFJWnCj8P2cYBV/vf8PAqj0pZzhK/iF/MRaxyq7Lwg8dieRW9LAc4Nq0LNbYtQhYQ56KDLP00x5cYqCGbx9SSFQQtQBB0q2JYcQlwoWdjop5Li5AAtoy80bPCa3/GkvcyVjFPEVZxDx2Xe/pW3cY9ekzueQg4FsF1MbkHKaDNj7Mf9zZboS5o0tteMnJg7lmfmXtr7r2P4R6CCCDqekgXvAstOp97xAYO9uqyG8UPzL5VYSJNBM5XI/62ipqG9M+U64aLyVtAfykULJjN60bxFpbfjh5GzEqOJOXnEG5t8Zg4TKzmhUhOOxqjaz08yfx0fw/bDQ/Lkc7Hw1TsuUYkgtA5O9g50BYm57iFz9OF7oFciM/YhcixQfVzoHxap+1D78uHLR9i2wPQcijy5BOdtgt1bvJomQszhj9y7sLtGMM7x4zhLzCwRbzWKGb2gtgu2JBX6BrEYxd40LbqQkwrywnLA0ftqEse89MQ1etIVPeLqB9OVPx1K+76+xK5GBj5Vnrit+a7s6f/02GkGX/aqa+tp5FDAGl+9kx+bTuOyOoY/92nk6jWf8BK9fpvbHLzFw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://www.draw.io/js/viewer.min.js"></script>

The root has no label since it serves merely to group the top-most labelled nodes. All nodes below the root are labelled with prime numbers. So the following function reconstructs the natural number that a given prime number tree expresses. It takes a node $$x$$ as an input and exponentiates $$x$$'s label by the product of the values of $$x$$'s subtrees, which are calculated recursively.

$$f(x) = \left\{
	\begin{array}{ll}
		\Pi_{c\ \in\ \mathrm{children}(x)}f(c) & \mathrm{if}\ x\ \mathrm{has\ no\ label}\\
		\mathrm{label}(x)^{\Pi_{c\ \in\ \mathrm{children}(x)}f(c)} & \mathrm{otherwise}
	\end{array}
\right.$$

If $$x$$ is a leaf node, $$f(x)=\mathrm{label}(x)$$ since $$\Pi_{c\ \in\ \mathrm{\emptyset}}f(c) = 1$$.