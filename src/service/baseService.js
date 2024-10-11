import axios from 'axios'

export const courseListService = async () => {
  const data = await axios.get('/api/courses')

  return data
}

export const studentCourseService = async (id) => {
  const data = await axios.get(`/api/courses/${id}`)

  return data
}
