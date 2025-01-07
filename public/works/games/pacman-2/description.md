## What libraries/packages were used to make this?

The code was written in TypeScript, to allow for better debugging and overall tighter code.

No other libraries were used in this project.

## Design

This is my second attempt at creating a Pac-Man game to upload to this portfolio. The first version is coming soon - I still need to re-upload it to this new iteration of my website.

You can immediately spot a few differences, including the graphics and the 'High Scores' feature. Looking at the
code, the differences become far starker.

The old version of Pac-Man was my third code project. Ever. Due to my inexperience at the time, I had put all of
my code in one JavaScript file.

There was no class-based architecture, minimal comments anywhere (to my great dismay later on), and many other
design decisions that I still cannot figure out the logic behind.

In terms of navigation, the old version was using a repurposed collision structure I had built for the [Mario](/work/game/luigi) game.
The characters' movement was based on whether they had walls in their way
&#8212; if there was a wall, the character could not move in that direction, otherwise, they could.

This worked perfectly fine while the character moved at 1 pixel/second. However, once they sped up, the
navigation system began to break. Ghosts and players would often try to turn at an intersection and fail, which
proved to severely hinder gameplay.

![](/works/games/pacman-2/images/writeup/pacman-pre-hall.png)
[caption](In this frame, Pac-Man is approaching the intersection. If he travels at 1px/second, he will reach the intersection next frame and be able to turn.)

![](/works/games/pacman-2/images/writeup/pacman-past-hall.png)
[caption](However, if he is moving at **2px/second**, he will pass by the intersection, never turning no matter how much the player tries, since he is _always touching a wall_.)

Hence, Pac-Man Version 2 implements an entirely different navigation strategy: a graph of nodes. Instead of
deciding whether the character can move based on whether they are touching a wall, the characters' movements
are based on whether there is a _path_ in that direction.

![](/works/games/pacman-2/images/writeup/node-map.png)
[caption](The node-based navigation structure of Pac-Man Version 2.)

This means that, looking at the code, one can see that _there are no walls_. The walls no longer exist in
this version of the code &#8212; there are only paths.

![](/works/games/pacman-2/images/writeup/node-map-no-walls.png)
[caption](Even with the walls removed, the game works as normal.)

This approach has resolved the navigation problems, and improved gameplay immensely.
