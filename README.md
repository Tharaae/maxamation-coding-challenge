# Interview Coding Challange - Flickr Images Search
**By _Tharaa Elmorssi_**
---

## App Overview
The application uses existing third-party service (Flickr APIs) to build single page app (SPA) so that end users can use this web app to search photos online.


## App Details

* This application was bootstrapped with `create-react-app` package.

* It initially displays an input field with search icon displayed on the right side.

* When user keys in ‘sydney’ for example, search icon changed to cross icon where user can dismiss to revert to initial state.

* Search Results images, along with author name, are displayed and updated while user entered or updated the key word(s).

* Radio group having 3 options (2, 10, 30) displayed below search box indicating how many photos to be displayed in result page. User has the option to change the number of images displayed.

**_Note that:_**
* Two Flickr APIs are used: Photo Search API and Photo Info API
* The app is responsive to any screen size


## How to run the App as development build

### To run the App as development build:
- Clone the App repository to a folder on your local machine via `git clone https://github.com/Tharaae/maxamation-coding-challenge.git`
- Install all project dependencies with `npm install` in the project folder
- Start the app with `npm start`
- Browse to the provided URL


### To run the app as production build:
- Clone the submitted project repository to a folder on your local machine
- Install all project dependencies with `npm install` in the project folder
- Build the app for production with `npm run build` in the project folder
- Install serve with `npm i serve -g`
- Setup a static server for the app with `serve -s build` in the project folder
- Browse to the provided URL

### To test the App:
Simple tests are created to ensure that the App runs and the components are rendered without crashes.

Run the tests with `npm test` then press `a` to run all tests.


