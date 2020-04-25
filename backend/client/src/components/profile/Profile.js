import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { getProfileById } from '../../actions/profile';

import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({
  match,
  getProfileById,
  profile: {profile, loading},
  auth
}) => {

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      { profile === null || loading ? <Spinner /> :
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>Back To Developers' Page</Link>
          { auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id &&
            <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
          }
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='exp-edu-wrapper'>
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experiences</h2>
                { profile.experience.length > 0 ?
                  <ProfileExperience profile={profile.experience} />
                   : <h4> No experience credentials </h4>
                }
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Educations</h2>
                { profile.education.length > 0 ?
                  <ProfileEducation profile={profile.education} />
                   : <h4> No education credentials </h4>
                }
              </div>
            </div>
            { profile.githubusername && <ProfileGithub username={profile.githubusername} /> }
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
