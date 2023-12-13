import React, { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw } from 'draft-js'
import { convertFromHTML } from 'draft-convert'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './new.module.css'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

const KeyCodes = {
    comma: 188,
    enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function newPost() {
    const [tags, setTags] = React.useState([
        { id: 'Real Estate', text: 'Real Estate' }
    ])
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const handleAdd = tag => {
        setTags([...tags, tag])
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos,0,tag)

        // re-render
        setTags(newTags)
    }

    const handleClick = index => {
        console.log('The tag at index ' + index + ' was clicked')
    }

    const publish = () => {
        // convert rich content to HTML for database
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        
        // save data to database
    }

  return (
    <form className="mx-3">
        <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="postTitle" aria-describedby="titleHelp"/>
            <div id="titleHelp" className="form-text">Make it something catchy</div>
        </div>
        <div className="mb-3">
            <label htmlFor="postDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="postDescription" />
        </div>
        <div className="mb-3">
            <label htmlFor="postSlug" className="form-label">Slug</label>
            <input type="text" className="form-control" id="postSlug" />
        </div>
        <div className="mb-3">
            <ReactTags 
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAdd}
                handleDrag={handleDrag}
                handleTagClick={handleClick}
                inputFieldPosition="bottom"
                autocomplete
            />
        </div>
        <div className="mb-3">
            <Editor 
                editorState={editorState} 
                onEditorStateChange={setEditorState}
                wrapperClassName={styles.wrapperClass}
                editorClassName={styles.editorClass}
                toolbarClassName={styles.toolbarClass}
                hashtag={{
                    separator: ' ',
                    trigger: '#',
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="postThumbnail" className="form-label">Thumbnail</label>
            <input className="form-control" type="file" id="postThumbnail" />
        </div>
        <button type="submit" onClick={publish} className="btn btn-primary">Submit</button>
    </form>
  )
}
