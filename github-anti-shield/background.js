chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const url = details.url;
    if (
      url.includes("github.com")       || 
      url.includes("githubusercontent.com") ||
      url.includes("githubassets.com")
    ) {
      let headers = details.requestHeaders;
      let seen = false;
      for (let h of headers) {
        if (h.name.toLowerCase() === "accept-language") {
          h.value = "en-US;q=0.8,en;q=0.7";
          seen = true;
          break;
        }
      }
      if (!seen) {
        headers.push({ name: "Accept-Language", value: "en-US;q=0.8,en;q=0.7" });
      }
      return { requestHeaders: headers };
    }
    return {};
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking", "requestHeaders"]
);