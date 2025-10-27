import { useEffect, useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { CollectionCard } from '@/components/CollectionCard'
import { supabase, type Collection } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Sparkles, Grid3x3 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching collections:', error)
        return
      }

      setCollections(data || [])
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <EcommerceTemplate>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-y2k-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-y2k-cyan rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glass y2k-border-glow">
            <Grid3x3 className="w-4 h-4 text-y2k-cyan" />
            <span className="text-y2k-aqua text-sm font-bold uppercase tracking-wider">Explore Our Range</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 y2k-gradient-text leading-tight">
            COLLECTIONS
          </h1>

          <p className="text-xl md:text-2xl text-y2k-aqua mb-8 max-w-3xl mx-auto font-light">
            Curated selections of premium zero-proof beverages for every occasion
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-gradient-to-b from-y2k-black to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-2xl" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-y2k-cyan/20 mb-6">
                <Sparkles className="w-10 h-10 text-y2k-cyan" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">
                No Collections Yet
              </h2>
              <p className="text-y2k-aqua text-lg">
                Check back soon for curated collections of amazing zero-proof beverages!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          )}
        </div>
      </section>
    </EcommerceTemplate>
  )
}

export default Collections