const BASE_URL = 'http://localhost:4500'; // Update this if deployed

// Test root API
async function testRoot() {
    try {
        const response = await fetch(`${BASE_URL}/`);
        const data = await response.json();
        console.log('Root API Response:', data);
    } catch (err) {
        console.error('Root API Error:', err);
    }
}

// Test brand registration
async function testRegisterBrand() {
    try {
        const response = await fetch(`${BASE_URL}/register-brand`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'branduser2@example.com',
                password: 'pass123',
                name: 'Brand Co.',
                type: 'Product',
                category: 'Retail',
                website: 'https://brandco2.com'
            })
        });

        const data = await response.json();
        console.log('Brand Registration Response:', data);
    } catch (err) {
        console.error('Brand Registration Error:', err);
    }
}

// Test creator registration
async function testRegisterCreator() {
    try {
        const response = await fetch(`${BASE_URL}/register-creator`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'creator2@example.com',
                password: 'pass456',
                name: 'Creator Person',
                telegram: '@creator2',
                country: 'India',
                state: 'Gujarat'
            })
        });

        const data = await response.json();
        console.log('Creator Registration Response:', data);
    } catch (err) {
        console.error('Creator Registration Error:', err);
    }
}

// Run all tests
async function runTests() {
    await testRoot();
    await testRegisterBrand();
    await testRegisterCreator();
}

runTests();