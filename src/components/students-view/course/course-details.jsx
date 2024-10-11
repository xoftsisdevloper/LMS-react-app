import React, { useEffect } from 'react'
import { useStudentContext } from '../../../contexts/Student-context'
import { useParams } from 'react-router-dom'
import { studentCourseService } from '../../../service/baseService'
import Course from './Course'

const CourseDetails = () => {
    const {studentCourse, setStudentCourse,
        studentCourseId,
        setStudentCourseId
    } = useStudentContext()

    const params = useParams()
    const {id} = params

    const fetchCourseDetails = async (courseId) => {
        const res = await studentCourseService(courseId)
        const data = res.data

        setStudentCourse(data)
    }
    useEffect(()=>{
        if(studentCourseId) fetchCourseDetails(id)
    }, [studentCourseId])

    useEffect(() => {
        if (id){
            setStudentCourseId(id)
        }

        return () => setStudentCourse(null)
    }, [id])
    console.log(studentCourse)
  return (
    <div>
        {studentCourse && <Course course={studentCourse} />}
    </div>
  )
}

export default CourseDetails