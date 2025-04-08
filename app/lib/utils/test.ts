export async function getTestData() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "Test complete!";
}