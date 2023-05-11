import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/auth-context'
import { createInstance } from '../services/axios.service'
import { useFocusEffect } from '@react-navigation/native'

export default function useFetch(fetchFunction, dependencies = []) {
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchData() {
    setLoading(true)
    try {
      const instance = createInstance(token)
      const fetchData = await fetchFunction(instance)
      setData(fetchData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return [data, loading, fetchData, error, setError]
}
