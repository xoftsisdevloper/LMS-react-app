import React, { useEffect } from 'react'
import { useAuthcontext } from '../../../contexts/Authcontext'
import { useStudentContext } from '../../../contexts/Student-context'
import { studentCourseListService } from '../../../service/baseService'
import Course from './Course'

const StudentCourseList = () => {

    const {authUser} = useAuthcontext()
    const {studentCoursesList, setStudentCoursesList} = useStudentContext()

    const fetchCourseList = async (id) => {
        const res = await studentCourseListService(id)
        setStudentCoursesList(res?.data)
    }

    useEffect(() => {
        fetchCourseList(authUser.user._id)

        return () => setStudentCoursesList([])
    }, [authUser.user._id])
    
  return (
    <div>StudentCourseList
        {
            studentCoursesList && studentCoursesList.length > 0 ? (
            studentCoursesList.map((course) => (
                <Course key={course.id || course.name} course={course}/>
            ))
            ) : (
            <p>No courses available</p>
            )
        }
    </div>
  )
}

export default StudentCourseList