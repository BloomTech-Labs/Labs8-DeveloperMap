# Developer Heat Map

<div align="center"><h2>Contributors:</h2>

<a href="https://github.com/Lndubose">Lauren Dubose</a>

<a href="https://github.com/easyra">Ezra Davis</a>

<a href="https://github.com/TheBrockstar">Brock Rohloff</a>

<a href="https://github.com/Austinlp4">Austin Pendergrast</a>

</div>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Frontend Built Using](#frontend-built-using)
  - [Backend Built Using](#backend-built-using)
  - [Reasoning](#reasoning)
- [Documentation](#documentation)
  - [Structure](#structure)
    - [Index](#index)
    - [Contents](#contents)
  - [Models](#structure)


### Frontend built using:

- React.js
- Styled-components
- Netlify

Deployed [here](https://clever-liskov-29b49a.netlify.com/)

### Backend built using:

- Firebase
- Node.js
- Express

Deployed [here](https://intense-stream-29923.herokuapp.com/api/database/seekers)

### Reasoning:

- React.js

  - SPA: Single page app fits the React
  - Because the various views are communicated through modals, a component based library is the best set of tools for content delivery. Each modal is a component.
  - Multiple modals, react gives us freedom to make our own naming conventions, easier to find areas of the website based on naming
  - Because we will be updating multiple views, and not a single view multiple times, React’s server side rendering is faster than other SPA client side rendering alternatives.

- Firebase
  
  - Built in Authentication
  - Data updates real-time
  - Massive storage size potential (scalability)
  - Allows us to add/change features without having to change a schema

- Express

  - Unopinionated framework, which allows us to write our code with less restrictions
  - Due to its wide use, support, and relatively long history, express is considered ‘battle-tested’ in that we are less likely to encounter bugs.
  - Works with JSON, firebase data is a json tree

- Node.js


  - Allows us to develop both our front-end and back-end in the same language and avoid context switching

# Documentation

# Structure

## Index

**(Alphabetical)**

- Client
    - public
    - src
      - components
       - Employer
         - BillingModal
         - SettingEmployerModal
       - EmployerProfile
       - LandingPage
       - Loading
       - NavBar
       - NoUser
       - Seeker
       - SeekerProfile
       - Settings
       - SignIn
       - SignUp
         - Forms
         - Types
       - Stripe
         - constants
       - Tutorial
      - firebase
      - images
       - Icons
       - signup
      - styles
- Server
    - auth
    - companies
    - constants
    - firebase
      - functions
    - markers
    - seekers
    - stripe-routes
    - users

## Contents
### **Client**

---

The client/frontend of the project. 

**Files:** .gitignore, package.json, README.md, yarn.lock

- ### public
   The HTML file containing the root element that MappaJob will be rendered to. 

   **Files:** favicon.png, index.html, manifest.json, mappa.ico

- ### src
   The components of MappaJob, additionally including all images, styles, firebase client configuration, root render files (App.js, index.js), and the component reducer.

   **Files:** App.js, App.test.js, index.js, reducer.js, serviceWorker.js

   - ### components
      The folders holding each component file used in MappaJob, primarily organized by Modal.

      **Files:** No immediate files.

      - ### Employer
         The folders holding the component files for the Employer Billings and Settings Modals. Currently not used.

         **Files:** No immediate files.

      - ### EmployerProfile
         The component files and styles used in the employer profile modal which shows up after clicking on an employer marker on the map, and clicking 'Learn More'.

         **Files:** EmployerPostings.js, EmployerProfile.js, EmployerStyles.js, JobPostings.js

      - ### LandingPage
         The component files and styles used on the Landing Page of MappaJob, which displays the map, and the geocoder (search functionality).

         **Files:** LandingPage.js, MapWindowStyle.js

      - ### Loading
         The component files, images, and styles used in the Loading modal.

         **Files:** Loading.js, LoadingStyles.js, map-smol.png, map.PNG, SpinningGlobe.js

      - ### NavBar
         The component files and styles used in the Navigation Bar.

         **Files:** NavBarStyles.js, NavBarView.js

      - ### NoUser
         The component files and styles for a component that will display if information is requested from a user that no longer exists in the database.

         **Files:** NoUser.js, NoUserStyle.js

      - ### Seeker
         Primarily the component files and styles for the Seeker Favorites modal.

         **Files:** Favorite.js, SeekerFavorites.js, SeekerSettings.js

      - ### SeekerProfile
         The component files and styles used in the job seeker profile modal which shows up after clicking on a job seeker marker on the map, and clicking 'Learn More'.

         **Files:** ProfileModalStyle.js, SeekerProfile.js

      - ### Settings
         The Settings component, and folders holding the routes for Seeker Settings and Employer Settings.

         **Files:** EmployerSettings.js, SeekerSettings.js, Settings.js

      - ### SignIn
         The component files and styles used in the Sign In modal.

         **Files:** SignIn.js

      - ### SignUp
         The SignUp component, and folders holding the routes for the various forms and signup steps.

         **Files:** SignUp.js

          - ### Forms
             The routes/components for Seeker Signup and Employer Signup.

             **Files:** EmployerSignUp.js, SeekerSignUp.js
    
          - ### Types
             The routes/components for the steps of the signup process wherein you choose your signup method (email or 3rd party) and identify whether you are a job seeker or employer.

             **Files:** SignUpTypes.js, SignUpUserTypes.js

      - ### Stripe
         The configuration file for the client-side stripe integration.

         **Files:** Checkout.js

      - ### Tutorial
         The tutorial component and the routes for the various parts of the tutorial.

         **Files:** ComProfileGuide.js, DevProfileGuide.js, EditSettings.js, GettingStarted.js, Intro.js, Navigation.js, TutorialIntro.js, UsingMarkers.js


   - ### firebase
      The configuration file for the client-side firebase integration.

      **Files:** firebase.js

   - ### images
      The configuration file for the client-side firebase integration.

      **Files:** avatar-icon.jpg, contact.PNG, edit.png,. favheart.png, favicon.PNG, favorites-icon.png, gear.png, gear.svg, hollow-heart.png, jobs.PNG, links.PNG, logout.png, logout1.png, mainlogo.png, Marker.png, markerlogo.png, markerlogo4.png, markerlogo9.png, markerPic.png, navsearch.PNG, newsignin.PNG, Pinch_zoom.png, planet.png, plusssign.png, question.png, sorc.PNG, styled.PNG, titleTab.png.

      - ### Icons
         Icon images

         **Files:** icons8-computer-monitor.png, icons8-github.png, icons8-linkedin-filled.png, icons8-phone-26.png, icons8-resume.png, icons8-twitter-filled.png

      - ### signup
         3rd party authentication buttons

         **Files:** btn_github_signin_light_normal_web@2x.png, btn_github_signin_light_pressed_web@2x.png, btn_google_signin_light_normal_web.png, btn_google_signin_light_normal_web@2x.png, btn_google_signin_light_pressed_web.png, btn_google_signin_light_pressed_web@2x.png

   - ### styles
      The global styles used throughout MappaJob.

      **Files:** AppStyle.js, GlobalStyle.js, index.js, ModalGlobalStyle.js, SettingsStyle.js, SignIn_UpStyle.js

---  
  
<br />
  
### **Server**

---

Contains the server/backend of the project.

**Files:** index.js, package.json, server.js, serverConfig.js, ServerDocs.md, yarn.lock

---

<br />

# Models

### User Model

The user model is broken up into two different objects that are labels companies and seekers. The companies object is created for companies registered through the app, and seekers are the job seekers that are registered through the app. All objects are created through firebase and are only accessible through admin priveledges.

companies object properties (each company has a unique uid):

```
- companyName = val().isString()
- companyWebsite = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- email = isString() && val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i)
- location = val().isString()
- phoneNumber = val().matches(/^\\d{3}-\\d{3}-\\d{4}$/)
```

seekers object properties (each seeker has a unique uId):

```
- email = isString() && val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i)
- firstName = val().isString()
- github = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- jobTitle = val().isString()
- lastName = val().isString()
- linkedIn = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- location = val().isString()
- phoneNumber = val().matches(/^\\d{3}-\\d{3}-\\d{4}$/)
- portfolio = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- twitter = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
```
### Markers Model

The markers model contains the geoJSON properties needed to locate users on the map and pin or mark their coordinates. The nested properties object holds the metadata for each marker.

markers object properties (each marker has a unique uid):

```
- geometry {
    - coordinates
      - 0 = val().isNumber()
      - 1 = val().isNumber()
}
- properties {
    - title = val().isString()
    - uid = val().isString()
}
- type = val().isString()
```

### Company Postings Model

The company posting are related to each company uid. 

posting objects are relative to a unique company id

```
- companyName = val().isString()
- date = val().matches(/^\\d{2}/\\d{2}/\\d{2}$/)
- jobLink = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- jobTitle = val().isString()
- location = val().isString()
```

### Favorite Postings Model