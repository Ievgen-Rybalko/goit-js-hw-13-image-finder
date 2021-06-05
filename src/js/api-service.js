const URL = 'https://pixabay.com/api/';
const MY_KEY = 'key=21933433-c49aed7af732e0bc1136ba9bb'

export default class ApiService {
    // https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchQuery() {
        const url = `${URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&${MY_KEY}`;
        
        return fetch(url)
            .then(responce => {
                if (responce.status === 200) {
                    console.log('responce.status', responce.status);
                    //console.log('responce.json()', responce.json());
                    return responce.json();
                }
                throw new Error('Error: data not fetched!');
                
            })
            .then(({ hits }) => {
                this.page += 1;
                return hits;
            });
        
        
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
    return this.searchQuery;
    }

    set query(newQuery) {
    this.searchQuery = newQuery;
    }
   
}



// {
//   "comments": 78,
//   "downloads": 63296,
//   "favorites": 558,
//   "id": 1508613,
//   "imageHeight": 2135,
//   "imageSize": 1630104,
//   "imageWidth": 2894,
//   "largeImageURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_1280.jpg",
//   "likes": 575,
//   "pageURL": "https://pixabay.com/photos/cat-animal-cat-portrait-cat-s-eyes-1508613/",
//   "previewHeight": 110,
//   "previewURL": "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_150.jpg",
//   "previewWidth": 150,
//   "tags": "cat, animal, cat portrait",
//   "type": "photo",
//   "user": "cocoparisienne",
//   "userImageURL": "https://cdn.pixabay.com/user/2018/11/26/11-06-29-714_250x250.jpg",
//   "user_id": 127419,
//   "views": 127450,
//   "webformatHeight": 472,
//   "webformatURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_640.jpg",
//   "webformatWidth": 640
// }
