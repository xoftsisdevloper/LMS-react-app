import React from 'react'

const StudentFooter = () => {
  const name = "LMS Platform";
  const website = "lmsplatform.com";
  return (
    <footer className="bg-dark text-white text-center py-3">
      <h3>Welcome to <em>{name}</em></h3>
      <p>Your future starts here.</p>
      <p>2024 © All rights reserved by {website}</p>
    </footer>
  )
}

export default StudentFooter