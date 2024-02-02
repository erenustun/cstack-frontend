import { ReactNode } from 'react'
import { Box, FlexBox } from '@shared/component'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

interface SimpleColumn {
  id: string | string[]
  accessor?: string
  header?: ReactNode | [ReactNode]
  formatData?: (v: any) => any
}

interface SimpleTableProps<> {
  columns: SimpleColumn[]
  data: any[] | any
  hover?: boolean
  hoverColor?: string
  stripped?: boolean
  strippedColor?: string
}

export const SimpleTable = ({
  columns = [],
  data = [],
  hover = false,
  stripped = false,
}: SimpleTableProps) => (
  <Box className="bg-opacity-5 p-0">
    {columns.map((column, colIndex: number) => {
      const accessor = !Array.isArray(column.header)
        ? column.accessor ?? column.id
        : ''

      return (
        <FlexBox
          key={`row-${colIndex}`}
          className={`flex py-3 ${
            stripped && colIndex % 2 == 0 && 'bg-zinc-200'
          } ${hover && 'hover:bg-zinc-300'} ${
            !Array.isArray(column.header) && 'px-4'
          } ${
            // check for first and last row
            colIndex + 1 === columns.length ? 'pb-4' : colIndex === 0 && 'pt-4'
          }`}
          direction="col"
        >
          {!Array.isArray(column.header) ? (
            <FlexBox direction="col">
              <span className="text-sm font-light text-default-text">
                {column.header}
              </span>
              <FlexBox className="items-center gap-x-2">
                <span className="font-medium tracking-wide text-primary">
                  {column.formatData
                    ? column.formatData(data[accessor as string]) ?? '-'
                    : data[accessor as string] ?? '-'}
                </span>
                <ClipboardDocumentIcon
                  className="mb-1 h-5 w-5 cursor-pointer text-disabled hover:text-primary-hover active:text-primary-active"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      column.formatData
                        ? column.formatData(data[accessor as string]) ?? '-'
                        : data[accessor as string] ?? '-'
                    )
                  }
                />
              </FlexBox>
            </FlexBox>
          ) : (
            <FlexBox
              direction="col"
              className="space-y-3 md:flex-row md:space-x-48 md:space-y-0"
            >
              {column.header?.map((headerNode, headerIndex: number) => (
                <FlexBox direction="col" className="px-4" key={headerIndex}>
                  <span className="text-sm font-light text-default-text">
                    {headerNode}
                  </span>
                  <FlexBox className="items-center gap-x-2">
                    <span className="font-medium tracking-wide text-primary">
                      {data[column.id[headerIndex]] ?? '-'}
                    </span>
                    <ClipboardDocumentIcon
                      className="mb-1 h-5 w-5 cursor-pointer text-disabled hover:text-primary-hover active:text-primary-active"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          data[column.id[headerIndex]] ?? '-'
                        )
                      }
                    />
                  </FlexBox>
                </FlexBox>
              ))}
            </FlexBox>
          )}
        </FlexBox>
      )
    })}
  </Box>
)
