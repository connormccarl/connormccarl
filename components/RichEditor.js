import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, convertToRaw } from 'draft-js'
import { convertFromHTML } from 'draft-convert'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './RichEditor.module.css'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

export default function RichEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    return (
        <>
            <header className={styles.appHeader}>
                Rich Text Editor Example
            </header>

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
        </>
    )
}
