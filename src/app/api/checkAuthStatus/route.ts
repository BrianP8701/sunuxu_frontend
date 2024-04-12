export async function GET(request: Request) {
    // Check the authentication status here
    // Return the appropriate response

    return new Response(JSON.stringify({
        authenticated: true,
        user: {
            username: "testuser",
            email: "test@example.com",
            phoneNumber: "123-456-7890",
            firstName: "Test",
            middleName: "",
            lastName: "User",
            transactionIds: [],
        }
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}