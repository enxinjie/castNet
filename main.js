
const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  if (!sidebar || !toggleButton) return;

  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");
  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!sidebar || !toggleButton || !button?.nextElementSibling) return;

  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    toggleButton.classList.remove("rotate");
  }
}

function closeAllSubMenus() {
  if (!sidebar) return;

  Array.from(sidebar.getElementsByClassName("show")).forEach((menu) => {
    menu.classList.remove("show");
    menu.previousElementSibling?.classList.remove("rotate");
  });
}

const demoOpportunities = [
  {
    id: 1,
    title: "Junior STEM Research Intern",
    company: "Northstar Discovery Lab",
    field: "Science & Research",
    location: "Hybrid",
    pay: "$18/hour",
    type: "Paid",
    period: "Summer",
    description:
      "Assist with beginner-friendly science experiments, research, and data collection.",
    tags: ["STEM", "Paid", "FirstGen"]
  },
  {
    id: 2,
    title: "Environmental Science Intern",
    company: "Green Horizon Initiative",
    field: "Science & Research",
    location: "In-Person",
    pay: "$17/hour",
    type: "Paid",
    period: "Summer",
    description:
      "Analyze environmental data and support community sustainability projects.",
    tags: ["STEM", "Paid", "LearningDisabled"]
  },
  {
    id: 3,
    title: "First-Generation Student Success Intern",
    company: "Bridgeway Scholars Project",
    field: "Education",
    location: "Remote",
    pay: "Unpaid",
    type: "Unpaid",
    period: "Year-Round",
    description:
      "Help create college-readiness resources and share information about student support programs.",
    tags: ["FirstGen"]
  },
  {
    id: 4,
    title: "Community Education Intern",
    company: "Open Doors Learning Collective",
    field: "Education",
    location: "Hybrid",
    pay: "$16/hour",
    type: "Paid",
    period: "Fall",
    description:
      "Support workshops about college applications, financial aid, and academic planning.",
    tags: ["FirstGen", "Paid", "Women"]
  },
  {
    id: 5,
    title: "Women in Technology Intern",
    company: "Nova Code Studio",
    field: "Technology",
    location: "Remote",
    pay: "$20/hour",
    type: "Paid",
    period: "Summer",
    description:
      "Work on beginner software projects and learn from a fictional women-led engineering team.",
    tags: ["Women", "STEM", "Paid"]
  },
  {
    id: 6,
    title: "Women in Engineering Intern",
    company: "BrightPath Engineering",
    field: "Engineering",
    location: "Hybrid",
    pay: "Unpaid",
    type: "Unpaid",
    period: "Spring",
    description:
      "Explore engineering design, collaborate on prototypes, and learn about technical careers.",
    tags: ["Women", "STEM"]
  },
  {
    id: 7,
    title: "Accessible Technology Intern",
    company: "ClearSignal Accessibility Lab",
    field: "Technology",
    location: "Remote",
    pay: "$19/hour",
    type: "Paid",
    period: "Summer",
    description:
      "Evaluate captions, visual alerts, and accessible communication tools for people who are hard of hearing.",
    tags: ["HardofHearing", "STEM", "Paid"]
  },
  {
    id: 8,
    title: "Hard-of-Hearing Community Outreach Intern",
    company: "Open Ears Community Project",
    field: "Nonprofit",
    location: "Hybrid",
    pay: "Unpaid",
    type: "Unpaid",
    period: "Year-Round",
    description:
      "Develop accessible community resources and promote inclusive communication.",
    tags: ["HardofHearing", "FirstGen"]
  },
  {
    id: 9,
    title: "Paid Digital Media Intern",
    company: "Peach Tree Creative Lab",
    field: "Marketing & Communications",
    location: "Remote",
    pay: "$17/hour",
    type: "Paid",
    period: "Fall",
    description:
      "Create social media content, assist with campaigns, and build a digital portfolio.",
    tags: ["Paid", "Women"]
  },
  {
    id: 10,
    title: "Community Data Intern",
    company: "Common Ground Data Project",
    field: "Technology",
    location: "Hybrid",
    pay: "$18/hour",
    type: "Paid",
    period: "Summer",
    description:
      "Organize community survey data and build simple charts to communicate findings.",
    tags: ["Paid", "STEM", "FirstGen"]
  },
  {
    id: 11,
    title: "Accessible Learning Design Intern",
    company: "Learning Without Limits Studio",
    field: "Education",
    location: "Remote",
    pay: "Unpaid",
    type: "Unpaid",
    period: "Spring",
    description:
      "Design clear, accessible learning materials for students with different learning needs.",
    tags: ["LearningDisabled", "HardofHearing"]
  },
  {
    id: 12,
    title: "Inclusive Education Research Intern",
    company: "Every Learner Research Group",
    field: "Science & Research",
    location: "Hybrid",
    pay: "$16/hour",
    type: "Paid",
    period: "Fall",
    description:
      "Research inclusive classroom practices and summarize findings for educators.",
    tags: ["LearningDisabled", "STEM", "Paid"]
      "Research inclusive classroom practices and help summarize findings for educators.",
    tags: ["LearningDisabled", "STEM", "Paid"],
    accessibility: [
      "Flexible work hours",
      "Accessible research materials",
      "Interview accommodations available"
    ]
  }
];

function renderOpportunities() {
  const opportunityList = document.getElementById("opportunities-list");

  if (!opportunityList) return;

  const heading = document.getElementById("opportunities-heading");
  const description = document.getElementById("opportunities-description");
  const emptyMessage = document.getElementById("no-opportunities");

  const params = new URLSearchParams(window.location.search);
  const selectedTag = params.get("tag");

  const validTags = [
    "STEM",
    "FirstGen",
    "Women",
    "HardofHearing",
    "Paid",
    "LearningDisabled"
  ];

  const matchingTag = validTags.find(
    (tag) => tag.toLowerCase() === selectedTag?.toLowerCase()
  );

  const filteredOpportunities = matchingTag
    ? demoOpportunities.filter((opportunity) =>
        opportunity.tags.some(
          (tag) => tag.toLowerCase() === matchingTag.toLowerCase()
        )
      )
    : demoOpportunities;

  if (heading) {
    heading.textContent = matchingTag
      ? `#${matchingTag} Opportunities`
      : "All Opportunities";
  }

  if (description) {
    description.textContent = matchingTag
      ? `Explore internships tagged #${matchingTag}.`
      : "Browse every internship and discover your next opportunity.";
  }

  opportunityList.innerHTML = filteredOpportunities.map((opportunity) => `
    <article class="opportunity-card">
      <h3>${opportunity.title}</h3>
        <div class="opportunity-details">
          <span>${opportunity.field}</span>
          <span>${opportunity.location}</span>
          <span>${opportunity.pay}</span>
          <span>${opportunity.period}</span>
        </div>
${opportunity.accessibility ? `
  <div class="accessibility-box">
    <h4>Accessibility & Inclusion ♿︎</h4>

      <p class="opportunity-company">${opportunity.company}</p>

      <div class="opportunity-details">
        <span>${opportunity.field}</span>
        <span>${opportunity.location}</span>
        <span>${opportunity.pay}</span>
        <span>${opportunity.period}</span>
      </div>

      <p class="opportunity-description">
        ${opportunity.description}
      </p>

      <div class="opportunity-tags">
        ${opportunity.tags.map((tag) => `
          <a
            href="opportunities.html?tag=${encodeURIComponent(tag)}"
            class="opportunity-tag"
          >#${tag}</a>
        `).join("")}
      </div>

    <div class="opportunity-actions">
<a href="https://www.google.com" class="apply-opportunity-button" target="_blank" rel="noopener noreferrer">
    Apply Here!
</a>
      </div>
    </article>
  `).join("");

  if (emptyMessage) {
    emptyMessage.hidden = filteredOpportunities.length > 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderOpportunities();
});
const form = document.getElementById("myForm");
const responseMsg = document.getElementById("responseMessage");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default page refresh

  // Disable button to prevent double submission
  submitBtn.disabled = true;

  // Show the brief message
  responseMsg.textContent = "Your form has been submitted successfully!";
  responseMsg.style.display = "block";

  // Reset form and hide message after 4 seconds
  setTimeout(() => {
    responseMsg.style.display = "none";
    submitBtn.disabled = false;
    form.reset();
  }, 4000);
});

