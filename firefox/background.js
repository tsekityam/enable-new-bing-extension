"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/
let targetPage = "https://www.bing.com/*";

/*
Initialize the UA to Edge 111.
*/
let ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62";

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  for (let header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: [targetPage]},
                                          ["blocking", "requestHeaders"]);

/*
Update ua to a new value, mapped from the uaString parameter.
*/
function setUaString(uaString) {
  ua = uaStrings[uaString];
}
