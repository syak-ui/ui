'use client'

import React from 'react'

interface PropsTableProps {
  data: {
    name: string
    type: string
    defaultValue?: string
    description: string
  }[]
}

export function PropsTable({ data }: PropsTableProps) {
  return (
    <div className="w-full overflow-hidden border rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="font-semibold">
            <td className="p-4">Prop</td>
            <td className="p-4">Type</td>
            <td className="p-4">Default</td>
            <td className="p-4">Description</td>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name} className="border-t">
              <td className="p-4 font-mono font-semibold text-primary">
                {prop.name}
              </td>
              <td className="p-4 font-mono text-muted-foreground">
                {prop.type}
              </td>
              <td className="p-4">
                {prop.defaultValue ? (
                  <code className="px-2 py-1 text-xs rounded bg-muted">
                    {prop.defaultValue}
                  </code>
                ) : (
                  '-'
                )}
              </td>
              <td className="p-4 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
