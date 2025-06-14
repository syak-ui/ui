import { Button } from '@/components/ui/Button'

// 32x32 아이콘 컴포넌트들
const BranchIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="m18 9-2 2-2-2" />
    <path d="M14 11v4a2 2 0 0 1-2 2H7" />
  </svg>
)

const LinkIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

export function WithIconDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="default" size="lg" className="gap-3">
          <BranchIcon />
          New Branch
        </Button>
        <Button variant="outline" size="lg" className="gap-3">
          <LinkIcon />
          Link
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="secondary" size="default" className="gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
            <polyline points="2,7 12,12 22,7" />
            <polyline points="12,12 12,22" />
          </svg>
          Package
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          Home
        </Button>
      </div>
    </div>
  )
}

export default WithIconDemo
