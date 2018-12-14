import React from 'react';
import JobPosting from './JobPosting';

import { Posts, PostContainer } from './EmployerStyles';

class EmployerPostings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { posts, favoritedList } = this.props;
    return (
      <PostContainer>
        {posts ? (
          <Posts>
            {Object.values(posts).map((post, i) => (
              <JobPosting
                key={i}
                index={i}
                favoritedList={favoritedList}
                {...this.props}
                post={post}
                favToggle={this.props.favToggle}
              />
            ))}
          </Posts>
        ) : (
          <Posts>
            <h1>This company has no job postings.</h1>
          </Posts>
        )}
      </PostContainer>
    );
  }
}

export default EmployerPostings;
