import React from 'react'
import Image from 'next/image'
import { Sora } from 'next/font/google'
import { teachersExpressionData } from '@/data/teachersexpressiondata'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

const TeachersExpression = () => {
  return (
    <section className={`py-20 bg-white ${sora.className} overflow-hidden`}>

      <h2 className='text-3xl font-semibold text-gray-800 mb-12 px-6 md:px-12'>
        Teacher&apos;s Expression
      </h2>

      <div className='overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
        <div className='flex w-max gap-6 animate-[scroll-right_50s_linear_infinite] hover:[animation-play-state:paused]'>
          {[...teachersExpressionData, ...teachersExpressionData].map((teacher, index) => (
            <div
              key={index}
              className='flex items-stretch border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white w-[420px] flex-shrink-0'
            >
              {/* Left — Quote */}
              <div className='flex-1 min-w-0 p-6'>
                <span className='text-5xl leading-none text-gray-300 font-serif'>&ldquo;</span>
                <p className='text-gray-700 text-sm leading-relaxed -mt-3 line-clamp-4'>
                  {teacher.expression}
                </p>
                <div className='mt-4 flex items-center gap-2'>
                  <span className='block w-6 h-px bg-gray-400'></span>
                  <p className='text-sm font-semibold text-gray-800'>{teacher.name}</p>
                </div>
                <p className='bottom-0 absolute py-2 text-[10px] font-thin text-orange-500'>#proudtobeAteacher💛</p>
              </div>

              {/* Right — Photo flush to edge */}
              {teacher.photo && (
                <div className='flex-shrink-0 w-28 relative'>
                  <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    fill
                    className='object-cover'
                    loading="eager"
                    unoptimized={false}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default TeachersExpression