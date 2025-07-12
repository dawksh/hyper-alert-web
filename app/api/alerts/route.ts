import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const wallet = searchParams.get("wallet");
        if(wallet) {
            const { data } = await axios.get(`${process.env.API_URL}/user/alerts`, {
                params: {
                    wallet,
                },
            });
            return Response.json(data);
        }
        const { data } = await axios.get(`${process.env.API_URL}/user/alerts`);
        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: error },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.address) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    const { data } = await axios.post(`${process.env.API_URL}/user/set-alerts`, await request.json());
    return Response.json(data);
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.address) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const positionId = await request.text();
        const { data } = await axios.post(`${process.env.API_URL}/user/acknowledge-alerts`, { alert: positionId });
        return Response.json(data);
    } catch(err) {
        console.log(err)
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}