# bus-mall

2/22/2022
  - worked with Nathan to help with rendering images that won't appear subsequently on next set of 3 images 
  - learned how to to render images that won't appear subsequently on next set of 3 images
  - learned how to create a table with bars through javascript and CDN



2/23/2022
Today I learned about JSON and local storage.  Overall implementing the code is straight forward but what goes behind the scenes is much more complicated.  My key takeaways are:

- stringifying turns an object into a special string, each part of this special string is called keys. Similar to an array with individual elements

- local storage itself is an object, so after we stringify this special string becomes a property inside the local storage object

- when you stringify an object from a constructor it strips away what is instanitiated from that constructor.  AKA when you stringifying funcitons will not be included, they essentially just go away.  You need to write another function after parseing to get that method into your object that you strigified. 


2/25/2022 
- application is completed and added some CSS to make the styling better/easier to read
- application provides random set of images (without repeating any image twice) for the user to click on to vote. Upon 25 iterations the data is presented in graph form at the bottom of the page to the user to see what was selected and what was viewed.  The datat is saved for each iteration locally so data can be collected without resetting each time the page is refreshed. 