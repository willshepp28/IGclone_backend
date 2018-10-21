# Instagram Clone (backend)


----

**What is this?** 

This is the api,to own version of instagram.

Check out the application live at http://localhost:4200/login
Check out the front end code at https://github.com/willshepp28/IGclone_frontend

---


## Technologies Used

```js
 Bootstrap
 Express
 Angular 6
 Knex/ PostgreSQL
 AWS S3
 
```





## Folder Structure 

```
├── Procfile
├── api
│   ├── Api.js
│   ├── commentsApi.js
│   ├── discoverApi.js
│   ├── followApi.js
│   ├── hashtagApi.js
│   ├── imageUploadApi.js
│   ├── likesApi.js
│   ├── postApi.js
│   ├── saveApi.js
│   └── totalApi.js
├── app.js
├── config.js
├── db
│   ├── knex.js
│   ├── migrations
│   │   └── 20180727162342_all_tables.js
│   └── seeds
│       ├── 01_Users.js.js
│       ├── 02_Posts.js
│       ├── 03_Comments.js
│       ├── 04_Follower.js
│       └── 05_SavedPost.js
├── helper.js
├── knexfile.js
├── package-lock.json
├── package.json
├── secret
│   ├── aws-config.js
│   └── config.js
└── upload
    └── 96319a506a03.png


```



  ## Requirements

  - User should be able to register
  - User should be able to login
  - User should be able to post content
  - User should only be able to see the posts of users that they are following
  - Users should be able to see their own profile page
  - Users should be able to see the profile pictures of others users
  - Users should can go see other profile pictures, but wont be able to actually see the posts of users they arent following.
  - Users should be able to search for content associated with certain tags
  - Users should be able to like post
  - Users should be able to unlike posts
  - Users should only get be able to like one time per post
  - Users should be able to comment on posts

