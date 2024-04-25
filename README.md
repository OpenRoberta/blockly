## Blockly

Google's Blockly is a web-based, visual programming editor. Users can drag
blocks together to build programs. All code is free and open source.

**The project page is https://developers.google.com/blockly/**

You use this git repo to build the `msg` directory and the `blockly-compressed.js` for the Open-Roberta lab.

## Build the Resources for the Open-Roberta Lab

On linux systems one possibility is

-   you have the closure-library next to this project
    (you need version [20200719.0.0](https://github.com/google/closure-library/archive/refs/tags/v20200719.zip))
    make sure to remove the version number from the folder name. buily.py requires the closure-library folder to be named `closure-library` 
-   you have installed the closure compiler via npm:
    -   e.g. `npm install --save google-closure-compiler@20200719`
    -   check the version: `npx google-closure-compiler --version` => `v20200719`
-   you have installed python 2.7 (:-<)
-   run the `build.py` script

A second solution is to install docker. Then run

```bash
GIT=:your-blockly-git-full-path:
docker run \
       --mount type=bind,source=$GIT,destination=/opt/blockly/blockly \
       -u $(id -u):$(id -g) \
       openroberta/blocklybuilder:22.04
```

You can put everything into one line, of course. The strange looking `-u` parameter is needed to give correct
ownership and permission to the files generated if docker runs as non-root.

## Workflow

-   you have cloned the blockly git https://github.com/OpenRoberta/blockly.git into `:your-blockly-git:`
-   you have a feature branch `git checkout -b feature/myChanges`
-   you edit a file in the `blocks` folder to add or change a blockly block and edit the file
    `robMsg/robMessages.js` to add or change a message and then re-build the resources. Use one of the possibilities described above.
    _Never_ change a file in the `msg` folder, because these changes are overwritten by the next build.
-   check your changes in the blockly playground found in the directory `tests`. One of the many playgrounds
    will fit your need. You may copy one and modify it. If you are satisfies with your results, continue.
-   try your results in the Open-Roberta lab: copy the `msg` directory and the `blockly-compressed.js` into
    `:your-openroberta-lab-git:/OpenrobertaServer/staticResources/blockly`. If you are satisfies with your results, continue.
-   rebase your feature branch in the blockly repo against master: `git fetch;git rebase master`
-   merge your feature branch in the blockly repo into master:
    `git checkout master;git merge feature/myChanges;git push`
-   later delete your feature branch `git branch -d feature/myChanges`
-   your changes to blockly are now persisted in the `blockly` repo **and** contained in your
    `:your-openroberta-lab-git:`. You have to commit these changes in your feature branch in the openroberta
    repo and you'll should soon merge your changes to `develop`!

Note, that the `blockly` repo only provides a `master` branch. There is no high traffic and thus it ok to simplify the repo structure.

## How to create the blocklybuilder image

```bash
cd z-docker
docker build -t openroberta/blocklybuilder:22.04 .
```

Look into the `Dockerfile` to see what is stored in the image
