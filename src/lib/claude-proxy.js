exports.handler = (event:any, _context:any, callback:any) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // Check if URL starts with /claude
    if (request.uri.startsWith('/claude/')) {
        request.uri = request.uri.replace('/claude/', '/');
        // Change the host header to the target API
        headers.host = [{ key: 'host', value: 'api.anthropic.com' }];
        // Optionally, you can add logic to modify other headers or query strings
    }

    // Return control to CloudFront to continue processing this request
    callback(null, request);
};
