import { Button } from '@hwei/ui/shadcn/button'
import { Plus } from 'lucide-react'
import React from 'react'

const AddVarientItem = () => {
  const handleAddVarient = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <div className="h-14 w-14 center cursor-pointer bg-slate-100/50 border-2 border-secondary/50 rounded-2xl">
    <Button variant="ghost" onClick={handleAddVarient}>
      <Plus className="h-5 w-5 text-secondary/80" />
    </Button>
  </div>
  )
}

export default AddVarientItem