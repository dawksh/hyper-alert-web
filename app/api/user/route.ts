import axios from "axios"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const wallet = searchParams.get('wallet')
    const { data } = await axios.get(`${process.env.API_URL}/user/`, {
        params: {
            wallet
        }
    })
    return Response.json(data)
}