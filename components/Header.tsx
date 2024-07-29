'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const pages = [
  { label: 'Головна', path: '/' },
  { label: 'Правильно', path: '/correct' },
  { label: 'Не правильно', path: '/not-correct' },
  { label: 'Всі слова', path: '/all-words' },
]

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="py-4 bg-muted flex justify-center sticky top-0 z-10" style={{ overflowY: 'auto' }}>
      <Tabs defaultValue="account" className="w-[400px]" value={pathname}>
        <TabsList>
          {pages.map((el) => (
            <Link href={`${el.path}`} key={el.path}>
              <TabsTrigger value={el.path}>{el.label}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </header>
  )
}

export default Header
