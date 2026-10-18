// Keep each selected filter by its group and value so chips can update independently.
const filterComponent = document.getElementById("opportunity-filters");
const dropdowns = document.querySelectorAll(".filter-dropdown");
const checkboxes = document.querySelectorAll(".dropdown-option input[type='checkbox']");
const selectedFiltersElement = document.getElementById("selected-filters");
const selectedChips = document.getElementById("selected-chips");
const clearAllButton = document.getElementById("clear-all-button");
const customLocationInput = document.getElementById("custom-location-input");
const addLocationButton = document.getElementById("add-location-button");

const selectedFilters = new Map();

function getSelectionKey(group, value) {
    return `${group}:${value.trim().toLocaleLowerCase()}`;
}

// Show one dropdown at a time and keep its button state in sync.
function setOpenDropdown(openDropdown) {
    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".filter-button");
        const menu = dropdown.querySelector(".dropdown-menu");
        const isOpen = dropdown === openDropdown;

        button.setAttribute("aria-expanded", String(isOpen));
        menu.hidden = !isOpen;
    });
}

// Rebuild chips from the current selection map.
function renderSelectedFilters() {
    selectedChips.replaceChildren();

    selectedFilters.forEach((filter, key) => {
        const chip = document.createElement("span");
        chip.className = "filter-chip";

        const label = document.createElement("span");
        label.textContent = filter.value;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-chip-button";
        removeButton.type = "button";
        removeButton.setAttribute("aria-label", `Remove ${filter.value} filter`);
        removeButton.textContent = "×";
        removeButton.addEventListener("click", () => {
            selectedFilters.delete(key);
            updateCheckboxes();
            renderSelectedFilters();
        });

        chip.append(label, removeButton);
        selectedChips.append(chip);
    });

    selectedFiltersElement.hidden = selectedFilters.size === 0;
}

// Keep visible checkboxes synchronized when a chip or Clear All is used.
function updateCheckboxes() {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectedFilters.has(checkbox.dataset.selectionKey);
    });
}

dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".filter-button");

    button.addEventListener("click", () => {
        const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";
        setOpenDropdown(isAlreadyOpen ? null : dropdown);
    });
});

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const key = checkbox.dataset.selectionKey;

        if (checkbox.checked) {
            selectedFilters.set(key, {
                group: checkbox.dataset.filterGroup,
                value: checkbox.value
            });
        } else {
            selectedFilters.delete(key);
        }

        renderSelectedFilters();
    });
});

function addCustomLocation() {
    const value = customLocationInput.value.trim();
    if (!value) {
        customLocationInput.focus();
        return;
    }

    const key = getSelectionKey("location", value);
    if (!selectedFilters.has(key)) {
        selectedFilters.set(key, { group: "location", value });
    }

    customLocationInput.value = "";
    updateCheckboxes();
    renderSelectedFilters();
    customLocationInput.focus();
}

addLocationButton.addEventListener("click", addCustomLocation);

customLocationInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addCustomLocation();
    }
});

clearAllButton.addEventListener("click", () => {
    selectedFilters.clear();
    customLocationInput.value = "";
    updateCheckboxes();
    renderSelectedFilters();
});

document.addEventListener("click", (event) => {
    if (!filterComponent.contains(event.target)) {
        setOpenDropdown(null);
    }
});