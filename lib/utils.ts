import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertLinksToAnchors(text: string): string {
  // Regex for website links
  const websiteRegex = /(https?:\/\/(?!github\.com)[^\s]+)/gi

  // Regex for GitHub URLs (including repositories)
  const githubRegex = /(https?:\/\/)?(www\.)?github\.com(\/[a-zA-Z0-9_-]+){0,2}\/?/gi

  // Regex for specific email addresses
  const infoEmailRegex = /\b(info@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)\b/gi
  const outreachEmailRegex = /\b(outreach@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)\b/gi

  // Replace website links
  text = text.replace(websiteRegex, (match) => {
    const url = match.startsWith("http") ? match : `https://${match}`
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Website</a>`
  })

  // Replace GitHub URLs
  text = text.replace(githubRegex, (match) => {
    const url = match.startsWith("http") ? match : `https://${match}`
    if (url === "https://github.com" || url === "https://github.com/") {
      return '<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">GitHub</a>'
    } else {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">GitHub</a>`
    }
  })

  // Replace info@griotandgrits.org email addresses
  text = text.replace(infoEmailRegex, '<a href="mailto:$1" class="text-blue-500 underline">info@griotandgrits.org</a>')

  // Replace outreach@griotandgrits.org email addresses
  text = text.replace(outreachEmailRegex, '<a href="mailto:$1" class="text-blue-500 underline">outreach@griotandgrits.org</a>')

  return text
}