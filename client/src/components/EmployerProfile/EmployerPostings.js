import React from 'react';
import firebase from '../../firebase/firebase';
import JobPosting from './JobPosting';
import Heart from '../../images/hollow-heart.png';
import FavHeart from '../../images/favorites-icon.png';

import {
    Posts,
    PostContainer
  } from './EmployerStyles';

class EmployerPostings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: '',
            favToggle: true,
            heart: Heart
        }
    }

    componentDidMount() {
        const uid = this.props.match.params.employerId;
        firebase
          .database()
          .ref()
          .child(`companyPostings/${uid}`)
          .once('value')
          .then(snapshot => {
            this.setState({ posts:snapshot.val()});
          });
    }

    favToggle = () => {
        if(this.state.favToggle === true){
        this.setState({
            favToggle: !this.state.favToggle,
            heart: Heart
        });
        } else {
        this.setState({
            favToggle: !this.state.favToggle,
            heart: FavHeart
        })
        } 
    }


    render() {

        return (
            <PostContainer>
            {this.state.posts ?
            <Posts>
                 {Object.values(this.state.posts).map((post, i) => 
                    <JobPosting key={i} {...this.props} post={post} favToggle={this.favToggle} heart={this.state.heart}/>
                    )} 
            </Posts>
            :
            <Posts>
                <h1>
                    This company has no job postings.
                </h1>
            </Posts>}
            </PostContainer>
        )
    }
}


export default EmployerPostings;