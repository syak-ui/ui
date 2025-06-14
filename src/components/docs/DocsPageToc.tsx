import React from 'react'

interface TocItem {
  id: string
  title: string
  children?: TocItem[]
}

interface DocsPageTocProps {
  items: TocItem[]
}

export function DocsPageToc({ items }: DocsPageTocProps) {
  const renderTocItem = (item: TocItem, level = 0) => (
    <li key={item.id} className="pt-2 mt-0">
      <a
        className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
        href={`#${item.id}`}
      >
        {item.title}
      </a>
      {item.children && item.children.length > 0 && (
        <ul className="pl-4 m-0 list-none">
          {item.children.map((child) => renderTocItem(child, level + 1))}
        </ul>
      )}
    </li>
  )

  return (
    <div className="space-y-2">
      <p className="font-medium">목차</p>
      <ul className="m-0 list-none">
        {items.map((item) => renderTocItem(item))}
      </ul>
    </div>
  )
}
