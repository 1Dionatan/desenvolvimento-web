import React from 'react'

function Sidebar({ relatedPosts }) {
  return (
    <div>
      <h2>Outros conteúdos</h2>
      <ul className="barralateral">
        {relatedPosts.map((post, index) => (
          <li key={index}>
            <a href="#">{post}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

