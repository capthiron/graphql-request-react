import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Request = (props) => {

  const [data, setData] = useState(void 0)
  const [error, setError] = useState(void 0)
  const [loading, setLoading] = useState(false)

  const requestData = async () => {
    try { 
      setLoading(true)
      const response = await fetch(props.url); 
      const json = await response.json(); 
      setData(json);
      setLoading(false)
    } catch (err) { 
      setError(err) 
    } 
  }

  useEffect(() => {
    requestData()
  }, [props.url])

  if (loading && props.loading) return props.loading()
  if (error && props.error) return props.error(error)
  if (data) return props.render(data)
  return null
}

Request.propTypes = {
  url: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  error: PropTypes.func,
  loading: PropTypes.func
}

export default Request