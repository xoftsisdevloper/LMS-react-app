import axios from 'axios'

export const courseListService = async () => {
  const data = await axios.get('/api/courses')

  return data
}

export const CourseService = async (id) => {
  const data = await axios.get(`/api/courses/${id}`)

  return data
}


export const studentCourseListService = async (id) => {
    const data = await axios.get(`/api/groups/${id}/courses`)
  
    return data
  }

  export const fetchAllUsersService = async () => {
    const data = await axios.get(`/api/users`)

    return data
  }