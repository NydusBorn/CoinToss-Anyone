export async function apiGet<T>(url: string): Promise<T> {
    const Response = await fetch(url);
    if (Response.ok) {
        return Response.json() as T;
    }
    else
    {
        console.log("apiget failed");
        console.log(`is it ok? ${Response.ok}`);
        console.log(`status code: ${Response.status}`);
        console.log(`status text: ${Response.statusText}`);
        console.log(`url: ${Response.url}`);

        console.log(`body: ${typeof Response.body}`);
        console.log(`json: ${await Response.json()}`);
        throw new Error("Get failure");
    }
}

export async function apiPost<T>(url: string, data: object): Promise<T> {
    const Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (Response.ok) {
        return Response.json() as T;
    }
    else
    {
        console.log("apipost failed");
        console.log(`is it ok? ${Response.ok}`);
        console.log(`status code: ${Response.status}`);
        console.log(`status text: ${Response.statusText}`);
        console.log(`url: ${Response.url}`);
        console.log(`body: ${typeof Response.body}`);
        console.log(`request body: ${JSON.stringify(data)}`)
        console.log(`json: ${await Response.json()}`);
        throw new Error("Get failure");
    }
}
