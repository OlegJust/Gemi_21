import {useState, useCallback} from 'react'

// эта функция работает с сервиром
//  - позволяет делать запрос на сервер
//  - слежка за процесом занрузки
//  - слежка за ошибками
export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)

    try {
      if (body) {// для коректной работы бади
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'// показываем что отправляем по сити json
      }// если бади есть то мы его stringify

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так, нету даты ')
      }

      setLoading(false)

      return data // если все хорошо то мы возрашаем даные
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, []) // так как вторым значеием нечего нет, он не будет просто так запускаться

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
