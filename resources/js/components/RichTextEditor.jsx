import React, { useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Paper, Group, Button, ActionIcon, Divider, Text } from '@mantine/core'
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
  Heading1, Heading2, Heading3, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo
} from 'lucide-react'

const RichTextEditor = ({ content, onChange, label = 'Content' }) => {
  const [isUploading, setIsUploading] = React.useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(() => {
    const choice = window.confirm('Upload from computer? (OK = Upload file, Cancel = Enter URL)')
    
    if (choice) {
      // Upload from computer
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file')
          return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB')
          return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append('image', file)

        try {
          const response = await fetch('/upload/post-image', {
            method: 'POST',
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
              'Accept': 'application/json',
            },
            body: formData,
          })

          if (!response.ok) {
            const errorText = await response.text()
            console.error('Upload error response:', errorText)
            throw new Error(`Upload failed: ${response.status}`)
          }

          const data = await response.json()
          console.log('Upload response:', data)

          if (data.success && editor) {
            editor.chain().focus().setImage({ src: data.url }).run()
            alert('Image uploaded successfully!')
          } else {
            throw new Error('Upload response invalid')
          }
        } catch (error) {
          console.error('Upload failed:', error)
          alert(`Upload failed: ${error.message}. Please check console for details.`)
        } finally {
          setIsUploading(false)
        }
      }
      input.click()
    } else {
      // Enter URL
      const url = window.prompt('Enter image URL:')
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }, [editor])

  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL:')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Text c="#FFD700" fw={500} size="sm" mb="xs">{label}</Text>
      
      <Paper
        withBorder
        style={{
          backgroundColor: 'rgba(26, 31, 46, 0.6)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        {/* Toolbar */}
        <Paper
          p="xs"
          style={{
            backgroundColor: 'rgba(15, 20, 25, 0.8)',
            borderBottom: '1px solid rgba(255, 215, 0, 0.1)'
          }}
        >
          <Group gap="xs" wrap="wrap">
            <ActionIcon
              variant="subtle"
              color={editor.isActive('bold') ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive('italic') ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive('underline') ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon size={18} />
            </ActionIcon>

            <Divider orientation="vertical" />

            <ActionIcon
              variant="subtle"
              color={editor.isActive('heading', { level: 1 }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive('heading', { level: 2 }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive('heading', { level: 3 }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 size={18} />
            </ActionIcon>

            <Divider orientation="vertical" />

            <ActionIcon
              variant="subtle"
              color={editor.isActive('bulletList') ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive('orderedList') ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={18} />
            </ActionIcon>

            <Divider orientation="vertical" />

            <ActionIcon
              variant="subtle"
              color={editor.isActive({ textAlign: 'left' }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
              <AlignLeft size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive({ textAlign: 'center' }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
              <AlignCenter size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color={editor.isActive({ textAlign: 'right' }) ? 'yellow' : 'gray'}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
              <AlignRight size={18} />
            </ActionIcon>

            <Divider orientation="vertical" />

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={setLink}
            >
              <LinkIcon size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={addImage}
              disabled={isUploading}
              loading={isUploading}
            >
              <ImageIcon size={18} />
            </ActionIcon>
            
            {isUploading && (
              <Text size="xs" c="#FFD700">Uploading...</Text>
            )}

            <Divider orientation="vertical" />

            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo size={18} />
            </ActionIcon>
          </Group>
        </Paper>

        {/* Editor Content */}
        <EditorContent 
          editor={editor} 
          style={{
            minHeight: '300px',
            maxHeight: '600px',
            overflowY: 'auto',
            padding: '1rem',
            color: '#fff',
          }}
        />

        <style>{`
          .ProseMirror {
            outline: none;
            min-height: 300px;
            color: #fff;
          }
          
          .ProseMirror p {
            margin: 0.5rem 0;
            color: #fff;
          }

          .ProseMirror h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0;
            color: #FFD700;
            font-family: serif;
          }

          .ProseMirror h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0.8rem 0;
            color: #FFD700;
            font-family: serif;
          }

          .ProseMirror h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0.6rem 0;
            color: #FFD700;
            font-family: serif;
          }

          .ProseMirror ul, .ProseMirror ol {
            padding-left: 1.5rem;
            margin: 0.5rem 0;
            color: #fff;
          }

          .ProseMirror li {
            margin: 0.25rem 0;
            color: #fff;
          }

          .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1rem 0;
          }

          .ProseMirror a {
            color: #FFD700;
            text-decoration: underline;
          }

          .ProseMirror strong {
            font-weight: 600;
            color: #FFD700;
          }

          .ProseMirror em {
            font-style: italic;
          }

          .ProseMirror code {
            background-color: rgba(255, 215, 0, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: monospace;
            color: #FFD700;
          }
        `}</style>
      </Paper>
    </div>
  )
}

export default RichTextEditor
