import React from 'react'
import { render } from 'react-dom'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function createPost() {
    const [tags, setTags] = React.useState([
        { id: 'Real Estate', text: 'Real Estate' }
    ])

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

  return (
    <form class="mx-3">
        <div class="mb-3">
            <label for="postTitle" class="form-label">Title</label>
            <input type="text" class="form-control" id="postTitle" aria-describedby="titleHelp"/>
            <div id="titleHelp" class="form-text">Make it something catchy</div>
        </div>
        <div class="mb-3">
            <label for="postDescription" class="form-label">Description</label>
            <input type="text" class="form-control" id="postDescription" />
        </div>
        <div class="mb-3">
            <label for="postSlug" class="form-label">Slug</label>
            <input type="text" class="form-control" id="postSlug" />
        </div>
        <div class="mb-3">
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
        <div class="mb-3">
            <label for="postContent" class="form-label">Content</label>
            <textarea class="form-control" id="postContent" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="postThumbnail" class="form-label">Thumbnail</label>
            <input class="form-control" type="file" id="postThumbnail" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  )
}
