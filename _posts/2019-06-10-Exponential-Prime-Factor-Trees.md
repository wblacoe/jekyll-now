---
layout: post
title: Exponential Prime Factor Trees
tags: [Mathematics, Number Theory, Prime Numbers]
---

<img class="floatleft" src="/images/zeta_polar.png" />
We usually think of the **natural numbers** 1, 2, 3, ... as elements on a straight line that extends infinitely. That is, the relationship between 2 and 3 is the same as between 3 and 4 and so on: they have the same distance between them. In the case of a distance of 1 we might call them neighbours. This perspective focuses on the linearity and additivity of numbers: the linear distance from one number to another number can be expressed as a number. Human thinking is intuitively linear in many situations, even when that does not reflect the entire nature of the considered system. Examples include systems of exponential growth or exponential decay, or systems that involve subtle interaction among subsystems whose behaviour cannot be predicted by assuming "more of $$x$$ means (proportionally) more of $$y$$".


<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

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

<p style="text-align: center">
$$19845 \equiv$$
<img src="/images/primes_tree.png"/>
</p>

The root has no label since it serves merely to group the top-most labelled nodes. All nodes below the root are labelled with prime numbers. So the following function reconstructs the natural number that a given prime number tree expresses. It takes a node $$x$$ as an input and exponentiates $$x$$'s label by the product of the values of $$x$$'s subtrees, which are calculated recursively.

$$f(x) = \left\{
	\begin{array}{ll}
		\Pi_{c\ \in\ \mathrm{children}(x)}f(c) & \mathrm{if}\ x\ \mathrm{has\ no\ label}\\
		\mathrm{label}(x)^{\Pi_{c\ \in\ \mathrm{children}(x)}f(c)} & \mathrm{otherwise}
	\end{array}
\right.$$

If $$x$$ is a leaf node, $$f(x)=\mathrm{label}(x)$$ since $$\Pi_{c\ \in\ \mathrm{\emptyset}}f(c) = 1$$.

This way of approaching the nature of numbers opens a whole new field of possibilities for working with them. In a **future post** we will analyse what the consequences of this type of number representation are. How does this perspective change the relationships among numbers? What arithmetic operations can we define over numbers? What are the advantages?