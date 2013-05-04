Installation
============

So to work on the source of this, as one will if they want to make changes, there are a few prerequisites.  These instructions should work for Mac & Linux.

First would probably be [Node.js and NPM](http://nodejs.org/download/).

You'll then need [Yeoman 1.0b](http://yeoman.io/), which you will install with NPM.

The Yeoman installer should install both Grunt & Bower, however if it does not then run:

	npm install -g grunt bower

Once Grunt & Bower are installed, run:

	npm install && bower install

If you would like to make any changes to the CSS, Sass, or styles in general, you will probably want to have Sass & Compass installed.  If you want to install Sass & Compass you're going to have to have [Ruby & Ruby Gems](http://www.ruby-lang.org/en/downloads/).  I'm pretty sure if you're using a Mac you should already have these.  To install Sass & Compass simply run:

	gem install sass --pre && gem install compass

That should do it for dependencies!  FYI I write `--pre` there so that you can get sourcemaps for the Sass and at the time of writing those are still on the pre channel.

Development
===========

In development you may want to run the follow from the root of the project folder.

	sass --watch --compass --sourcemap app/styles/main.sass:app/styles/main.css

and

	grunt server

You can then visit the page at `localhost:3272`.  This page will be automatically updated by Grunt as you make changes; shouldn't be any need to hit the reload button!

Production
==========

When you want to deploy just run the following:

	grunt build

…which will compile everything and perform an array of optimizations, ultimately copying it's files into the `dist` directory.

To deploy you then simply have to upload the contents of the `dist` folder.
