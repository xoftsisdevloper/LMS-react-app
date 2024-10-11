import React, { useEffect } from 'react'
import Course from './Course'
import { useStudentContext } from '../../../contexts/Student-context'
import { courseListService } from '../../../service/baseService'

const CourseList = () => {
    const {studentCoursesList, setStudentCoursesList} = useStudentContext()

    const fetchCourseList = async () => {
        const res = await courseListService()
        setStudentCoursesList(res?.data)
    }

    useEffect(() => {
        fetchCourseList()
    }, [])
    
  return (
    <div>
        <h2>Course List</h2>
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

export default CourseList