import React, { useState, useEffect } from 'react'
import {GraphQLClient, request} from 'graphql-request'
import PropTypes from 'prop-types'

const Request = (props) => {

  const [data, setData] = useState(void 0)
  const [error, setError] = useState(void 0)
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setData(void 0)
    setError(void 0)
    setLoading(false)
  }

  const requestData = async (props) => {
    setLoading(true)
    let res
    if (props.options) {
      res = await new GraphQLClient(props.url, props.options).request(props.query, props.variables || null).catch(err => setError(err))
    } else {
      res = await request(props.url, props.query, props.variables || null).catch(err => setError(err))
    }
    setData(res)
    setLoading(false)
  }

  useEffect(() => {
    reset()
    requestData(props)
  }, [props])

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
  loading: PropTypes.func,
  variables: PropTypes.object,
  options: PropTypes.object
}

export default Request