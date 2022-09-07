# Use

## How do I make a browser extension
There are three main components of a browser extension:
- `manifest.json`, which specifies the (broad) actions, permissions, and other sorts of metadata for your extension. You will see in `app/` that there is a `manifest.json` file.
- Pages that are intended for the user to interface with: these are regular web pages coded with HTML, CSS, and can feature JS to link to other parts of the app. They basically follow the same rules that you would if you were developing a normal web page, with one exception.
	- Menus are also coded using HTML, but they are smaller than webpages (often a fixed size). The menu is the thing that pops up when you click on the extension, and is a `browser_action` specified in `manifest.json`.
- Javascript will be the bulk of the application. There are scripts loaded in from webpages (using the `<script>` tag in HTML), run in the background (specified in `manifest.json`, there's a background option), and run at the beginning of loading a page (also specified in `manifest.json`).
Most of the coding will probably be in javascript, given the dynamic nature of the application (autofilling). We will, however, need at least a menu and a teeny little prompt thing on the webpage itself, similar to grammarly or something. The menu will probably be the only true HTML page with the prompt thing being injected in another page via javascript (with `document.createElement` or so, look it up in Mozilla).
### How to learn web development or javascript
- [Mozilla](https://developer.mozilla.org/) is a *great* resource for learning the particulars of extensions, HTML, CSS, and just about anything related to web development. It is my primary reference.
	- **When you google something, click on the Mozilla link first.** Pretty much always, Mozilla will have current, up-to-date, detailed, and browser compatible references and learning articles, whereas I've seen Stack Overflow posts that are like ~10yrs old and either don't work anymore or are bad style.
	- If you want to know how to do something in JS, first google the thing and get a tutorial site, find all of the objects that look like `object.unfamiliarFunction` and are part of the language itself (things that you don't see defined in the code snippet), and then google 'mozilla \[object\]' or search the site itself. For instance, I noticed on a Mozilla article about writing cross-compatible extensions that I didn't know what a promise (Javascript asynchronous call object) was. They had a link to one of their articles, but if I was on another site, I would have googled 'mozilla promise'. The first result is the Promise object with details about the functions you can use with it.
- If you're learning stuff for the first time [W3 Schools](https://www.w3schools.com/) is another really good website that is thorough enough for most beginners. I prefer Mozilla because it covers many more details and is more of a reference, but that quality can also be confusing to beginners, so W3 is a more approchable site for the basics. It's pretty good, but you will notice (somewhat) quickly that you need more details than are provided. In addition, most of the extension-particular stuff that we will be doing isn't covered in W3 Schools, but is in Mozilla, so there's that.
- If you need extension examples in particular, go and [clone this](https://github.com/mdn/webextensions-examples.git) (using `git clone [link]`).

## How to test
You basically have to:
- ~~compile the extension (essentially compress the app folder into a zip file)~~ Actually, in firefox, you just have to select the manifest.json file in the folder itself, and then you will be able to run it. You can also reload your extension as well.
	- You do have to zip it for deployment to, say, the addons page.
- load the extension in a browser (probably using debugging tools)
[Here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension#testing_it_out) is the process for firefox.
Then, your extension will come up as you would expect and you can test it on various sites.

# TODO
- Decide what the features of our app are going to be
- Design and create a menu
- Design a JS script that can scan a forum on a site.
- Etc...
