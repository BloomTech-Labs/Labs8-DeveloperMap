## BackEnd Documentation

- A server that will deliver users for seekers and companies:

  - [Companies](https://intense-stream-29923.herokuapp.com/api/database/companies)
  - [Seekers](https://intense-stream-29923.herokuapp.com/api/database/seekers)

- Basic format of the users:

```js
companies: {
  id: {
    companyName: 'company name.';
    companyWebsite: 'companywebsite.com';
    email: 'company_email@email.com';
    location: 'Los Angeles,CA';
    phoneNumber: '555-555-5555';
  }
}
```

```js
seekers: {
  id: {
    bio: 'lorem15';
    email: 'example@email.com';
    firstName: 'Test';
    github: 'github.com';
    jobTitle: 'FSW';
    lastName: 'Testington';
    linkedIn: 'linkedIn.com';
    location: 'remote';
    phoneNumber: '555-555-5555';
    portfolio: 'portfolio.com';
    twitter: 'twitter.com';
  }
}
```

# Authentication is found inside the client in the file App.js

## To Sign Up Users

- Can use different authentication to sign up (Google, Twitter, etc.)
- Must have a unique email to sign up
- Password must be at least 8 characters long

## To Sign In Users

- Email and password are needed that are already active in the authentication database
- Two web tokens are created
  - One is local token that is short lived, only active for an hour
  - Second is on the firebase, the firebase token is long lived,
    only changed if their is a new password or it is deleted

## To Sign Out Users

- Ends the local token, firebase token still persists

# Endpoints

## Seekers

### Root Endpoint
- https://intense-stream-29923.herokuapp.com/api/database/seekers

### GET 

#### GET all Job Seekers
- https://intense-stream-29923.herokuapp.com/api/database/seekers/all
  - Returns all job seekers

#### GET Seeker Token
- https://intense-stream-29923.herokuapp.com/api/database/seekers/token
  - Sends a custom token with the claim of seeker
  - Useful for testing with Postman

#### GET Specific Job Seekers
- https://intense-stream-29923.herokuapp.com/api/database/seekers/:uid
  - Gets specific user by passing uid through params

- https://intense-stream-29923.herokuapp.com/api/database/seekers
  - Gets specific user when uid is passed through the body
  - Meant to be used with setSeekerClaims middleware

  
