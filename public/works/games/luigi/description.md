The game above is level 1-1 of the original Super Mario Bros. It is the second programming project I ever made - the first, [Lunar Defense](/work/game/lunar-defence), you can also find on this site.

I fear the code it took to make this work. On the upside, it's very easy to port to a new website. However, this is because the entire game was written in one, hulking, 3200-line long `<script>` element. If I remember correctly, this was all originally included directly in the HTML file; I didn't even put it in its own .js file at first. I hadn't heard of TypeScript yet - for that matter, I barely knew what an object was. The `class` keyword didn't appear even once; instead, I constructed objects using a 450-line function setting `this` attributes left and right. The documentation is non-existent, the sprite-switching code is 400 lines of conditional statement spaghetti, and the sheer amount of computations happening to each entity every frame cause the game - originally built for NES hardware - to begin to stutter.

It works though.

That's what I appreciate about this game most. Despite my complete lack of experience, I still managed to pull off a reasonably accurate replica of the first level of Mario. I must have watched videos of the original game over a hundred times, trying to get the various animations frame-perfect. Mario's momentum was another challenge; a relatively higher-level problem that required tons of fine-tuning to get to work accurately to the original. Even the firework animation at the end of the level, which you can trigger by the same little-known mechanic from the original NES game, I managed to port over.

Fifteen-year-old me managed to do all of this without knowing about `class`. For that matter, I barely even knew what a `canvas` was. The canvas code was ripped direct from a [w3schools graphics tutorial](https://www.w3schools.com/graphics/tryit.asp?filename=trygame_canvas) I hardly understood. And I _still_ made it work.

This isn't the sort of project I'd put on my resume. It is, however, one I remain proud of. In part, it's due to how well the final product holds up. In part, it's because I'm proud that I managed to do it at all.
