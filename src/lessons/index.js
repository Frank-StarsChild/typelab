// 聚合 src/lessons 下所有 JSON 课程文件。
// 每个 JSON 文件必须导出课程数组，课程格式见 SPEC.md。
const lessonModules = import.meta.glob('./**/*.json', {
  eager: true,
  import: 'default',
})

export const lessons = Object.values(lessonModules).flat()

export const lessonMetas = lessons.map(({ text, ...meta }) => meta)

export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]))

export function getLessonById(id) {
  return lessonById.get(id)
}

export function getLessonMetaById(id) {
  const lesson = getLessonById(id)
  if (!lesson) return undefined

  const { text, ...meta } = lesson
  return meta
}
