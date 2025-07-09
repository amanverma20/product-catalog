// Test API accessibility
async function testAPI() {
  try {
    console.log('Testing API...')
    const response = await fetch('https://fakestoreapi.in/api/products?page=1&limit=8')
    const data = await response.json()
    console.log('API Response:', data)
    return data
  } catch (error) {
    console.error('API Error:', error)
    return null
  }
}

testAPI()
