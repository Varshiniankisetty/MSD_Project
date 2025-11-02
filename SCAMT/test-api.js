// Test script for API functions
import { getServices } from './src/utils/apiUtils.js';

// Test the API connection
async function testAPI() {
  try {
    console.log('Testing API connection...');
    const services = await getServices();
    console.log('Services fetched successfully:', services);
  } catch (error) {
    console.error('API test failed:', error.message);
    console.log('This is expected if the backend server is not running');
  }
}

testAPI();
