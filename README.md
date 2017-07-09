# jQuery Parallux

### Parallax everything

I have been trying to find a light jquery parallax plugin, to do parallax with any kind of content (video, images, texts, sliders), but there was just few options and most of them just support background images and the performance was not good enough, and no fallback for old browsers not supporting translate3D. At the end, I came up with my own solution after reading and research about the current support/issues/bugs with the parallax scroll effect.

## Demos

https://tomsarduy.github.io/parallux/

## Usage

1. Just add a link to the css file in your `<head>`:

	```html
	<link rel="stylesheet" href="../dist/jquery.parallux.min.css">
	```

1. Then, before your closing `<body>` tag add:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
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
	$(".parallux").parallux();
	```

## Package Managers

```sh
# Bower
bower install --save parallux
```

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
fullHeight | boolean | true | Enable/disable full page parallax. Check `demo1.html` and `demo2.html` for full page, `demo3.html` for auto height parallax.
onMobile | string | scroll | Define the behavior of the plugin for mobiles. The `"scroll"` option will show the parallax section one under the other, `"fixed"` will simulate the parallax effect, but without transitions and the `parallax` option will apply the parallax effect, only recommended for latest devices.

## Features

####Tiny and simple
With ~6kb only, and just 4 options, the plugin is quite simple and straight forward

#### Parallaxing everything

You can add all kind of content inside the background layer, it will works. I tested with videos, images (`<img>` tags), videos, background, sliders (slick slider), text, and it works just fine, thanks CSS3 translate3D hardware acceleration.

#### Foreground and Background layers

Sometimes you may want to add some elements inside the parallax wrapper that use the normal scroll speed, so I added a layer for foreground elements and another one for the background layer (the one doing parallax effect). Check the demos and you will see what I'm talking about.

#### Fallback for Old Browsers
If the browser don't support translate3D, I decided to not do parallax at all. But the layer will be fixed in the background. Is proved that the scroll performance animating with javascript `position-x` and `position-y` will be a problem.

#### Fallback in Mobile
In the last version of Safari and Chrome for mobile, there is already support for translate3d! That is great, but still is not very smooth and depends a lot of the mobile hardware. For example, in Safari and iPhone 6 works great, but not in Chrome in a regular Android device, so I added an option (`enableMobile=false`) and it's up to you to enable parallax on mobile devices. Works great in last versions of Chrome and Safari.

#### Crossbrowser issues resolved
You don't want to know how many crossbrowser issues I went trough while developing this plugin, but most of them are resolved using CSS hacks and scroll improvements, thanks to [StackOverflow](https://stackoverflow.com/users/670377/tom-sarduy). 

## Structure

The basic structure of the project is given in the following way:

```
├── demos/
├── dist/
│   ├── jquery.parallux.min.css
│   ├── jquery.parallux.css
│   └── jquery.parallux.min.js
├── src/
│   ├── jquery.parallux.js
│   └── jquery.parallux.scss
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── bower.js
├── CONTRIBUTING.md
├── gulpfile.js
├── LICENSE
├── package.json
└── README.md
```

#### [demos/](https://github.com/tomsarduy/parallux/tree/master/demos)

Contains some demos to demonstrate the plugin.

## Authors

[Tom Sarduy](https://github.com/tomsarduy)  
[Yoan Ribot](https://github.com/yoanribot)

## Contributing

Create a pull request, issue or send me a message [@TomSarduy](https://twitter.com/TomSarduy)

## License

[Apache License](https://github.com/tomsarduy/parallux/blob/master/LICENSE) © Tom Sarduy
