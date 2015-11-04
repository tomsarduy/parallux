# jQuery Parallux [![Build Status](https://secure.travis-ci.org/jquery-boilerplate/jquery-boilerplate.svg?branch=master)](https://travis-ci.org/jquery-boilerplate/jquery-boilerplate) ![Bower Version](https://badge.fury.io/bo/jquery-boilerplate.svg)

### Parallax for everything without complications

I have been trying to find a light jquery parallax plugin, to do parallax with any kind of content (video, images, texts, sliders), but there was just few options and most of them just support background images and the performance was not good enough, and no fallback for old browsers not supporting translate3D. At the end, I came up with my own solution after reading and investigate about the current support/issues/bugs with the parallax scroll effect.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.parallux.min.js"></script>
	```

3. Set the HTML scructure:

	```html
		<!-- Parallax Item -->
		<div class="parallux">

			<!-- Background layer -->
			<div class="parallux-bg">

				<!-- Div for parallax efect -->
				<div class="parallux-inner">

					<!-- Any HTML elements you want -->

				</div>

			</div>

			<!-- Parallax foreground -->

		</div> 
	```

4. Call the plugin

	```javascript
	$("#element").parallux({
		fullHeight: true,
    enableMobile: false,
    onImageLoad: 'fadeIn'
	});
	```

##Features

####Parallaxing everything

You can add all kind of content inside the background layer, it will works. I tested with videos, images (`<img>` tags), background, sliders (slick), text, and it works just fine, since CSS3 translate3D create a layer and use hardware accelerator.

####Foreground and Background layers

Sometimes you may want to add some elements inside the parallax wrapper that use the normal scroll speed, so I added a layer for foreground elements and another one for the background layer (the real one doing parallax), check the demos and you will see what I'm talking about.

####Fallback for Old Browsers
If the browser don't support translate3D, I decided to not do parallax at all. But the layer will be fixed in the background, so it will be very similar. Is proved that the scroll performance animating `position-x` and `position-y` will be a problem.

####Fallback in Mobile
In the last version of Safari and Chrome for mobile, there is already support for translate3d! That is great, but still is not very smooth and depends a lot of the mobile hardware. For example, in Safari and iPhone 6 works great, but not in Chrome in a regular Android device, so I added an option (`enableMobile=false`) and it's up to you to enable parallax on mobile devices.

####Crossbrowser issues resolved
You don't want to know how many crossbrowser issues I went trough while developing this plugin, but most of them are resolved using CSS hacks and scroll improvements, thanks to [StackOverflow](stackoverflow.com/users/670377/tom-sarduy)

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.parallux.js
│   └── jquery.parallux.min.js
├── src/
│   ├── jquery.boilerplate.coffee
│   └── jquery.boilerplate.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── boilerplate.jquery.json
├── Gruntfile.js
└── package.json
```

#### [demo/](https://github.com/jquery-boilerplate/boilerplate/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/jquery-boilerplate/boilerplate/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/jquery-boilerplate/boilerplate/tree/master/src)

Contains the files responsible for your plugin, you can choose between JavaScript or CoffeeScript.

#### [.editorconfig](https://github.com/jquery-boilerplate/boilerplate/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/jquery-boilerplate/boilerplate/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/jquery-boilerplate/boilerplate/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/jquery-boilerplate/boilerplate/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [boilerplate.jquery.json](https://github.com/jquery-boilerplate/boilerplate/tree/master/boilerplate.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/jquery-boilerplate/boilerplate/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/jquery-boilerplate/boilerplate/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Guides

#### How did we get here?

Have you got in this repo and still not sure about using this boilerplate?

Well, extending jQuery with plugins and methods is very powerful and can save you and your peers a lot of development time by abstracting your most clever functions into plugins.

[This awesome guide](https://github.com/jquery-boilerplate/boilerplate/wiki/How-did-we-get-here%3F), adapted from [jQuery Plugins/Authoring](http://docs.jquery.com/Plugins/Authoring), will outline the basics, best practices, and common pitfalls to watch out for as you begin writing your plugin.

#### How to publish plugins?

Also, check our guide on [How to publish a plugin in jQuery Plugin Registry](https://github.com/jquery-boilerplate/boilerplate/wiki/How-to-publish-a-plugin-in-jQuery-Plugin-Registry
)!

**Note:** The jQuery Plugin Registry is in read-only mode. New plugin releases will not be processed.
jQuery recommends moving to [npm](https://www.npmjs.com/), using ["jquery-plugin"](https://www.npmjs.com/browse/keyword/jquery-plugin) as the keyword in your package.json. See [how to publish into npm registry](https://gist.github.com/coolaj86/1318304).

## Team

jQuery Boilerplate was made with love by these guys and a bunch of awesome [contributors](https://github.com/jquery-boilerplate/boilerplate/graphs/contributors).

[![Zeno Rocha](http://gravatar.com/avatar/e190023b66e2b8aa73a842b106920c93?s=70)](http://zenorocha.com) | [![Addy Osmani](http://gravatar.com/avatar/96270e4c3e5e9806cf7245475c00b275?s=70)](http://addyosmani.com) | [![Helder Santana](http://gravatar.com/avatar/63fb620ee7d14fc91030d4349d189b3e?s=70)](http://heldr.com)
--- | --- | --- | --- | --- | --- | ---
[Zeno Rocha](http://zenorocha.com) | [Addy Osmani](http://addyosmani.com) | [Helder Santana](http://heldr.com)

## Contributing

Check [CONTRIBUTING.md](https://github.com/jquery-boilerplate/boilerplate/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/jquery-boilerplate/jquery-boilerplate/releases) for detailed changelog.

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
