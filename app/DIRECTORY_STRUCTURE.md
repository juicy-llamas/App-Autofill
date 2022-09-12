### Note: lmk if there are problems with scripts / assets not loading, if so I might need to put HTML files at the root.

# Directory Structure
### ui
The user interface related stuff.
- There's a folder for each separate webpage (with it's own CSS/SASS folders), and global CSS/SASS folders as well if you want to have continuous style.
	- You can totally change this if you want. I also edited the `style.css.map` file to reflect the directory changes, though @JBLorincz you may want to check that this does not fuck up your build process.
- You may want to add scripts
### content_scripts
These are the scripts that are run for content, aka every webpage the user loads up. This is one of the elements of the 'back end' of the extension, the part that does the autofilling / etc.
### assets
Any non-code items, like icons or images.

### That's it so far, change this as you see fit. Also if you guys want another way to present this info, lmk in an issue / discord ping (maybe both actually).
