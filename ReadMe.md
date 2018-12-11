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

### Structure

#### Index

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

#### Contents
##### Client

##### Server


### Models

#### User Model

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
#### Markers Model

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

#### Company Postings Model

The company posting are related to each company uid. 

posting objects are relative to a unique company id

```
- companyName = val().isString()
- date = val().matches(/^\\d{2}/\\d{2}/\\d{2}$/)
- jobLink = val().matches(/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/)
- jobTitle = val().isString()
- location = val().isString()
```

#### Favorite Postings Model