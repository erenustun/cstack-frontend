import { useEffect, useState } from 'react'

export const hasHydrated = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}
