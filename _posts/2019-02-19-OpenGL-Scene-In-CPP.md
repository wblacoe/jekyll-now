---
layout: post
title: OpenGL Scene in C++
tags: [Computer Science, Computer Graphics, Programming, C++]
---

<img class="floatright" src="/images/zwerg.png" />
During my time as a student I attended several courses on 3D computer graphics. One of them was on the mathematical basics and their implementation in OpenGL. It was fun to work on my visual imagination and spacial reasoning. After going over linear algebra again, we developed our intuitions about the geometry and trigonometry required for creating some of our own little worlds.

The final project was called Wonderland. It was supposed to show various basic shapes and bodies, some of them texturised. A torus definitely needed to be a part of it, as it was the professors favourite 3D body. Some elements of the scene should be animated. The camera was to move around the scene, showing all of the elements, and return to its original position. On its ride the camera was supposed to move through a tunnel in which a light was to switch on only during the traversal. Besides that, there was to be some transparency, and diffuse and specular lighting.

To start this project I imagined a scene that a little story: At night a group of garden dwarves meet in the park and dance in a circle. This narrative served as an anchor for my filling the scene, rather than creating a random collection of abstract shapes. I did not need to draw anything on paper because I was able to have a lively, colourful image of the scene in my mind. It was also simple enough to create one element at a time.

What I call a scene element is, for example, a torus, a dwarf, a bench, etc. each of these bodies are made of elementary 3D shapes, such as cuboids, cones, frustums and spheres. All of these are a collection of triangles, the only polygon which is guaranteed to be planar. Dividing the programmatic creation into distinct levels of abstraction is helpful, so that lower-level bodies can be reused over and over for building higher-level bodies, just with different parameter values for size, position, orientation, material, colour and/or texturisation.

Below is a recording of the camera ride through my Wonderland project from my time as a student:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PNN-3Si1Nys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To view the **code** go to this [repository](https://github.com/wblacoe/opengl_wonderland).