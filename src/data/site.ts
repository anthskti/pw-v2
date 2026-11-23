export const about = {
  heading: "Hey, I'm Anthony (or Anth)",
  introduction:
    "I'm a Software Engineer based in Toronto, Canada, focused on website development, AI, and data analysis.",
  outsideWork:
    "Outside of engineering, I've enjoyed doing calisthenics, playing piano(ish), cooking, video editing (kind of retired), playing video games, Clash Royale (11,500 trophies), and chess (peaked at 906 elo).",
  affiliations: [
    { field: "Software Engineering", organization: "UofTHacks", href: "https://uofthacks.com/" },
    { field: "Content Creation", organization: "Blossom Social", href: "https://www.instagram.com/anthassets" },
    { field: "Computer Science", organization: "LSE at York University", href: "https://www.yorku.ca/" },
  ],
} as const;

export const siteLinks = [
  { label: "Resume", href: "/anthony_pham_resume.pdf", newTab: true },
  { label: "GitHub", href: "https://github.com/anthskti", newTab: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anthpham/", newTab: true },
  { label: "Email", href: "mailto:phamanthony47@gmail.com", newTab: false },
] as const;

export const dialSections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "edits", label: "Edits" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;
