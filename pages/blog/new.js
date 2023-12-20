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
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [slug, setSlug] = useState("")
    const [tags, setTags] = React.useState([
        { id: 'Real Estate', text: 'Real Estate' }
    ])
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [thumbnail, setThumbnail] = useState(null)

    const changeTitle = i => { setTitle(i.target.value); }
    const changeDescription = i => { setDescription(i.target.value) }
    const changeSlug = i => { setSlug(i.target.value) }
    const changeThumbnail = i => { setThumbnail(i.target.files[0]) }

    const deleteTag = i => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const addTag = tag => {
        setTags([...tags, tag])
    }

    const dragTag = (tag, currPos, newPos) => {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos,0,tag)

        // re-render
        setTags(newTags)
    }

    const handleClick = index => {
        console.log('The tag at index ' + index + ' was clicked')
    }

    const publish = async (e) => {
        e.preventDefault()

        // convert rich content to HTML for database
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        // prepare formData for endpoint call
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("slug", slug)
        tags.map((tag) => {
            formData.append("tag", tag.text)
        })
        formData.append("content", content)
        formData.append("thumbnail", thumbnail)

        // Display the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        // call api
        // make api call
        await fetch("/api/post/new", {
            method: "POST",
            body: formData,
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <form className="mx-3">
        <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">Title</label>
            <input type="text" value={title} onChange={changeTitle} className="form-control" id="postTitle" aria-describedby="titleHelp"/>
            <div id="titleHelp" className="form-text">Make it something catchy</div>
        </div>
        <div className="mb-3">
            <label htmlFor="postDescription" className="form-label">Description</label>
            <input type="text" value={description} onChange={changeDescription} className="form-control" id="postDescription" />
        </div>
        <div className="mb-3">
            <label htmlFor="postSlug" className="form-label">Slug</label>
            <input type="text" value={slug} onChange={changeSlug} className="form-control" id="postSlug" />
        </div>
        <div className="mb-3">
            <ReactTags 
                tags={tags}
                delimiters={delimiters}
                handleDelete={deleteTag}
                handleAddition={addTag}
                handleDrag={dragTag}
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
            <input className="form-control" onChange={changeThumbnail} type="file" id="postThumbnail" />
        </div>
        <button type="submit" onClick={publish} className="btn btn-primary">Submit</button>
    </form>
  )
}
