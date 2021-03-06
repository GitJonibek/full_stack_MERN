import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addEducation} from "../../actions/profile";

const AddEducation = (props) => {

    const [formData, setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
      degree,
      school,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
      e.preventDefault();
      if(props.location.state && props.location.state.education)
        {props.addEducation(formData, props.history, true, props.location.state.education._id);}
      else
        {props.addEducation(formData, props.history, false, '');}

    }

    useEffect(() => {
      if(props.location.state && props.location.state.education) {
        const edu = props.location.state.education;
        setFormData({
          degree: edu.degree,
          school: edu.school,
          fieldofstudy: edu.fieldofstudy,
          from: edu.from,
          to: '',
          current: edu.current,
          description: edu.description
        });
        toggleDisabled(edu.to);
      }
    }, [props.location.state]);

    return (
      <Fragment>
        <h1 className="large text-primary">
          Add An Education
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any education/school that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder=" " value={degree} onChange={e => onChange(e)} name="degree" required />
            <span className='placeholder-text'>* Degree or Certificate</span>
          </div>
          <div className="form-group">
            <input type="text" placeholder=" " value={school} onChange={e => onChange(e)} name="school" required />
            <span className='placeholder-text'>* School or Bootcamp</span>
          </div>
          <div className="form-group">
            <input type="text" placeholder=" " value={fieldofstudy} onChange={e => onChange(e)} name="fieldofstudy" />
            <span className='placeholder-text'>Field of Study</span>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" value={from} onChange={e => onChange(e)} name="from" />
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" value={to} onChange={e => onChange(e)} name="to" disabled={toDateDisabled && 'disabled'} />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                value={current}
                checked={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
                name="current" />{' '}Current School
            </p>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={description} onChange={e => onChange(e)}
              cols="30"
              rows="5"
              placeholder="Program Description"
            ></textarea>
          </div>
          <input type="submit" className="btn btn-round-dark my-1" />
          <Link className="btn btn-round-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </Fragment>
    )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
