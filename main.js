const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}



const demoOpportunities = [
  {
    id: 1,
    title: "STEM Research Intern",
    company: "Northstar Discovery Lab",
    field: "Science & Research",
    location: "Hybrid",
    pay: "$18/hour",
    type: "Paid Internship",
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
    type: "Paid Internship",
    period: "Summer",
    description:
  "Help analyze environmental data and support community sustainability projects.",
tags: ["STEM", "Paid", "LearningDisabled"],
accessibility: [
  "Flexible work hours",
  "Accessible training materials",
  "Interview accommodations available"
],
  },
  {
    id: 3,
    title: "First-Generation Student Success Intern",
    company: "Bridgeway Scholars Project",
    field: "Education",
    location: "Remote",
    pay: "Unpaid",
    type: "Unpaid Internship",
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
    type: "Paid Internship",
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
    type: "Paid Internship",
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
    type: "Unpaid Internship",
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
    type: "Paid Internship",
    period: "Summer",
    description:
      "Help evaluate captions, visual alerts, and accessible communication tools for people who are hard of hearing.",
    tags: ["HardofHearing", "STEM", "Paid"]
  },
  {
    id: 8,
    title: "Deaf and Hard-of-Hearing Outreach Intern",
    company: "Open Ears Community Project",
    field: "Nonprofit",
    location: "Hybrid",
    pay: "Unpaid",
    type: "Unpaid Internship",
    period: "Year-Round",
    description:
      "Help develop accessible community resources and promote inclusive communication.",
    tags: ["HardofHearing", "FirstGen"]
  },

  {
    id: 9,
    title: "Paid Digital Media Intern",
    company: "Peach Tree Creative Lab",
    field: "Marketing & Communications",
    location: "Remote",
    pay: "$17/hour",
    type: "Paid Internship",
    period: "Fall",
    description:
      "Create social media content, assist with campaigns, and build a digital portfolio.",
    tags: ["Paid", "Women"]
  },
  {
    id: 10,
    title: "Paid Community Data Intern",
    company: "Common Ground Data Project",
    field: "Technology",
    location: "Hybrid",
    pay: "$18/hour",
    type: "Paid Internship",
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
    type: "Unpaid Internship",
    period: "Spring",
    description:
  "Help design clear, accessible learning materials for students with different learning needs.",
tags: ["LearningDisabled", "HardofHearing"],
accessibility: [
  "Interview accommodations available",
  "Flexible deadlines",
  "Accessible learning materials",
  "Mentorship for neurodivergent students"
]
  },
  {
    id: 12,
    title: "Inclusive Education Research Intern",
    company: "Cypher Tech Solutions",
    field: "Science & Research",
    location: "Hybrid",
    pay: "$16/hour",
    type: "Paid Internship",
    period: "Fall",
    description:
      "Research inclusive classroom practices and help summarize findings for educators.",
    tags: ["LearningDisabled", "STEM", "Paid"],
    accessibility: [
      "Flexible work hours",
      "Accessible research materials",
      "Interview accommodations available"
    ]
  }
];

const opportunityList =
  document.getElementById("opportunities-list");

if (opportunityList) {
  const heading =
    document.getElementById("opportunities-heading");

  const description =
    document.getElementById("opportunities-description");

  const emptyMessage =
    document.getElementById("no-opportunities");

  const params = new URLSearchParams(window.location.search);
  const selectedTag = params.get("tag");

  const filteredOpportunities = selectedTag
    ? demoOpportunities.filter(opportunity =>
        opportunity.tags.some(
          tag => tag.toLowerCase() === selectedTag.toLowerCase()
        )
      )
    : demoOpportunities;

  if (selectedTag) {
    heading.textContent = `#${selectedTag} Opportunities`;
    description.textContent =
      `Explore internships tagged #${selectedTag}.`;
  } else {
    heading.textContent = "All Opportunities";
    description.textContent =
      "Browse every internship and discover your next opportunity.";
  }

  opportunityList.innerHTML = filteredOpportunities
    .map(opportunity => `
      <article class="opportunity-card">
        <span class="demo-label">DEMO LISTING</span>

        <h3>${opportunity.title}</h3>
        <p class="opportunity-company">${opportunity.company}</p>

        <div class="opportunity-details">
          <span>${opportunity.field}</span>
          <span>${opportunity.location}</span>
          <span>${opportunity.pay}</span>
          <span>${opportunity.period}</span>
        </div>
${opportunity.accessibility ? `
  <div class="accessibility-box">
    <h4>Accessibility & Inclusion ♿︎</h4>

    <p class="accessibility-label">
      Support offered by this opportunity
    </p>

    <ul class="accessibility-list">
      ${opportunity.accessibility.map(item => `
        <li>${item}</li>
      `).join("")}
    </ul>
  </div>
` : ""}

        <p class="opportunity-description">
          ${opportunity.description}
        </p>

        <div class="opportunity-tags">
          ${opportunity.tags.map(tag => `
            <a href="opportunities.html?tag=${encodeURIComponent(tag)}"
               class="opportunity-tag">
              #${tag}
            </a>
          `).join("")}
        </div>

      </article>
    `)
    .join("");

  emptyMessage.hidden = filteredOpportunities.length > 0;
}

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