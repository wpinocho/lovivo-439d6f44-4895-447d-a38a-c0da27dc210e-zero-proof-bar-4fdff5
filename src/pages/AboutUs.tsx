import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Heart, Zap, Users, Award, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Flavor",
      description: "We believe great taste shouldn't require alcohol. Every product is carefully curated for maximum flavor."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Pushing boundaries in the zero-proof space with cutting-edge distillation and flavor techniques."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by mocktail enthusiasts, for mocktail enthusiasts. Your feedback shapes our selection."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Only the finest NA spirits and ingredients make it to our shelves. No compromises."
    }
  ]

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Chief Taste Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Sam Chen",
      role: "Head Mixologist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Jordan Blake",
      role: "Product Curator",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ]

  return (
    <EcommerceTemplate>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-y2k-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-y2k-cyan rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glass y2k-border-glow">
            <Sparkles className="w-4 h-4 text-y2k-cyan" />
            <span className="text-y2k-aqua text-sm font-bold uppercase tracking-wider">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 y2k-gradient-text leading-tight">
            REDEFINING<br />ZERO-PROOF
          </h1>

          <p className="text-xl md:text-2xl text-y2k-aqua mb-8 max-w-3xl mx-auto font-light">
            We're on a mission to prove that you don't need alcohol to have an incredible drinking experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-y2k-black to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 y2k-text-glow">
                OUR MISSION
              </h2>
              <p className="text-y2k-aqua text-lg mb-6 leading-relaxed">
                Founded in 2024, Zero-Proof Bar emerged from a simple observation: the non-alcoholic beverage market was stuck in the past. We saw an opportunity to bring the same level of sophistication, flavor complexity, and premium experience to zero-proof drinks.
              </p>
              <p className="text-y2k-aqua text-lg mb-6 leading-relaxed">
                Today, we're proud to offer the most carefully curated selection of NA spirits, mixers, and ready-to-drink mocktails. Every product in our store has been personally tested and approved by our team of flavor experts.
              </p>
              <Button 
                asChild
                className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold px-8 py-6 rounded-full y2k-box-glow transition-all duration-300"
              >
                <Link to="/collections">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Products
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="y2k-glass rounded-3xl overflow-hidden y2k-border-glow">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop"
                  alt="Zero-Proof Bar Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-y2k-cyan rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-y2k-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-y2k-cyan rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-y2k-cyan" />
              <span className="text-y2k-cyan text-sm font-bold uppercase tracking-wider">What We Stand For</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 y2k-text-glow">
              OUR VALUES
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card 
                key={idx}
                className="y2k-glass y2k-border-glow hover:scale-105 transition-all duration-300 border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-y2k-cyan/20 mb-4">
                    <value.icon className="w-8 h-8 text-y2k-cyan" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 y2k-gradient-text">
                    {value.title}
                  </h3>
                  <p className="text-y2k-aqua text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-y2k-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-y2k-cyan" />
              <span className="text-y2k-cyan text-sm font-bold uppercase tracking-wider">Meet The Team</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 y2k-text-glow">
              THE PEOPLE BEHIND<br />THE FLAVORS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <div 
                key={idx}
                className="y2k-glass rounded-3xl overflow-hidden y2k-border-glow hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black text-white mb-2 y2k-gradient-text">
                    {member.name}
                  </h3>
                  <p className="text-y2k-aqua text-sm font-bold uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-y2k-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-y2k-cyan via-y2k-aqua to-y2k-cyan animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 y2k-text-glow">
            JOIN THE<br />REVOLUTION
          </h2>
          <p className="text-xl text-y2k-aqua mb-10 max-w-2xl mx-auto">
            Experience the future of non-alcoholic beverages. Your journey starts here.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-black text-xl px-12 py-8 rounded-full y2k-box-glow animate-glow-pulse transition-all duration-300 hover:scale-110"
          >
            <Link to="/collections">
              <Sparkles className="w-6 h-6 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </section>
    </EcommerceTemplate>
  )
}

export default AboutUs