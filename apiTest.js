const { chromium } = require('playwright');

async function runTests() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Test endpoint 1: Retrieve pet by ID
    await page.goto('https://petstore.swagger.io/v2/pet/1');
    const petData = await page.textContent('.json-schema-tree');
    console.log('Pet Data:', JSON.parse(petData));

    // Test endpoint 2: Retrieve inventory status
    await page.goto('https://petstore.swagger.io/v2/store/inventory');
    const inventoryData = await page.textContent('.json-schema-tree');
    console.log('Inventory Data:', JSON.parse(inventoryData));

    // Test endpoint 3: Retrieve available pets by status
    await page.goto('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
    const availablePetsData = await page.textContent('.json-schema-tree');
    console.log('Available Pets Data:', JSON.parse(availablePetsData));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

runTests();
