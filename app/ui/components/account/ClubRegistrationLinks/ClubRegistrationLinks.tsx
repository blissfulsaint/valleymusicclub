export default async function ClubRegistrationLinks() {
    // Code to test skeleton component fallback
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async function doSomething() {
    console.log('Waiting...');
    await delay(2000); // Waits 2 seconds
    console.log('Done waiting!');
    }

    await doSomething();
    // End of test code
    return (
        <p>This is the ClubRegistrationLinks component!</p>
    )
}