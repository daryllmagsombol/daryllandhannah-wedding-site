import darylladmin1purple from '../../assets/images/daryllandadmin1-logo-purple.webp'

export function Loader({
  message = 'Loading, please wait...',
  noBG = false,
}: {
  message?: string
  noBG?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${noBG ? 'w-auto h-[60vh]' : ` w-screen h-screen bg-gradient-to-r from-purple-50 to-indigo-100`}`}
    >
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-700"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={darylladmin1purple} alt="D&H" className="w-16 h-16" />
        </div>
      </div>
      <div className="mt-4 text-lg font-semibold text-purple-900">{message}</div>
    </div>
  )
}
