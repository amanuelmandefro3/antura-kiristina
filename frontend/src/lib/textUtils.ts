export function extractFirstParagraph(content: string, maxLength: number): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
  
    // Find all paragraph elements
    const paragraphs = doc.querySelectorAll("p")
  
    // Find the first non-empty paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraphText = paragraphs[i].textContent?.trim() || ""
      if (paragraphText.length > 0) {
        return paragraphText.length > maxLength ? paragraphText.slice(0, maxLength) + "..." : paragraphText
      }
    }
  
    return "No paragraph content found."
  }
  
  