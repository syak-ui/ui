import fs from 'fs/promises'
import path from 'path'

export async function readSourceCode(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), 'src', filePath)
    const content = await fs.readFile(fullPath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Failed to read source code from ${filePath}:`, error)
    return `// 소스 코드를 불러올 수 없습니다: ${filePath}`
  }
}

export async function readDemoCode(
  componentPath: string,
  demoName: string
): Promise<string> {
  try {
    const demoPath = path.join(
      process.cwd(),
      'src/app/components',
      componentPath,
      'demos',
      `${demoName}.tsx`
    )
    const content = await fs.readFile(demoPath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Failed to read demo code ${demoName}:`, error)
    return `// 데모 코드를 불러올 수 없습니다: ${demoName}`
  }
}
