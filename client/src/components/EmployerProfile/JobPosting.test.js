import React from 'react';
import renderer from 'react-test-renderer';
import JobPosting from './JobPosting';

describe(`job posting component`, () => {
    it(`should render without error`, () => {
        const props = {
            favoritedList: [{
                companyName: "Business",
                companyUid: "pIybk7iZOxYogp4GUTocjDnj9DH2",
                companyUrl: "/employer/pIybk7iZOxYogp4GUTocjDnj9DH2",
                date: "12/3/18",
                jobId: "-LSvdxaCKKJj55LBbgtK",
                jobLink: "indeed.com",
                jobTitle: "Com Sci Professional",
                location: {city: "Big Bear Lake", coordinates: [-116.88096, 34.243862], state: "CA", street: "42200 Moonridge Rd", zip: "92315"}}],
            post: {
                jobId: "uid2",
                jobLink: 'indeed.com'
            }
        }
        const tree = renderer.create(
            <JobPosting {...props}/>
          ).toJSON();
          expect(tree).toMatchSnapshot();
    });

    it(`should not break with no favorited list`, () => {
        const props = {
            favoritedList: [],
            post: {
                jobId: "uid2",
                jobLink: 'indeed.com'
            }
        }
        const tree = renderer.create(
            <JobPosting {...props}/>
          ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})