import React from 'react'
import { teachersData } from '@/data/teachersdata'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

const TeachersList = () => {
  return (
    <section className="w-full bg-white py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {teachersData.map((teacher, index) => (
            <div
              key={index}
              className="relative min-w-0 overflow-hidden rounded-2xl"
            >
              {/* Teacher Image */}
              <Image
                src={teacher.path}
                alt={`Staff ${index + 1}`}
                width={250}
                height={300}
                className="block w-full h-auto object-cover"
                sizes="(max-width: 640px) 50vw,
                       (max-width: 1024px) 33vw,
                       25vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

              {/* Logo */}
              <Image
                src="/images/pvmlogo.png"
                alt="School Logo"
                width={50}
                height={50}
                draggable={false}
                className="absolute left-2 top-2 sm:left-4 sm:top-4 opacity-90 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 z-10"
              />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-2 sm:px-3 pb-2 sm:pb-3">
                {teacher.name && (
                  <h3
                    className={`font-bold text-white text-[11px] sm:text-[13px] md:text-[15px] ${poppins.className}`}
                  >
                    {teacher.name}
                  </h3>
                )}

                {teacher.role && (
                  <p
                    className={`font-normal text-orange-400 text-[9px] sm:text-[11px] md:text-[12px] ${poppins.className}`}
                  >
                    {teacher.role}
                  </p>
                )}

                {teacher.degree && (
                  <p
                    className={`text-white text-[8px] sm:text-[9px] md:text-[10px] ${poppins.className}`}
                  >
                    {teacher.degree}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeachersList