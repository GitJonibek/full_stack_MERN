import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {deleteExperience} from "../../actions/profile";

const Experience = ({experience, deleteExperience, history}) => {

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {' '}
        {
          exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button className='btn btn-round-danger' onClick={() => deleteExperience(exp._id)}>
          <i className="fas fa-trash-alt"></i>{' '}
        </button>
      </td>
      <td>
        <Link to={{
              pathname: '/add-experience',
              state: {
                experience: exp
              }
            }}><button className='btn btn-round-primary'>
            <i className="fas fa-pencil-alt"></i>{' '}
          </button>
        </Link>
      </td>
    </tr>
  ));

  if(!experience.length) {
    return (
      <Fragment>
        <p >Add Experience to your profile.</p>
        <Link to='/add-experience' className='btn btn-round-primary my-1'>Add Experience</Link>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">years</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
