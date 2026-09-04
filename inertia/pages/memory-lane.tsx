import { Head } from '@inertiajs/react'
import { MotionConfig, motion } from 'motion/react'

const PHOTO_ALBUM_URL = 'https://photos.app.goo.gl/Qv8pMLWZbzUg53118'
const WEDDING_FILM_URL = 'https://youtu.be/uwDx9EhQF8o?si=A-SlbB9PkerC_f54'

const PHOTO_PREVIEW_URL =
  'https://lh3.googleusercontent.com/pw/AP1GczNm9pyKRus8YknJJMJ4VkejGXr-ZEk95wUiGkocsJqespvs6kd8ABz1TMF5sFSYvlo5FAtg-rkfEH7YGr42sBdQrTHe1hg7PGzQ9qK6Jj4vc-8EyXcaHHvtdvLHeDyB8h74lhIVNcVI2CVshZpxweChmLHzRABx-2ni40bXzKfKxFXvyKLHf04o4GCrGr0rF6OM6DNjSHhe38Au1BybbLHKf0wQKhxahve6yx4TdkBR6zz-YsCejXUSkJ4d8j95VdQGY5E1CCROg3lSfgTSbd_K055Aj1ed-mK1YglCjaeDd7J7d7RZML7IUG6GqbqsMB6D5bauw0kFfZrpdCu14Yu0qqwIvSL-dsApr6bZHNNzWCRDXi_tUKPKgMMAQSU-eFR5Bvq61R2iLQhj4e-G84iCXpvgbAbNmTVLIFAn_yBhKEcpQy2wtT6JcbiqxXm6bONLiY9dnnD0IuiMSLa3MV-ZxcQhNw0aKhWRo8ocGKh-5Ox-i94zT9ycG615JbSb-O0viTdn_U7CfyJTCnYvGC7i2crEvUS4jkp4m7_LsRfiR_-FoYnSEycNO5je41cjul97DrPGSZ8sLqYwg2h6U8aLKR7sXd1qlMIMZmjsnQX1-n9WNnUcA0W68IvP3X48goZaM6rL67pOg9kLV-Pwk1qkxA_5YRRi4nnIt9_2AaJoo_7KdzcLrdW9xxqLYP9vvv8W6AhDWFDsT7Bzm14XTY59NIqT9yAS23ytmkb2Usb3gwavO3RDWsKwYutmCXsrNai36WxDKL93RJ2q3_TNCvG6FtIw3zkBraeRlfUmrtKGC5I0GTbOH5Gu7yBtORr-cj-61Qug2I2VVI_1VtuxNtJtIWL6ZbBC7pIKVDqRb_mwR2IrroXhzbxg0dR909YXYEyRVo59fwtOj9q35ccXsHqohLkbM5uPu-q96g3BeCBySQ-pBDtbKFIKCvR-I7O-m8-jOLqECasqoOHteXrL_r0PNqoOMybILaSqHJmrba4GDjSgZzs_YgHZnZ42i-aONped75SQ7lmbU_SvMOQ3W8-nwISEJYI=w1600-h900-p-k-no'
const FILM_PREVIEW_URL =
  'https://i.ytimg.com/vi/uwDx9EhQF8o/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAnknoaaOlbxu0CdTOJlqsL6OcdkQ'

const SERIF = "font-['Cormorant_Garamond','Georgia','serif']"

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8b7d8e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf8f3]'

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6 6m-6-6 6-6" />
    </svg>
  )
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.8v10.4c0 .8.9 1.3 1.6.9l8-5.2c.6-.4.6-1.4 0-1.8l-8-5.2c-.7-.4-1.6.1-1.6.9Z" />
    </svg>
  )
}

function Eyebrow({ index, label, centered = false }: { index: string; label: string; centered?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#77604f] ${
        centered ? 'justify-center' : 'justify-start'
      }`}
    >
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-[#d9cabd]" />
      <span>{label}</span>
    </p>
  )
}

function EditorialLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold tracking-wide text-[#4a3f45]">
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px] motion-reduce:transition-none">
        {children}
      </span>
      <ArrowUpRightIcon className="h-4 w-4 text-[#8a7364] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none" />
    </span>
  )
}

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}

export default function MemoryLane() {
  return (
    <MotionConfig reducedMotion="user">
      <Head title="Memory Lane">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-[#fbf8f3] font-sans text-[#29271f] antialiased">
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32 lg:px-14">
          <nav className="flex items-center justify-between pt-6 sm:pt-8" aria-label="Page">
            <a
              href="/"
              className={`group inline-flex items-center gap-2 px-1 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#6f625f] transition-colors hover:text-[#29271f] ${FOCUS_RING} rounded-[2px]`}
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:transform-none" />
              Back to home
            </a>
            <p className={`${SERIF} text-lg italic text-[#97807a]`}>Daryll &amp; Hannah</p>
          </nav>

          <header className="mx-auto mt-12 max-w-2xl text-center sm:mt-20">
            <motion.div
              {...rise}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex items-center justify-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-[#d9cabd]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#77604f] sm:text-xs">
                  Memory Lane
                </p>
                <span aria-hidden="true" className="h-px w-10 bg-[#d9cabd]" />
              </div>
              <h1
                className={`${SERIF} mt-7 text-[2.9rem] font-medium leading-[1.02] text-[#211f1a] sm:text-6xl lg:text-[4.4rem]`}
              >
                Our Story, <em className="font-normal italic text-[#6d5a63]">Revisited</em>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#6f675f] sm:text-base">
                A little trip down memory lane — relive our favorite moments from the day we said
                "I do".
              </p>
              <div aria-hidden="true" className="mt-10 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-[#e0d3c2]" />
                <span className="block h-1.5 w-1.5 rotate-45 bg-[#c9b8a6]" />
                <span className="h-px w-16 bg-[#e0d3c2]" />
              </div>
            </motion.div>
          </header>

          <main className="mt-16 grid grid-cols-1 gap-16 sm:mt-24 sm:gap-20 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-10 xl:gap-14">
            <motion.a
              href={PHOTO_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open wedding photo album on Google Photos in a new tab"
              className={`group flex flex-col rounded-[3px] ${FOCUS_RING}`}
              {...rise}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <figure className="rounded-[3px] border border-[#e4d7c6] bg-[#fffdf9] p-2.5 shadow-[0_1px_2px_rgba(41,39,31,0.05),0_24px_48px_-24px_rgba(41,39,31,0.18)] sm:p-3">
                <span className="relative block aspect-[16/9] overflow-hidden rounded-[2px] bg-[#efe7dc]">
                  <img
                    src={PHOTO_PREVIEW_URL}
                    alt="Preview of the wedding photo album"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                  />
                </span>
              </figure>
              <figcaption className="block pt-8">
                <Eyebrow index="01" label="Photographs" />
                <h2 className={`${SERIF} mt-4 text-3xl font-medium text-[#211f1a] sm:text-4xl`}>
                  Photo Album
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6f675f] sm:text-base">
                  Browse all snapshots from our wedding.
                </p>
                <span className="mt-5 flex flex-col items-start gap-1.5">
                  <EditorialLink>View on Google Photos</EditorialLink>
                  <span className="text-xs text-[#8b8474]">Opens in a new tab.</span>
                </span>
              </figcaption>
            </motion.a>

            <div
              aria-hidden="true"
              className="flex items-center gap-4 lg:flex-col lg:items-center lg:justify-center lg:gap-4 lg:self-stretch lg:py-2"
            >
              <span className="h-px flex-1 bg-[#e7dccf] lg:h-auto lg:w-px lg:flex-1" />
              <span className="block h-1.5 w-1.5 rotate-45 bg-[#c9b8a6]" />
              <span className="h-px flex-1 bg-[#e7dccf] lg:h-auto lg:w-px lg:flex-1" />
            </div>

            <motion.a
              href={WEDDING_FILM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open wedding video on YouTube in a new tab"
              className={`group flex flex-col rounded-[3px] ${FOCUS_RING}`}
              {...rise}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <figure className="rounded-[3px] border border-[#e4d7c6] bg-[#fffdf9] p-2.5 shadow-[0_1px_2px_rgba(41,39,31,0.05),0_24px_48px_-24px_rgba(41,39,31,0.18)] sm:p-3">
                <span className="relative block aspect-[16/9] overflow-hidden rounded-[2px] bg-[#1d1a18]">
                  <img
                    src={FILM_PREVIEW_URL}
                    alt="Preview thumbnail of the wedding film"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/[0.06] transition-colors duration-500 group-hover:bg-black/[0.12] motion-reduce:transition-none"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbf8f3]/95 shadow-[0_8px_24px_-8px_rgba(41,39,31,0.45)] transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none">
                      <PlayGlyph className="ml-0.5 h-5 w-5 text-[#3a3336]" />
                    </span>
                  </span>
                </span>
              </figure>
              <span className="block pt-8">
                <Eyebrow index="02" label="Film" />
                <h2 className={`${SERIF} mt-4 text-3xl font-medium text-[#211f1a] sm:text-4xl`}>
                  Wedding Film
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6f675f] sm:text-base">
                  Watch the whole coverage from our day.
                </p>
                <span className="mt-5 flex flex-col items-start gap-1.5">
                  <EditorialLink>Watch on YouTube</EditorialLink>
                  <span className="text-xs text-[#8b8474]">Opens in a new tab.</span>
                </span>
              </span>
            </motion.a>
          </main>

          <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-[#e7dccf] pt-8 sm:mt-28 sm:flex-row">
            <p className={`${SERIF} text-lg italic text-[#97807a]`}>Daryll &amp; Hannah</p>
            <a
              href="/"
              className={`group inline-flex items-center gap-2 px-1 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#6f625f] transition-colors hover:text-[#29271f] ${FOCUS_RING} rounded-[2px]`}
            >
              <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:transform-none" />
              Back to home
            </a>
          </footer>
        </div>
      </div>
    </MotionConfig>
  )
}
