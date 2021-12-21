# Schedule Selector

This is a simple and crude implementation of a filter to construct a personalized schedule for the semester based on the courses you are taking. 

This project was the perfect excuse to use my newfound knowledge on frontend web design (implementing this in a collab notebook using python ofcourse  would've been far far cleaner). 

As a result, much of the code might be spaghetti, and older browser version compatiblity was not taken into consideration at all. If anyone wants to extend the features, feel free to do so!

## An unfortunate quirk
The dean office provides the schedule to us in PDF format, so I had to convert it to a CSV by means of an online service (which did a half-decent job). After which, I had to introduce some delimiters ("|") to split multiple courses in the same slot, and the final CSV table is hardcoded into the HTML file itself (which the JS script processes into a more convenient form, thereafter).

This process is now automated using the [tabula software](https://github.com/tabulapdf/tabula-java) which requires java to be installed, and a python3 script.

**Note:** It turns out that the deanacad office uses different formats every semester which complicates the parsing procedure. As of now, it is being maintained by tweaking the tabula commands and manually cleaning the data, however, the way to go forward is to request a standard CSV format from the deanacad directly.

## Update the timetable

On a linux machine

0. Install java jdk11, python3
1. cd into repo
2. run `chmod +x ./makett`
3. Download to newest timetable to `./tt.pdf`
4. run `./makett`

The script downloads the libraries if necessary and updates index.html

## Change the frontend

Edit `index-template.html` for any changes. All changes to index.html are lost on timetable update.
Make sure that the `{{ datadiv }}` line is unaltered somewhere within the body div as the script parses this to create the timetable.

## To Do
- [x] Color picker to change the base website color.
- [x] Export options
- [x] Automate pre-processing of the table
