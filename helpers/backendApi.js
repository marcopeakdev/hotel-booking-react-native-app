class BackendApi {
  constructor(service) {
    this.config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_TOKEN}`,
        method: "GET",
        "Content-Type": "application/json",
      },
    };
    console.log(process.env.NEXT_PUBLIC_BACKEND_PORT);
    this.backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${
      process.env.NEXT_PUBLIC_BACKEND_PORT
        ? `:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
        : ""
    }/${service}`;
  }
  getConfig(method = "GET") {
    return {
      ...this.config,
      headers: { ...this.config.headers, method },
    };
  }
}

export { BackendApi };
