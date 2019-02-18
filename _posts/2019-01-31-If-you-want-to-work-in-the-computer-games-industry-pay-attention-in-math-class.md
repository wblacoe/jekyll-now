---
layout: post
title: If you want to work in the computer games industry pay attention in math class
tags: [Computer Science, Games, Mathematics]
---

<img class="floatright" src="/images/computer-graphics.jpg" />
I volunteer as an advisor to a group of teenage boys at my local church. I offered them to give a presentation about computer games and 3D graphics. I'm sure that there is a general interest in computers among them, at the very least in gaming. Some of them are even considering a career in IT. My goal is to have a positive influence on these boys with my presentation. If they are like the majority of middle and high school students, they know little of the value and applicability of mathematics. Their math classes usually seem too dry and abstract at this point. Unfortunately the curriculum at many schools don't make mathematical methods more appealing by tying them to every-day and work-related situations. Physics, chemistry and biology, for example, do a better job at appearing relevant to students because the math is usually applied to problems that are closer to home, like driving a car on ice or drinking a lemonade in summer vs. winter.

Through studying and working, I have seen for myself how useful a knowledge of mathematics is. So I want them to develop an interest in it, too, as early as possible. To begin with, I thought I would supply them with a bridge to mathematics based on computer games. I want to start the talk with lots of screenshots from ancient and more recent computer games. This will be useful in showing how computer graphics has evolved from the 1980s to the present. A visual history of the relevant computer hardware, the algorithms applied to  vectors and polygons, and the creative effects that people have come up with will hopefully motivate them to learn about the theoretical side: the mathematics required to achieve those cool results.

The mathematical portion of the talk will then cover the pipeline that each polygon goes through:
- modelling and placing objects in a three-dimensional scene
- lighting the objects and the environment
- situating and rotating the (virtual) camera correctly
- projecting the scene from the camera's perspective onto the two-dimensional screen

Most of these operations make use of vectors and matrices. A polygon is made up of (usually 3) dots and the edges connecting them. The position and orientation of a polygon is specified by vectors. The colour of a polygon or pixel is defined by a vector. Moving, scaling and rotating polygons happens by manipulating all positional vectors for the polygons. Such manipulations are achieved by multiplying the affected vectors by a matrix which encodes the respective transformation. The position and direction of light sources and the camera are all encoded as vectors. When designing all of these elements and letting them interact, spacial thinking and a vivid imagination are essential. But the process can be full of fun and creativity.

Update: Here are the [slides to my 3D graphics presentation](https://docs.google.com/presentation/d/18X_RMmXz21Tipj4KuxPUDTJnbkjf0rIseQ96Dg8BF3s/edit?usp=sharing).