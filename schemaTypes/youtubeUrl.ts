import { defineField, defineType } from "sanity";

export const youtubeUrlType = defineType({
  name: 'youtubeUrl',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({
        scheme: ['https'],
        allowRelative: false,
        allowCredentials: false
      }).custom((url) => {
        const pattern = /^(https?\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return pattern.test(url || '')
          ? true
          : 'Insira uma URL válida do YouTube';
      })
    }),
    defineField({
      name: 'title',
      title: 'Título do Vídeo',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Títulos muito longos podem ser cortados')
    })
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title || 'Vídeo do YouTube',
        subtitle: url ? `ID: ${extractYoutubeId(url)}` : 'Sem URL'
      }
    }
  }
});

// Helper para extrair o ID do vídeo
export const extractYoutubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};