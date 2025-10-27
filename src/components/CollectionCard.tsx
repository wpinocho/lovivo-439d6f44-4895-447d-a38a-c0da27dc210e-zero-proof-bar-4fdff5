import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import type { Collection } from '@/lib/supabase'
import { Sparkles } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  return (
    <Link to={`/collections/${collection.handle}`}>
      <Card className="bg-transparent border-0 overflow-hidden group cursor-pointer">
        <CardContent className="p-0">
          <div className="y2k-glass rounded-2xl overflow-hidden y2k-border-glow hover:scale-105 transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-y2k-cyan/10 to-y2k-aqua/10 overflow-hidden relative">
              {collection.image ? (
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-20 h-20 text-y2k-cyan" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-y2k-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Hover Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-y2k-cyan font-black text-xl uppercase tracking-wider">
                  Explore →
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-white font-black text-2xl mb-2 group-hover:text-y2k-cyan transition-colors">
                {collection.name}
              </h3>
              {collection.description && (
                <p className="text-y2k-aqua/70 text-sm line-clamp-2">
                  {collection.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}