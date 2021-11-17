# MDViewer 2.0
After working with the previous iteration of MDViewer for over 2 years I have decided it was time for a major rewrite for a couple of reasons:
1. All the experience of running hundreds of sessions with this tool has taught me where its value lies.
2. Frankly the previous codebase is an enormous terrifying mess
3. I need something that is more easily distributable, hopefully NW.js delivers.

## What is this?
MDViewer is a very simple application at its heart. It is a wiki-like application that allows you to create simple markdown files that are linked between eachother. This structure happens to be the exact structure which is amazing for DM'ing Dungeons and Dragons, but I can imagine this is useful in other projects as well. 

## How to build
This is mostly here as a reminder for myself:
1. Run `npn run build`, you can abort as soon as the production build is made.
2. Copy all files from the build folder into a normal NW js build folder that contains the `nw` executable.
5. Profit.
6. Optionally remove some files that are not strictly necessary for the build (This seems slight unstable):
 1. ffmpeg
 2. All locales except for one that it needs to boot
