# Installation

```
yarn
```

GatsbyJs server will start in `localhost:8000`

```
// For starting NextJs Server run
yarn next-dev
```

NextJs Server will start in `localhost:3000`

# Folder Structure

```
/packages
	/landing [NextJs version of the project]
```

# Stack We Have Used

1. Yarn Workspace
1. React Js and Next Js
1. Styled System and Styled Components
1. 腾讯 Serverless 云服务

# Development

Follow the below procedure to go with the development process.

## NextJs

For any specific template like the template under `/app` route. If you want to use this template only, then you have to follow below procedure.

1. Go to `/landing/pages/`
2. now copy all the content from `app.js`
3. Paste all the content in `/landing/pages/index.js`

Now for cleaning the unused code in your project follow the below procedure.

1. Now you can delete all other pages except `_app.js`, `_documents.js` and `_error.js`. That mean in your `/pages` folder you will have four files `index.js`, `_app.js`, `_documents.js` and `error.js`
2. From `/landing/containers/` folder you can delete all other folder except `App` and `Error`
3. From `/common/assets/image/` folder you can delete all other folder except `app`. Do not delete any files from there like `404.svg`, `error.svg` etc.
4. From `/common/data/` folder you can delete all other folder except `App`.
5. From `/common/theme/` folder you can delete all other folder except `app`. Do not delete the `index.js` file.

To start the server for `nextjs` you have to run `yarn nextjs-dev` and the server will start on `locahost:3000`.

# Explaining Containers

In the `containers` directory you will get folder for our every template. If you want to use App template. Then in the `App` directory you will get folders containing different section of the template like `Banner`, `Footer`, `Testimonial`, `Navbar` etc.

All of these containers contains regular reactjs code.

# Deployment

### NextJs

To build the nextjs version run below commands.

```
yarn next-build

// To check the build version locally run below command
// Not necessary if you don't want to check on your local.

yarn next-start
```

If you want to host the static html version of your nextjs project then run the below command to build static version

```
yarn next-export
```
