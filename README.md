# WELCOME TO CHEWSY!
Chewsy is a single-page web application that helps you find your next favorite restaurant, one dish at a time.

## Getting Started
### To run locally
1. Go to [src/components/authentication/auth0-variables.js] and make sure (callbackUrl: 'http://localhost:3000/callback') is active and (callbackUrl: 'https://www.chewsy.net/callback') is deactivated.

2. Go to [src/modules/settings.js] and activate (appDataURL: "http://localhost:5002") and make sure (appDataURL: "https://cors-anywhere.herokuapp.com/https://api.chewsy.net") is deactivated.

3. install json-server:
    >npm install -g json-server

4. install necessary dependencies:
    >npm install

4. cd into [choose-chewsy/api] folder and run appDataURL database on json-server:
    ```
    cd choose-chewsy/api
    json-server -p 5002  -w appData.json
    ```

5. start Chewsy app:
    > npm start


### Dependencies
```
To install all necessary dependencies run npm install in the terminal
```

    "auth0-js": "^9.10.1",
    "bootstrap": "^4.3.1",
    "bulma-start": "0.0.3",
    "express-jwt": "^5.3.1",
    "express-jwt-authz": "^2.3.0",
    "jwks-rsa": "^1.4.0",
    "jwt-decode": "^2.2.0",
    "react": "^16.8.3",
    "react-dom": "^16.8.3",
    "react-loader-spinner": "^2.3.0",
    "react-masonry-component": "^6.2.1",
    "react-ratings-declarative": "^3.4.1",
    "react-router-dom": "^4.3.1",
    "react-scripts": "^2.1.8",
    "react-switch": "^4.1.0",
    "reactstrap": "^7.1.0"



# Default React app README
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
# Tender
