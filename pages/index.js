import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Connor McCarl</title>
      </Head>

      <div className={styles.articleList}>
        { posts.map((post, index) => (
          <Link className={styles.item} href={'/blog/' + post.slug} key={index}>
            <div className={styles.thumbnail}>
              <Image src={post.frontmatter.thumbnailUrl} alt="thumbnail" width={250} height={200} objectFit="cover" />
            </div>

            <div>
              <h2 className={styles.title}>{post.frontmatter.title}</h2>
              <p className={styles.description}>{post.frontmatter.description}</p>
              <p className={styles.date}>{post.frontmatter.date}</p>        
            </div>
          </Link>
        ))}
      </div>

      <div className="d-flex 
justify-content-center align-items-center">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

// getStaticProps
export const getStaticProps = async () => {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')

  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data } = matter(markdownWithMeta)

    return {
      frontmatter: data,
      slug: filename.split('.')[0]
    }
  })

  return {
    props: { posts }
  }
}
