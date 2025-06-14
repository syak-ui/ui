export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-blue-600">쌱-UI</h1>
        <p className="mb-8 text-xl text-gray-600">
          대한민국 모든 개발자가 UI 걱정 없이, 쌱-하고 빠르게 핵심에 집중하도록.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
            시작하기
          </button>
          <button className="px-4 py-2 font-bold text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
            GitHub
          </button>
        </div>
      </div>
    </main>
  )
}
