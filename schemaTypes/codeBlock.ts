// schemas/codeBlock.ts
import { defineType } from 'sanity'

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Bash', value: 'bash' },
          { title: 'HTML', value: 'html' },
          // ... outras linguagens
        ],
      },
    },
    {
      name: 'code',
      type: 'text',
      title: 'Code',
    },
  ],
})