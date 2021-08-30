## Schedule Selector

This is a simple and crude implementation of a filter to construct a personalized schedule for the semester based on the courses you are taking. 

This project was the perfect excuse to use my newfound knowledge on frontend web design (implementing this in a collab notebook using python ofcourse  would've been far far cleaner). 

As a result, much of the code might be spaghetti, and older browser version compatiblity was not taken into consideration at all. If anyone wants to extend the features, feel free to do so!

### An unfortunate quirk
The dean office provides the schedule to us in PDF format, so I had to convert it to a CSV by means of an online service (which did a half-decent job). After which, I had to introduce some delimiters ("|") to split multiple courses in the same slot, and the final CSV table is hardcoded into the HTML file itself (which the JS script processes into a more convenient form, thereafter). 

### To Do
- ~~Color picker to change the base website color.~~
- Export options
- Automate pre-processing of the table
