import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

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
        const { data } = await axios.get(`${process.env.API_URL}/user/user-positions`, {
            params: {
                wallet: wallet,
            }
        })
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch positions' }, { status: 500 });
    }
}
