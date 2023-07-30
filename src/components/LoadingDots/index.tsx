import './animation.css'

export default function LoadingDots() {
  return (
    <div className="loading-dots block relative w-20 h-5 mt-2">
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
    </div>
  )
}
