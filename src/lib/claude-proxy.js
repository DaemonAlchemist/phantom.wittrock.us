exports.handler = (event, _context, callback) => {
    const request = event.Records[0].cf.request;

    // Check if URL starts with /claude
    if (request.uri.startsWith('/claude/')) {
        request.uri = request.uri.replace('/claude/', '');

        // Instead of modifying the host header directly, which isn't allowed,
        // you can use an 'origin' object to override the default CloudFront origin.
        // This approach is effective for directing requests to a different backend
        // without violating header modification rules in Lambda@Edge.
        request.origin = {
            custom: {
                domainName: 'api.anthropic.com',  // Specify the new target domain
                port: 443,                        // Standard HTTPS port
                protocol: 'https',                // Use HTTPS
                path: '',                         // Path is typically empty unless you need a specific base path
                sslProtocols: ['TLSv1.2'],       // Define allowed SSL protocols
                readTimeout: 5,                   // Timeout in seconds
                keepaliveTimeout: 5,              // Keep-alive timeout in seconds
                customHeaders: {}                 // Optional: Any required custom headers
            }
        };
    }

    // Return control to CloudFront to continue processing this request
    callback(null, request);
};
