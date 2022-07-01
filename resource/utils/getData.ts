const getData = (data: any) => {
    const payload = JSON.parse(data.Payload);
    const body = JSON.parse(payload.body);
    if (payload.statusCode === 200 && body) {
        return body.data;
    } else {
        if (payload?.body) {
            throw typeof payload?.body === 'string' ? JSON.parse(payload?.body) : payload?.body;
        }
        throw { error: body?.error };
    }
};

export {
    getData
}