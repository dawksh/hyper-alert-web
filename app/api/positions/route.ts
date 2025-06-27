import axios from "axios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const wallet = searchParams.get('wallet')
    try {
        const { data } = await axios.get(`${process.env.API_URL}/user/user-positions`, {
            params: {
                wallet
            }
        })
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch positions' }, { status: 500 });
    }
}
