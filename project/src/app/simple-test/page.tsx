'use client'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Simple Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Test Card</h2>
          <p className="text-gray-600 mb-4">This is a simple test to verify Tailwind CSS is working.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Test Button
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">CSS Test 1</h3>
            <p className="text-green-700">Testing background colors and text colors</p>
          </div>
          
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800">CSS Test 2</h3>
            <p className="text-purple-700">Testing responsive grid layout</p>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Gradient Test</h2>
          <p>This tests gradient backgrounds.</p>
        </div>
      </div>
    </div>
  )
}
