import axios from "axios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    try {
        const { data } = await axios.get(`${process.env.API_URL}/user/alerts`, {
            params: {
                wallet,
            },
        });
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const { data } = await axios.post(`${process.env.API_URL}/user/set-alerts`, await request.json());
    return Response.json(data);
}

export async function DELETE(request: Request) {
    const body = await request.json()
    const { data } = await axios.post(`${process.env.API_URL}/user/acknowledge-alerts`, { alerts: body });
    return Response.json(data);
}