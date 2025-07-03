import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.address) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    if(wallet && wallet !== session.address) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
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
    const session = await getServerSession(authOptions)
    if (!session?.address) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    const body = await request.json()
    const { data } = await axios.post(`${process.env.API_URL}/user/acknowledge-alerts`, { alerts: body });
    return Response.json(data);
}