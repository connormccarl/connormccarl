import React from 'react'
import Sidebar from '@/components/Sidebar'

export default function Article() {
  return (
    <main role="main" className="container">
      <div className='row'>
        <div className="col-md-8 blog-main">
          <div className="blog-post">
            <h2 className="blog-post-title">Sample blog post</h2>
            <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
            <div className="blog-tags d-flex flex-row">
              <p className='px-2 pb-1 me-2'>Tag 1</p>
              <p className='px-2 pb-1 me-2'>Tag 2</p>
              <p className='px-2 pb-1 me-2'>Tag 3</p>
            </div>

            <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
            <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p> 
          </div>
        </div>
        <Sidebar />
      </div>
    </main>
  )
}
