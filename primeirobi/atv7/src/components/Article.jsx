import React from 'react'

function Article({ postData }) {
  return (
    <article>
      <h2>{postData.title}</h2>
      <time dateTime="2025-08-01">{postData.date}</time>
      
      {postData.content.map((paragraph, index) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}

      <figure>
        <img 
          src={postData.image.src} 
          width="500" 
          height="500" 
          alt={postData.image.alt}
        />
        <figcaption>
          {postData.image.caption}
        </figcaption>
      </figure>
    </article>
  )
}

export default Article

