## API Basejump: Image Search Abstraction Layer 
By Eric Ochoa "eric8ah"

For [Free Code Camp](http://freecodecamp.com) - [Back-End Project: Image Search Abstraction Layer](https://www.freecodecamp.com/challenges/image-search-abstraction-layer)

This is a microservice API project for freeCodeCamp. This will accept a search term and will return a list of 10 results. The results will include the
name of the image that is returned, the url to the image, and the web url to the page the image was found on. You may paginate the results by entering
the ?offset=(number). Finally you may also find the search history and the times they terms were searched for by following the /latest/imagesearch path.
### Usage Examples

```
https://eric8ah-image-search.herokuapp.com/api/imagesearch/dogs
```
```
https://eric8ah-image-search.herokuapp.com/api/imagesearch/dogs?offset=10
```
```
https://eric8ah-image-search.herokuapp.com/api/latest/imagesearch
```


### Live Site
[https://eric8ah-image-search.herokuapp.com/](https://eric8ah-image-search.herokuapp.com/)