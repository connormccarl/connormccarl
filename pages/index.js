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
