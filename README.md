# scryfall_test_public

0. Install all dependencies
  ```
- npm i
- cd .\frontend\
- npm i
```
2. Build the frontend
```
ng build
```
2. Run the server
```
cd ..
npm run server
```
(You can ignore the mongoose error since there is no .env file)

3. Try it out with Postman
```
http://localhost:7090/api/posts/scryfall/collection
```
```
{
  "identifiers": [
    {
      "id": "683a5707-cddb-494d-9b41-51b4584ded69"
    },
    {
      "name": "Ancient Tomb"
    },
    {
      "set": "mrd",
      "collector_number": "150"
    }
  ]
}
```
