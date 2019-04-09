import React, { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import PropTypes from 'prop-types'

const Request = (props) => {

  const [data, setData] = useState(void 0)
  const [error, setError] = useState(void 0)
  const [loading, setLoading] = useState(false)

  const requestData = async () => {
    setLoading(true)
    const res = await request(props.url, props.query)
    setData(res)
    setLoading(false)
  }

  useEffect(() => {
    requestData().catch(err => setError)
  }, [props.url])

  if (loading && props.loading) return props.loading()
  if (error && props.error) return props.error(error)
  if (data) return props.render(data)
  return null
}

Request.propTypes = {
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  error: PropTypes.func,
  loading: PropTypes.func
}

export default Request