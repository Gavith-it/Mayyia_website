'use client'

import Marquee from '@/components/ui/Marquee'
import { FiStar } from 'react-icons/fi'

const testimonials = [
    {
        name: 'Aishwarya K.',
        role: 'Bengaluru',
        text: 'Sri Mayyia did not just cater our wedding—they elevated it. From the tasting to the service, everything was precise, poised, and unforgettable.',
        rating: 5,
    },
    {
        name: 'Raghavan Family',
        role: 'Sringeri',
        text: 'When we hosted a pooja for over 3000 people, Sri Mayyia delivered with such spiritual sanctity and systemised perfection that even the priests were in awe.',
        rating: 5,
    },
    {
        name: 'Lakshmi Narayan',
        role: 'Hyderabad',
        text: 'A rare blend of old-world charm and new-world precision. We wouldn\'t trust anyone else with our family functions.',
        rating: 5,
    },
    {
        name: 'Aditi R.',
        role: 'Wedding Client',
        text: 'Example review content that is quite long and details the amazing food.',
        rating: 5,
    },
    {
        name: 'Rahul S.',
        role: 'Corporate Event',
        text: 'The presentation was impeccable. Sri Mayyia truly understands luxury catering.',
        rating: 5,
    },
]

const TestimonialCard = ({ data }: { data: typeof testimonials[0] }) => (
    <div className="w-[350px] md:w-[450px] flex-shrink-0 bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 p-8 rounded-2xl relative group hover:border-gold-400/50 transition-colors">
        <div className="flex gap-1 mb-4 text-gold-400">
            {[...Array(data.rating)].map((_, i) => <FiStar key={i} className="fill-current w-4 h-4" />)}
        </div>
        <p className="text-gray-300 font-montserrat italic mb-6 leading-relaxed">"{data.text}"</p>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 font-playfair font-bold">
                {data.name[0]}
            </div>
            <div>
                <h4 className="text-white font-playfair font-semibold">{data.name}</h4>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{data.role}</p>
            </div>
        </div>
    </div>
)

export default function MarqueeTestimonials() {
    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#050505] to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#050505] to-transparent z-10" />

            <div className="container-custom mb-12 text-center relative z-20">
                <h2 className="text-4xl md:text-5xl font-great-vibes text-gold-400 mb-2">Words of Praise</h2>
                <p className="text-gray-400 font-montserrat tracking-widest text-sm uppercase">What our clients say</p>
            </div>

            <div className="relative z-0">
                <Marquee speed={40}>
                    {testimonials.map((t, i) => <TestimonialCard key={i} data={t} />)}
                </Marquee>
            </div>
        </section>
    )
}
