//top

/*NAVIGATION BAR BUTTONS*/
const bottomNavBar = document.querySelector(".bottom-navigation-bar");
const journalButton = document.querySelector(".journalButton");
const homeButton = document.querySelector(".homeButton");
const profileButton = document.querySelector(".profileButton");


/*SECTIONS*/
const usersJournalsSection = document.querySelector(".users-journals-container");
const homePageSection = document.querySelector(".home-page");
const registerLoginSection = document.querySelector(".register-login-container");
const usersJournalsContainer = document.querySelector(".users-journals");
const userProfilePageSection = document.querySelector(".profile-page");
const journalEntriesSection = document.querySelector(".journal-entries-container");
const mainFeedSection = document.querySelector(".main-feed");
const recentPosts = document.querySelector(".recent-entries-container");
const sidebarJournalContainer = document.querySelector("#sidebar-journals");
const editProfileForm = document.querySelector("#edit-profile-form");
const foundUsersContainer = document.querySelector(".found-users-container");
const searchForUsers = document.querySelector(".search-for-users");
const showUsersFriends = document.querySelector(".show-users-friends");
const showUsersFriendsContainer = document.querySelector(".show-users-friends-container");
const friendRequestContainer = document.querySelector(".friend-request-container");
const sidebar = document.querySelector(".sidebar");

/*POPUPS*/
const editJournalPopup = document.querySelector(".edit-journal-popup");
const createEntryPopup = document.querySelector(".create-entry-popup");
const editProfilePagePopup = document.querySelector(".edit-profile-page-popup");
const createJournalPopup = document.querySelector(".create-journal-popup");
const editEntryPopup = document.querySelector(".edit-entry-popup");
const alerts = document.querySelector(".alerts");
const confirmation = document.querySelector(".confirmation");
const friendRequestPopup = document.querySelector(".friend-request-popup");
const commentsPanel = document.querySelector(".comments-panel");
const commentsOverlay = document.querySelector(".comments-overlay");
const commentsList = document.querySelector(".comments-list");
const feedbackFormPopup = document.querySelector(".feedback-form");


/*REGISTRATION ELEMENTS*/
const registrationToggleButton = document.querySelector("#togglePassword");
const link = document.querySelector(".link");
const registrationForm = document.querySelector("#registration-form");
const loginForm = document.querySelector("#login-form");
const passwordBox = document.querySelector("#password");
const reEnterPasswordBox = document.querySelector("#re-enter-password");
const visibilityStatus = document.querySelector("#visibility");
const reEnterPasswordVisibilityStatus = document.querySelector("#re-enter-password-visibility");

/*LOGIN ELEMENTS*/
const loginToggleButton = document.querySelector("#login-toggle-password");
const loginPassword = document.querySelector("#login-password");
const loginvisibilityStatus = document.querySelector("#login-visibility");
const haveAccount = document.querySelector("#have-account");
const regOrLogin = document.querySelector("#reg-or-log");

/*BUTTONS*/
const myJournalsButton = document.querySelector(".my-journals-button");
const cancelEntryButton = document.querySelector("#create-entry-cancel-button");
const logoutButton = document.querySelector(".logout-button");
const feedbackButton = document.querySelector(".feedback-button");
const cancelJournalButton = document.querySelector("#cancel-journal-button");
const addJournalButton = document.querySelector(".add-journal-button");
const createJournalButton = document.querySelector("#create-journal-button");
const addEntryButton = document.querySelector("#add-entry-button");
const submitEntryButton = document.querySelector("#create-entry-submit-button");
const editProfileButton = document.querySelector(".edit-profile-button");
const cancelEditProfile = document.querySelector("#cancel-edit-profile");
const submitEditJournalButton = document.querySelector("#submit-edit-journal-button");
const cancelEditJournalButton = document.querySelector("#cancel-edit-journal-button");
const submitEditEntryButton = document.querySelector("#submit-edit-entry-button");
const cancelEditEntryButton = document.querySelector("#cancel-edit-entry-button");
const exitAlert = document.querySelector(".exit-alert");
const exitConfirmation = document.querySelector(".exit-confirmation");
const yesConfirmation = document.querySelector(".yes-confirmation");
const searchButton = document.querySelector(".search-btn");
const findingUsersSearchButton = document.querySelector(".finding-users-search-btn");
const friendsOnlyFeedButton = document.querySelector(".my-friends-feed-button");
const allFeedButton = document.querySelector(".all-feed-button");
const userStatisticsFriendAmount = document.querySelector("#user-statistics-friends-amount");
const friendRequestButton = document.querySelector(".friend-request-button");
const closeFriendRequestButton = document.querySelector(".close-friend-request-button");
const entrySubmittedPhoto = document.querySelector("#entry-submitted-photo");
const sidebarToggleBtn = document.querySelector("#toggle-sidebar");
const closeCommentsBtn = document.querySelector("#close-comments");
const submitComments = document.querySelector("#submit-comment");
const toggleTheme = document.querySelectorAll(".toggle-theme");
const closeFeedbackButton = document.querySelector("#close-feedback");
const submitFeedbackButton = document.querySelector("#submit-feedback");
const deletePhotoButton = document.querySelector("#delete-entry-photo-button");
const selectColorInput = document.querySelector(".select-entry-color");
const editColorInput = document.querySelector(".edit-entry-color");
const profileColor = document.querySelector(".select-profile-color");


/*VARIABLES*/
let currentJournalId = null;
let coverSrc;
let selectedCover = null;
let editingJournalId = null;
let editingEntryId = null;
let editingEntryPhoto = null;
let originalEntry = null;;
let currentEntry = null;
let editEntryPhoto = null;
let type = "";
let entryProfilePic = null;
const savedTheme = localStorage.getItem("theme-preference");
let removePhoto = false;
let profileColorTheme = '';
let commentsAmount = null;


/*TEXT*/
const noJournalsTxt = document.querySelector("#no-journals-txt");
const entryTextInput = document.querySelector("#entry-text");
const entryName = document.querySelector("#entry-name");
const entryText = document.querySelector("#entry-content");
const noEntriesTxt = document.querySelector("#no-entries-txt");
const userUsername = document.querySelector(".user-username");
const userBio = document.querySelector(".user-bio");
const editJournalNameInput = document.querySelector(".edit-journal-name-input");
const editEntryNameInput = document.querySelector("#edit-entry-name");
const editEntryPhotoInput = document.querySelector("#edit-entry-photo");
const editEntryContentInput = document.querySelector("#edit-entry-content");
const alertsHeading = document.querySelector(".alert-heading");
const alertsDescription = document.querySelector(".alert-description");
const confirmationTxt = document.querySelector(".confirmation-txt");
const searchBar = document.querySelector(".search-bar");
const findingUsersSearchBar = document.querySelector(".finding-users-search-bar");
const createJournalNameInput = document.querySelector(".journal-name-input");
const commentInput = document.querySelector("#comment-input");
const feedbackContent = document.querySelector("#feedback-content");
const feedbackOptions = document.querySelector("#feedback-options");
const editPasswordEmail = document.querySelector("#edit-password-email");
const editPassword = document.querySelector("#edit-password");
const editEmail = document.querySelector("#edit-email");




/*IMAGE*/
const profileImage = document.querySelector("#profileImage");
const journalCovers = document.querySelectorAll(".journal-cover");
let commentsProfilePic = document.querySelector(".comments-profile-image");


/*DISPLAY SECTIONS*/
async function showDisplaySection(section) {
    const sections = [usersJournalsSection, homePageSection, registerLoginSection, userProfilePageSection, journalEntriesSection, searchForUsers, showUsersFriendsContainer];
    sections.forEach(sec => sec.style.display = 'none');

    recentPosts.style.display = 'none';

    section.style.display = "flex";

    if (section === userProfilePageSection) {
        recentPosts.style.display = "flex";
    }

}


/*GET THEME BASED ON PREFERENCE*/
if (localStorage.getItem("theme-preference") === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}
updateThemeIcon();

function updateThemeIcon() {
    toggleTheme.forEach(btn => {
        btn.textContent = document.body.classList.contains("dark") ? "dark_mode" : "light_mode";
    });
}

/*THEME TOGGLE*/
toggleTheme.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        btn.textContent = document.body.classList.contains("dark") ? "dark_mode" : "light_mode";
        localStorage.setItem("theme-preference", document.body.classList.contains("dark") ? "dark" : "light");
    })
})


/*RELOAD BASED ON SECTION*/
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const currentUserId = await getCurrentUserId();

        if (!currentUserId) {
            showDisplaySection(registerLoginSection);
            loginForm.style.display = "flex";
            bottomNavBar.style.display = "none";
            registrationForm.style.display = "none";
            link.textContent = "Register Here!";
            haveAccount.textContent = "Don't Have An Account?"
            regOrLogin.textContent = "Please Login Here."
            return;
        }
        updateProfileColors()

        const savedPage = localStorage.getItem("activePage");
        const section = document.querySelector(`.${savedPage}`);

        if (section === usersJournalsSection) {
            recentPosts.style.display = "none";
            showDisplaySection(usersJournalsSection);
            displayUserJournals();
            usersJournalsContainer.style.display = "flex";
            closePopups();
        }
        else if (section === userProfilePageSection) {
            showDisplaySection(userProfilePageSection);
            updateProfilePage();
            displayRecentPosts();
            updateThemeIcon();
            usersJournalsContainer.style.display = "none";
            closePopups();
        }
        else if (section === registerLoginSection) {
            showDisplaySection(registerLoginSection)
            loginForm.style.display = "flex";
            bottomNavBar.style.display = "none";
            registrationForm.style.display = "none";
            link.textContent = "Register Here!";
            haveAccount.textContent = "Don't Have An Account?"
            regOrLogin.textContent = "Please Login Here."
        }
        else {
            showHomePage();
            updateThemeIcon();
            closePopups();
        }

    } catch (err) {
        console.error("Error checking login status:", err);

        showDisplaySection(registerLoginSection);
        loginForm.style.display = "flex";
        bottomNavBar.style.display = "none";
        registrationForm.style.display = "none";
        link.textContent = "Register Here!";
        haveAccount.textContent = "Don't Have An Account?"
        regOrLogin.textContent = "Please Login Here."
    }
});


/*REGISTRATION SUBMIT*/
registrationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const username = document.querySelector("#username").value.trim();
    const password = passwordBox.value.trim();
    const reEnterPassword = reEnterPasswordBox.value.trim();

    if (password !== reEnterPassword) {
        await createAlert("Error", "Passwords Don't Match.");
        return;
    }

    try {
        const response = await fetch(`/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ firstName, lastName, email, username, password })
        });

        const data = await response.json();
        if (!response.ok) {
            if (response.statusText == "Conflict")
                registrationForm.style.display = "none";
            await createAlert("Error", "Email or Username Is Already In Use.");
            return;
        }

        registrationForm.style.display = "none";
        link.textContent = "";
        await createAlert("Account Created!", "You Can Now Log In!");
        registrationForm.reset();
        loginForm.style.display = "flex";
        bottomNavBar.style.display = "none";
        link.textContent = "Register Here!";
        haveAccount.textContent = "Don't Have An Account?"
        regOrLogin.textContent = "Please Login Here."

    } catch (err) {
        console.error(err);
        registrationForm.style.display = "none";
        await createAlert("Error", "Server Error.")
    }
});

/*REGISTRATION - PASSWORD VISIBILITY*/
registrationToggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    // toggle the type
    toggleVisibility(passwordBox, visibilityStatus);
});


function toggleVisibility(passwordBox, visibilityElement) {
    if (passwordBox.type === "password") {
        passwordBox.type = "text";
        visibilityElement.innerHTML = "visibility";
    } else {
        passwordBox.type = "password";
        visibilityElement.innerHTML = "visibility_off";
    }
}

/*LOGOUT*/
logoutButton.addEventListener("click", async function () {
    const confirmed = await createConfirmation("Are You Sure You Want To Logout?");
    if (!confirmed) {
        return;
    }
    else {
        logout();
    }
})

async function logout() {
    let currentUser = await getCurrentUserId();

    if (!currentUser) {
        console.error("Not logged in.")
    }
    await fetch("/logout", {
        method: "POST",
        credentials: "include"
    });
    await resetEverything();
    window.location.reload();
    display(registerLoginSection);
    redirect();
}

async function resetEverything() {
    currentJournalId = null;
    coverSrc;
    selectedCover = null;
    editingJournalId = null;
    editingEntryId = null;
    editingEntryPhoto = null;
    originalEntry = null;;
    currentEntry = null;
    editEntryPhoto = null;
    type = "";
    entryProfilePic = null;
    removePhoto = false;
    profileColorTheme = '';
    commentsAmount = null;
    currentUser = null;
    localStorage.removeItem("activePage");
}

/*LOGIN SUBMIT*/
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.querySelector("#login-username").value.trim();
    const password = loginPassword.value.trim();

    try {
        const response = await fetch(`/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            if (response.status === 401) {
                await createAlert("Error", "Invaid Credentials.")
            }
            else if (response.status === 400) {
                await createAlert("Error", "Missing Credentials.")
            }
            else {
                await createAlert("Error", "Login Failed. Please Try Again.")
            }
            return;
        }

        loginForm.reset();
        bottomNavBar.style.display = "block";
        localStorage.setItem("activePage", "profile-page");
        updateProfileColors();
        showDisplaySection(userProfilePageSection);
        updateProfilePage();
        displayRecentPosts();

        bottomNavBar.style.display = "flex";

    } catch (err) {
        console.error(err);
        await createAlert("Error", "Server Error.")
    }
});

/*Redirect if not logged in*/
async function redirect() {
    let currentUser = await getCurrentUserId();

    if (!currentUser) {
        showDisplaySection(registerLoginSection);
        loginForm.style.display = "flex";
        bottomNavBar.style.display = "none";
        registrationForm.style.display = "none";
        bottomNavBar.style.display = "none";
        link.textContent = "Register Here!";
        haveAccount.textContent = "Don't Have An Account?"
        regOrLogin.textContent = "Please Login Here."
    }
}


/*CANCELS*/
cancelEntryButton.addEventListener("click", () => {
    createEntryPopup.classList.remove("open", "immediateclose");
    createEntryPopup.classList.add("close");
    entryName.value = '';
    entryText.value = '';
})

/*LOGIN - PASSWORD VISIBILITY*/
loginToggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(loginPassword, loginvisibilityStatus);
});

reEnterPasswordVisibilityStatus.addEventListener("click", (e) => {
    e.preventDefault();
    toggleVisibility(reEnterPasswordBox, reEnterPasswordVisibilityStatus);
});

/*"LOGIN/REGISTER HERE!"*/
link.addEventListener("click", () => {
    if (link.textContent === "Login Here!") {
        registrationForm.style.display = "none";
        loginForm.style.display = "flex";
        bottomNavBar.style.display = "none";
        link.textContent = "Register Here!";
        haveAccount.textContent = "Don't Have An Account?"
        regOrLogin.textContent = "Please Login Here."

    }
    else if (link.textContent === "Register Here!") {
        registrationForm.style.display = "flex";
        loginForm.style.display = "none";
        bottomNavBar.style.display = "none";
        link.textContent = "Login Here!";
        haveAccount.textContent = "Already Have An Account?"
        regOrLogin.textContent = "Please Register Here."
    }
});

/*PROFILE PAGE*/
myJournalsButton.addEventListener("click", () => {
    recentPosts.style.display = "none";
    showDisplaySection(usersJournalsSection);
    displayUserJournals();
    usersJournalsContainer.style.display = "flex";
    closePopups();
});

/*SWITCHING BETWEEN SECTONS*/
journalButton.addEventListener("click", () => {
    localStorage.setItem("activePage", "users-journals-container");
    recentPosts.style.display = "none";
    showDisplaySection(usersJournalsSection);
    displayUserJournals();
    usersJournalsContainer.style.display = "flex";
    closePopups();
});


function closePopups() {
    createJournalPopup.classList.remove("add", "close");
    createJournalPopup.classList.add("immediateclose");

    createEntryPopup.classList.remove("add", "close");
    createEntryPopup.classList.add("immediateclose");

    editJournalPopup.classList.remove("open", "close");
    editJournalPopup.classList.add("immediateclose");

    alerts.classList.remove("open", "close");
    alerts.classList.add("immediateclose");

    editEntryPopup.classList.remove("open", "close");
    editEntryPopup.classList.add("immediateclose");

    confirmation.classList.remove("open", "close");
    confirmation.classList.add("immediateclose");

    feedbackFormPopup.classList.remove("open", "close");
    feedbackFormPopup.classList.add("immediateclose");

    editProfilePagePopup.classList.remove("open", "close");
    editProfilePagePopup.classList.add("immediateclose");
}

homeButton.addEventListener("click", () => {
    localStorage.setItem("activePage", "home-page");
    showHomePage();
    updateThemeIcon();
    closePopups();
});


function showHomePage() {
    recentPosts.style.display = "none";
    showDisplaySection(homePageSection)
    mainFeedSection.style.display = "flex";
    searchBar.value = "";
    displayMainFeed("all");
}


allFeedButton.addEventListener("click", () => {
    recentPosts.style.display = "none";
    showDisplaySection(homePageSection)
    mainFeedSection.style.display = "flex";
    displayMainFeed("all");
});

friendsOnlyFeedButton.addEventListener("click", () => {
    recentPosts.style.display = "none";
    showDisplaySection(homePageSection)
    mainFeedSection.style.display = "flex";
    displayMainFeed("friends");
});

profileButton.addEventListener("click", async function () {
    let currentUser = await getCurrentUserId();

    if (!currentUser) {
        localStorage.setItem("activePage", "register-login-container");
        showDisplaySection(registerLoginSection)
        loginForm.style.display = "flex";
        bottomNavBar.style.display = "none";
        registrationForm.style.display = "none";
        link.textContent = "Register Here!";
        haveAccount.textContent = "Don't Have An Account?"
        regOrLogin.textContent = "Please Login Here."
    }
    else {
        localStorage.setItem("activePage", "profile-page");
        showDisplaySection(userProfilePageSection);
        updateProfilePage();
        displayRecentPosts();
        updateThemeIcon();
        //hiding popups, etc.
        usersJournalsContainer.style.display = "none";
        closePopups();
    }
});

/*DISPLAY SIDEBARS AND DISPLAY USER'S JOURNAL ENTRIES*/
usersJournalsContainer.addEventListener("click", async function (e) {
    const journalDiv = e.target.closest(".each-user-journal");
    if (!journalDiv) {
        return;
    }
    currentJournalId = journalDiv.dataset.id;

    showDisplaySection(journalEntriesSection);
    displaySidebarJournals();
    closePopups();
    await displayJournalEntries(currentJournalId);
});

/*DISPLAY SIDEBARS*/
async function displaySidebarJournals() {
    const sidebarJournalsContainer = document.querySelector("#sidebar-journals");
    sidebarJournalsContainer.innerHTML = '';
    let currentUser = await getCurrentUserId();

    if (!currentUser) {
        return;
    }

    try {
        const response = await fetch(`/journals`,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
        const data = await response.json();
        const journals = data.journals;

        journals.forEach(journal => {
            const journalDiv = document.createElement("div");
            journalDiv.classList.add("sidebar-each-user-journal");
            journalDiv.dataset.id = journal._id;

            journalDiv.innerHTML = `
                <img src="${journal.coverImage}" alt="${journal.title}" class="journal-cover" id="sidebar-journal-cover">
                <h3 style="text-align:center">${journal.title}</h3>
            `;

            journalDiv.addEventListener("click", async function () {
                currentJournalId = journal._id;
                showDisplaySection(journalEntriesSection);
                await displayJournalEntries(currentJournalId);
                closePopups();
            });

            sidebarJournalsContainer.appendChild(journalDiv);
        });
    } catch (err) {
        console.error(err);
        await createAlert("Error", "Failed To Load Sidebar Journals.")
    }
}

/*OPEN/CLOSE SIDE BAR*/
sidebarToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

});


// Converts hex string to {r, g, b} object
function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");

    if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

// hex to rgba
function hexToRgba(hex, alpha = 0.3) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// darken hex
function darkenHexColor(hex, amount = 50) {
    let { r, g, b } = hexToRgb(hex);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

function isColorAcceptable(hex) {
    const { r, g, b } = hexToRgb(hex);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 50 && brightness < 230;
}

function getReadableTextColor(hex) {
    const { r, g, b } = hexToRgb(hex);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 160 ? "black" : "white";
}



/*DISPLAY USER'S JOURNAL ENTRIES*/
async function displayJournalEntries(journalId) {

    if (!journalId) {
        return;
    }

    usersJournalsContainer.style.display = "none";

    if (usersJournalsContainer.style.display === "none") {
        editEntryPopup.classList.remove("open", "immediateclose");
        editEntryPopup.classList.add("close");

        createEntryPopup.classList.remove("add", "immediateclose");
        createEntryPopup.classList.add("close");
    }


    const entriesContainer = document.querySelector(".journal-stacked-entries");
    entriesContainer.innerHTML = "";

    try {
        const response = await fetch(`/journals/${journalId}/entries`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const journalData = await response.json();

        const entries = journalData.entries;

        if (!entries || entries.length === 0) {
            noEntriesTxt.textContent =
                "No entries yet! Press the plus sign to start jotting down your thoughts!";
            noEntriesTxt.style.display = "block";
            return;
        }
        else {
            noEntriesTxt.style.display = "none";
        }


        if (!journalData.entries || journalData.entries.length === 0) {
            entriesContainer.innerHTML = "<p>No entries yet!</p>";
            return;
        }

        // Show entries from newest to oldest
        entries.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.classList.add("journal-entry");
            const colorHex = entry.backgroundColor ? entry.backgroundColor : "#7aAAF7";
            entryDiv.style.backgroundColor = hexToRgba(colorHex, 0.3);
            entryDiv.style.border = `2px solid ${hexToRgba(colorHex, 1)}`;

            entryDiv.innerHTML = `
            <button class="delete-entry-btn">×</button>
             <button class="edit-entry-btn">✎</button>
             <div class = "heading-and-visibility">
            <h4 id="entry-title">${entry.title}</h4>
            ${entry.isPublic === "public"
                    ? `<span class="material-symbols-outlined" id="entry-visibility">
                     visibility
                    </span>`
                    : `<span class="material-symbols-outlined" id="entry-visibility">
                     visibility_off
                   </span>`}
                   </div>
                    ${entry.photo
                    ? `<img src="${entry.photo}" alt="Entry photo" class="entry-photo" />`
                    : ""
                }

            <p class = "entry-content-text">${entry.content}</p>
            <span class="entry-date">
                ${new Date(entry.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })}
            ${entry.edited ? " (Edited)" : ""}
            </span>`;

            const entryVisibilityButton = entryDiv.querySelector("#entry-visibility")
            entryVisibilityButton.addEventListener("click", async function () {
                const icon = entryVisibilityButton.textContent.trim();

                if (icon === "visibility") {
                    entryVisibilityButton.textContent = "visibility_off";

                    const newEntry = {
                        _id: entry._id,
                        newTitle: entry.title,
                        newContent: entry.content,
                        editFeedVisibility: "private",
                        newPhotoSelected: entry.photo ? entry.photo : null,
                    };
                    editingJournalId = journalData._id;
                    const response = await submittedEditEntry(newEntry, null, false);
                    if (!response.ok) {
                        await createAlert("Error", "Failed To Edit Entry.");
                        return;
                    }

                } else {
                    entryVisibilityButton.textContent = "visibility";

                    const newEntry = {
                        _id: entry._id,
                        newTitle: entry.title,
                        newContent: entry.content,
                        editFeedVisibility: "public",
                        newPhotoSelected: entry.photo ? entry.photo : null,
                    };
                    editingJournalId = journalData._id;
                    const response = await submittedEditEntry(newEntry, null, false);
                    if (!response.ok) {
                        await createAlert("Error", "Failed To Edit Entry.");
                        return;
                    }
                }
            });

            const deleteEntryButton = entryDiv.querySelector(".delete-entry-btn");
            const editEntryButton = entryDiv.querySelector(".edit-entry-btn");

            deleteEntryButton.addEventListener("click", async function (e) {
                e.stopPropagation();
                await deleteEntry(entry._id);
                await displayJournalEntries(journalId);
            });

            editEntryButton.addEventListener("click", (e) => {
                e.stopPropagation();
                editEntryPopup.classList.remove("close", "immediateclose");
                editEntryPopup.classList.add("open");
                editEntry(entry);

            });

            entriesContainer.appendChild(entryDiv);
            const allEntries = entriesContainer.querySelectorAll(".journal-entry");
            allEntries.forEach(entry => entry.classList.remove("last-entry"));

            if (allEntries.length > 0) {
                allEntries[allEntries.length - 1].classList.add("last-entry");
            }
        });

    } catch (err) {
        console.error(err);
    }
}


/*CANCEL CREATING A NEW JOURNAL*/
cancelJournalButton.addEventListener("click", () => {
    createJournalPopup.classList.remove("add", "immediateclose");
    createJournalPopup.classList.add("close");
    usersJournalsContainer.style.display = "flex";
    createJournalNameInput.value = '';
    displayUserJournals();
})

//JOURNAL COVER SELECTIONS
journalCovers.forEach((cover) => {
    cover.addEventListener("click", () => {
        if (selectedCover) {
            selectedCover.classList.remove("selected");
        }

        cover.classList.add("selected");
        selectedCover = cover;
        coverSrc = cover.src;
    });
});

/*ADD JOURNAL BUTTON*/
addJournalButton.addEventListener("click", async function (e) {
    createJournalPopup.classList.remove("close", "immediateclose");
    createJournalPopup.classList.add("open");
    noJournalsTxt.style.display = "none";
    selectedCover.classList.remove("selected");
});

/*CREATE A JOURNAL*/
createJournalButton.addEventListener("click", async function () {
    try {
        const response = await fetch(`/journals`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                title: createJournalNameInput.value.trim(),
                coverImage: coverSrc
            })
        });

        //const data = await response.json();
        createJournalPopup.classList.remove("add", "immediateclose");
        createJournalPopup.classList.add("close");

        if (!response.ok) {
            if (response.status === 400) {
                await createAlert("Error", "Please Select A Cover And Enter A Name.");
                createJournalPopup.classList.remove("close", "immediateclose");
                createJournalPopup.classList.add("add");
            }
            else {
                await createAlert("Error", "Failed To Create Journal.");
            }
            return;
        }

        usersJournalsContainer.style.display = "flex";
        createJournalNameInput.value = '';
        selectedCover.classList.remove("selected");

        displayUserJournals();


    } catch (err) {
        console.error(err);
        createJournalPopup.classList.remove("add", "immediateclose");
        createJournalPopup.classList.add("close");
        await createAlert("Error", "Server Error.")
    }
});

/*DISPLAY USERS JOURNALS*/
async function displayUserJournals() {
    editJournalPopup.classList.remove("open", "immediateclose");
    editJournalPopup.classList.add("close");
    updateThemeIcon();
    //clear existing journals
    usersJournalsContainer.innerHTML = '';
    let currentUser = await getCurrentUserId();

    if (!currentUser) {
        noJournalsTxt.textContent = "Please sign in to see your journals!"
        return;
    }

    try {
        const response = await fetch(`/journals`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        const data = await response.json();
        const journals = data.journals;

        if (journals.length === 0) {
            noJournalsTxt.style.display = "block";
            noJournalsTxt.textContent = "You have no journals. Press the plus sign at the top right to create one!";
        }
        else {
            noJournalsTxt.style.display = "none";
        }

        journals.forEach((journal) => {
            const journalDiv = document.createElement("div");
            journalDiv.classList.add("each-user-journal");

            journalDiv.dataset.id = journal._id;

            journalDiv.innerHTML = `
                <button class="delete-journal-btn">×</button>
                <button class="edit-journal-btn">✎</button>
            <img src="${journal.coverImage}" alt="" class="journal-cover">
            <h3 style = "text-align: center; margin-left: 0px;">${journal.title}</h3>
            `;

            const deleteJournalButton = journalDiv.querySelector(".delete-journal-btn");
            const editJournalButton = journalDiv.querySelector(".edit-journal-btn");

            deleteJournalButton.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteJournal(journal._id);
            });

            editJournalButton.addEventListener("click", (e) => {
                e.stopPropagation();
                editJournalPopup.classList.remove("close", "immediateclose");
                editJournalPopup.classList.add("open");
                editJournal(journal);
            });

            usersJournalsContainer.appendChild(journalDiv);

        });

    }
    catch (err) {
        console.error(err);
        await createAlert("Error", "Failed To Load Journals.")
    }

}

//EDIT JOURNAL - FUNCTION
function editJournal(journal) {
    editingJournalId = journal._id;
    editJournalNameInput.value = journal.title;
    coverSrc = journal.coverImage;
    editJournalPopup.classList.remove("close", "immediateclose");
    editJournalPopup.classList.add("open");
    selectedCover.classList.remove("selected");
}

//CANCEL JOURNAL EDIT
cancelEditJournalButton.addEventListener("click", () => {
    editJournalPopup.classList.remove("open", "immediateclose");
    editJournalPopup.classList.add("close");
    editingJournalId = null;
    coverSrc = null;
    selectedCover.classList.remove("selected");
    selectedCover = null;
});

//DELETE A JOURNAL
async function deleteJournal(journalId) {
    const confirmed = await createConfirmation("Are You Sure You Want To Delete This Journal?");
    if (!confirmed) {
        return;
    }
    try {
        const response = await fetch(`/journals/${journalId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            const data = await response.json();
            await createAlert("Error", "Failed To Delete Journal.")
            return;
        }

        displayUserJournals();

    } catch (err) {
        console.error(err);
        await createAlert("Error", "Server Error.")
    }
}

/*OPEN UP ADD ENTRY*/
addEntryButton.addEventListener("click", async function () {
    createEntryPopup.classList.remove("close", "immediateclose");
    createEntryPopup.classList.add("open");
});

/*CREATE AN ENTRY*/
submitEntryButton.addEventListener("click", async function () {
    const entryTitle = entryName.value.trim();
    const entryContent = entryText.value.trim();
    const isPublic = document.querySelector('input[name="feed-visibility"]:checked').value;
    const entrySubmittedPhotoFile = entrySubmittedPhoto.files[0];
    const entryColor = selectColorInput.value;

    if (!entryTitle || !entryContent || !entryColor || !isPublic) {
        createEntryPopup.classList.remove("open", "immediateclose");
        createEntryPopup.classList.add("close");
        await createAlert("Error", "Missing Information.");
        createEntryPopup.classList.remove("close", "immediateclose");
        createEntryPopup.classList.add("open");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("entryTitle", entryTitle);
        formData.append("entryContent", entryContent);
        formData.append("isPublic", isPublic);
        formData.append("entryColor", entryColor);

        if (entrySubmittedPhotoFile) {
            formData.append("entryPhoto", entrySubmittedPhotoFile);
        }

        const response = await fetch(`/journals/${currentJournalId}/entries`,
            {
                method: "POST",
                credentials: "include",
                body: formData
            }
        );

        if (!response.ok) {
            await createAlert("Error", "Failed To Add Entry.")
            return;
        }

        entryName.value = "";
        entryText.value = "";
        entrySubmittedPhoto.value = "";
        document.querySelector('input[name="feed-visibility"][value="public"]').checked = true;
        createEntryPopup.classList.remove("open", "immediateclose");
        createEntryPopup.classList.add("close");
        await displayJournalEntries(currentJournalId);

    } catch (err) {
        console.error(err);
        createEntryPopup.classList.remove("open", "immediateclose");
        createEntryPopup.classList.add("close");
        await createAlert("Error", "Server Error.")
    }
})

//DELETE ENTRY
async function deleteEntry(entryId) {
    const confirmed = await createConfirmation("Are You Sure You Want To Delete This Entry?");

    if (!confirmed) {
        return;
    }
    try {
        const response = await fetch(`/entries/${entryId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            await createAlert("Error", "Failed To Delete Entry.")
            return;
        }

    } catch (err) {
        console.error(err);
        await createAlert("Error", "Server Error.")
    }
}

//EDIT AN ENTRY - FUNCTION
function editEntry(entry) {
    editingJournalId = currentJournalId;
    editingEntryId = entry._id;
    originalEntry = entry;

    if (originalEntry.photo === null) {
        deletePhotoButton.style.display = "none";
    }
    else {
        deletePhotoButton.style.display = "inline-block";
    }

    document.querySelector(`input[name="edit-feed-visibility"][value="${entry.isPublic}"]`).checked = true;

    editEntryNameInput.value = entry.title;
    editEntryContentInput.value = entry.content;
    editColorInput.value = entry.backgroundColor || "#7aAAF7";


    const fileInput = document.querySelector("#edit-entry-photo");

    fileInput.value = "";
}


deletePhotoButton.addEventListener("click", async function () {
    editEntryPhotoInput.value = "";

    if (removePhoto === false) {
        removePhoto = true;
        deletePhotoButton.classList.add("active");
        await createAlert("Notice", "Photo Will Be Removed When Updated.");
    }
    else {
        deletePhotoButton.classList.remove("active");
        removePhoto = false;
    }
});

//EDIT ENTRY
submitEditEntryButton.addEventListener("click", async function () {
    const editFeedVisibility = document.querySelector('input[name="edit-feed-visibility"]:checked').value;
    const newTitle = editEntryNameInput.value.trim();
    const newContent = editEntryContentInput.value.trim();
    const fileInput = document.getElementById("edit-entry-photo");
    const newPhotoSelected = fileInput.files.length > 0;
    const newColorInput = editColorInput.value;


    let isFullyChanged = true;

    //nothing changed 
    if (
        originalEntry.title === newTitle &&
        originalEntry.content === newContent &&
        originalEntry.isPublic === editFeedVisibility &&
        removePhoto === false &&
        originalEntry.backgroundColor === newColorInput &&
        !newPhotoSelected
    ) {
        editEntryPopup.classList.open("open", "immediateclose");
        editEntryPopup.classList.add("close");
        return;
    }

    //only visibility changed
    if (
        originalEntry.title === newTitle &&
        originalEntry.content === newContent &&
        !newPhotoSelected &&
        removePhoto === false &&
        originalEntry.backgroundColor === newColorInput &&
        originalEntry.isPublic !== editFeedVisibility
    ) {
        isFullyChanged = false;
    }

    //only color changed
    if (
        originalEntry.title === newTitle &&
        originalEntry.content === newContent &&
        !newPhotoSelected &&
        removePhoto === false &&
        originalEntry.backgroundColor !== newColorInput &&
        originalEntry.isPublic == editFeedVisibility
    ) {
        isFullyChanged = false;
    }

    const newEntry = {
        _id: originalEntry._id,
        newTitle,
        newContent,
        editFeedVisibility,
        newPhotoSelected: newPhotoSelected ? newPhotoSelected : null,
        newBackgroundColor: newColorInput ? newColorInput : null
    };

    const response = await submittedEditEntry(newEntry, fileInput, isFullyChanged);

    editEntryPopup.classList.remove("open", "immediateclose");
    editEntryPopup.classList.add("close");

    if (!response.ok) {
        await createAlert("Error", "Failed To Edit Entry.");
        return;
    }

    editingJournalId = null;
    editingEntryId = null;
    await displayJournalEntries(currentJournalId);


});

async function submittedEditEntry(entry, fileInput, isFullyChanged) {

    try {
        // FormData for text + optional file
        const formData = new FormData();
        formData.append("journalId", editingJournalId);
        formData.append("entryId", entry._id);
        formData.append("entryTitle", entry.newTitle);
        formData.append("entryContent", entry.newContent);
        formData.append("isPublic", entry.editFeedVisibility);
        formData.append("isFullyChanged", isFullyChanged);


        if (entry.newPhotoSelected && fileInput && fileInput.files[0]) {
            formData.append("editEntryPhoto", fileInput.files[0]);
        }

        if (removePhoto) {
            formData.append("removePhoto", removePhoto);
        }

        if (entry.newBackgroundColor) {
            formData.append("newBackgroundColor", entry.newBackgroundColor);
        }

        const response = await fetch(`/entries/edit`, {
            method: "POST",
            credentials: "include",
            body: formData
        });

        removePhoto = false;
        return response;
    }
    catch (err) {
        console.error(err);
        editEntryPopup.classList.remove("open", "immediateclose");
        editEntryPopup.classList.add("close");
        await createAlert("Error", "Server Error.");

    }
}











//EDIT A JOURNAL
submitEditJournalButton.addEventListener("click", async function () {
    try {
        const response = await fetch(`/journals/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ journalCoverSrc: coverSrc, journalTitle: editJournalNameInput.value.trim(), journalId: editingJournalId })
        });

        editJournalPopup.classList.remove("open", "immediateclose");
        editJournalPopup.classList.add("close");

        console.log(response);
        if (!response.ok) {
            const data = await response.json();
            await createAlert("Error", "Failed To Edit Journal.")
            return;
        }

        editingJournalId = null;
        coverSrc = null;
        selectedCover = null;
        displayUserJournals();

    } catch (err) {
        console.error(err);
        editJournalPopup.classList.remove("open", "immediateclose");
        editJournalPopup.classList.add("close");
        await createAlert("Error", "Server Error.")
    }
});



//CANCEL ENTRY EDIT
cancelEditEntryButton.addEventListener("click", () => {
    removePhoto = false;
    editEntryPopup.classList.remove("open", "immediateclose");
    editEntryPopup.classList.add("close");
    deletePhotoButton.classList.remove("active");
});


/*FEED*/
async function displayMainFeed(feedType) {
    type = "main";
    const feedContainer = document.querySelector(".feed-entries");
    feedContainer.innerHTML = "";
    try {
        const response = await fetch(`/feed`, {
            credentials: "include"
        });
        const data = await response.json();
        const entries = data.entries;

        if (entries.length === 0) {
            feedContainer.innerHTML = "<p>No public entries yet!</p>";
            return;
        }

        await displayEntries(feedType, entries, feedContainer);

    } catch (err) {
        console.error(err);
        feedContainer.innerHTML = "<p>Failed to load feed.</p>";
    }
}

async function updateEntryLikes(entry, likeButton, likeElement) {
    if (!entry) {
        createAlert("Error", "Please Select An Entry.");
        return;
    }

    try {
        const response = await fetch(`/entries/${entry._id ? entry._id : entry.id}/likes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });


        if (!response.ok) {
            createAlert("Error", "Couldn't Add Like. Please Try Again.");
            return;
        }

        const data = await response.json();
        likeElement.textContent = data.likes.length;
        if (data.message === "Added") {
            likeButton.textContent = "♥︎";
        }
        else {
            likeButton.textContent = "♡";
        }

    } catch (err) {
        console.error(err);
        createAlert("Error", "Failed To Update Like Count.");
    }
}


//OPEN COMMENTS
submitComments.addEventListener("click", async function (e) {
    e.preventDefault();
    await addComment(commentInput.value.trim());
    commentInput.value = '';
})

closeCommentsBtn.addEventListener("click", () => {
    closeComments()
});


commentsOverlay.addEventListener("click", () => {
    closeComments()
});

async function openComments(entry) {

    currentEntry = entry;
    await displayComments(entry.comments);
    commentsPanel.classList.add("open");
    commentsOverlay.classList.add("open");

}

async function displayComments(comments) {
    commentsList.innerHTML = "";

    if (!comments || comments.length === 0) {
        commentsList.innerHTML = "<p>No comments yet.</p>";
        return;
    }

    const currentUserId = await getCurrentUserId();

    const sortedComments = comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    sortedComments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-item");

        const createdAt = new Date(comment.createdAt);
        const formatted = `${createdAt.toLocaleDateString(undefined,
            {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })} ${createdAt.toLocaleTimeString(undefined,
                { hour: '2-digit', minute: '2-digit' }
            )
            }`;

        const isOwnComment = comment.authorId === currentUserId
        const isOwnEntry = currentEntry.authorId === currentUserId;
        const isLiked = comment.likes?.includes(currentUserId);

        commentDiv.innerHTML = `
            <div class="each-comment">
                <div class="comment-no-heart">
                    <div class="comment-pfp-and-username">
                        <img src="${comment.profilePicUrl || '/Client Uploads/Profile Pics/default-profile.jpg'}" 
                             alt="Profile Pic" class="comment-user-photo" />
                        <h3>@${comment.authorUsername.replace(/^@+/, "")}</h3>
                         ${isOwnComment
                ? `
                                <div class="comment-actions">
                                    <button class="edit-comment">✎</button>
                                    <button class="delete-comment">×</button>
                                </div>
                                `
                : isOwnEntry
                    ? `
                                <div class="comment-actions">
                                    <button class="delete-comment">×</button>
                                </div>
                                `
                    : ""
            }
                    </div>
                    <p class="comment-text">${comment.text}</p>
                    <div class = "comment-date">
                    <span>${formatted}</span>
                    
                    <span>${comment.edited ? "(Edited)" : ""}</span>
                    </div>
                </div>
                <div class = "comment-with-heart">
                 <h4 class="comment-likes-button">${isLiked ? "♥︎" : "♡"}</h4>
                <h4 class = "comment-likes-amount">${comment.likes.length}</h4>
                </div>

            </div>
        `;

        commentsList.appendChild(commentDiv);

        const commentLikesButton = commentDiv.querySelector(".comment-likes-button");
        const commentLikesAmount = commentDiv.querySelector(".comment-likes-amount");
        commentLikesButton.addEventListener("click", () => updateCommentLikes(comment, commentLikesButton, commentLikesAmount))

        if (isOwnComment) {
            const deleteBtn = commentDiv.querySelector(".delete-comment");
            const editBtn = commentDiv.querySelector(".edit-comment");

            deleteBtn.addEventListener("click", () => deleteComment(comment));
            editBtn.addEventListener("click", () => editComment(comment, commentDiv));
        }

        else if (isOwnEntry) {
            const deleteBtn = commentDiv.querySelector(".delete-comment");

            deleteBtn.addEventListener("click", () => deleteComment(comment));
        }
    });
}


//ADD COMMENT
async function addComment(commentContent) {
    if (!commentContent) {
        return;
    }

    try {
        const response = await fetch(`/entries/${currentEntry.id ? currentEntry.id : currentEntry._id}/comments`, {
            method: "POST",
            body: JSON.stringify({ commentContent }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await response.json();

        currentEntry.comments = data.comments;

        await displayComments(data.comments);
    }
    catch (err) {
        console.error(err);
        createAlert("Error", "Failed To Add Comment.");
    }

}


//DELETE COMMENT
async function deleteComment(comment) {
    const confirmed = await createConfirmation("Are you sure you want to delete this comment?");
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/entries/${currentEntry._id ? currentEntry._id : currentEntry.id}/comments/${comment._id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const data = await response.json();


        if (!response.ok) {
            await createAlert(data.error || "Failed To Delete Comment.");
            return;
        }

        currentEntry.comments = data.comments;

        await displayComments(data.comments);


    } catch (err) {
        console.error(err);
        createAlert("Error Deleting Comment.");
    }
}

//EDIT COMMENT
function editComment(comment, commentDiv) {
    const commentPreviousText = commentDiv.querySelector(".comment-text");

    const editCommentInput = document.createElement("input");
    editCommentInput.type = "text";
    editCommentInput.value = comment.text;
    editCommentInput.classList.add("edit-comment-input");

    commentPreviousText.replaceWith(editCommentInput);
    editCommentInput.focus();


    editCommentInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            const newText = editCommentInput.value.trim();
            if (!newText || newText === commentPreviousText.textContent.trim()) {
                const newP = document.createElement("p");
                newP.classList.add("comment-text");
                newP.textContent = newText;
                editCommentInput.replaceWith(newP);
                return;
            }

            try {
                const response = await fetch(`/entries/${currentEntry._id ? currentEntry._id : currentEntry.id}/comments/${comment._id}`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: newText })
                });


                if (!response.ok) {
                    const data = await response.json();
                    alert(data.error || "Failed to edit comment.");
                    return;
                }

                const newP = document.createElement("p");
                newP.classList.add("comment-text");
                newP.textContent = newText;
                editCommentInput.replaceWith(newP);

                comment.text = newText;

            } catch (err) {
                console.error(err);
                alert("Error editing comment.");
            }
        }

        //cancel on Escape
        if (e.key === "Escape") {
            const newP = document.createElement("p");
            newP.classList.add("comment-text");
            newP.textContent = newText;
            editCommentInput.replaceWith(newP);
        }
    });
}

//LIKE COMMENT
async function updateCommentLikes(comment, commentLikeButton, commentLikeElement) {
    if (!comment) {
        createAlert("Error", "Please Select A Comment.");
        return;
    }

    try {

        const response = await fetch(`/entries/${currentEntry.id ? currentEntry.id : currentEntry._id}/comments/${comment._id}/likes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            createAlert("Error", "Couldn't Add Like. Please Try Again.");
            return;
        }

        const data = await response.json();
        commentLikeElement.textContent = data.likes.length;
        commentLikeButton.textContent = data.operation === "Added" ? "♥︎" : "♡";
        comment.likes = data.likes;

    } catch (err) {
        console.error(err);
        createAlert("Error", "Failed To Update Like Count.");
    }
}













//CLOSE COMMENTS
function closeComments() {
    commentsPanel.classList.remove("open", "immediateclose");
    commentsOverlay.classList.remove("open", "immediateclose");

    if (currentEntry) {
        let feedEntryDiv = null;
        if (type === "main") {
            feedEntryDiv = document.querySelector(`.feed-journal-entry[data-entry-id='${currentEntry.id}']`);
        }
        else if (type === "recents") {
            feedEntryDiv = document.querySelector(`.users-recent-entry[data-entry-id='${currentEntry._id}']`);
        }

        if (feedEntryDiv) {
            const commentsAmountElem = feedEntryDiv.querySelector(".entry-comments-amount");
            commentsAmountElem.textContent = currentEntry.comments.length;
        }
    }
}









/*PROFILE PAGE*/
async function displayRecentPosts() {
    recentPosts.innerHTML = "";
    type = "recents";
    recentPosts.style.display = "flex";

    try {
        const response = await fetch(`/me/entries`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await response.json();
        const entries = data.userEntries;


        const publicEntries = entries
            .filter(entry => entry.isPublic === "public")
            .slice(0, 5);

        if (publicEntries.length === 0) {
            recentPosts.innerHTML = "<center>No public entries yet!</center>";
            return;
        }

        await displayEntries("none", publicEntries, recentPosts);

    } catch (err) {
        console.error(err);
        recentPosts.innerHTML = "<p>Failed to load posts.</p>";
    }
}





async function displayEntries(type2, entryList, appendContainer) {
    if (registerLoginSection.style.display === "none") {
        const currentUserId = await getCurrentUserId();

        let currentUser = null;
        let username = null;

        const currentUsername = await getCurrentUserUsername();

        if (!currentUsername) {
            await createAlert("Error", "Something Went Wrong. Please Try Again.");
            return;
        }
        const response = await findUserByUsername(currentUsername);

        if (!response) {
            await createAlert("Error", "Something Went Wrong. Please Try Again.");
            return;
        }
        currentUser = response[0];

        if (type === "recents") {
            username = currentUsername;
            entryProfilePic = currentUser.profilePicUrl;
        }

        commentsProfilePic.src = currentUser.profilePicUrl;

        const renderEntry = async (entry) => {
            if (type === "main") {
                user = entry.author;
                entryProfilePic = user.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg";
                username = user.username || "Anonymous";
            }
            const isLiked = entry.likes?.includes(currentUserId);

            const div = document.createElement("div");
            if (type === "main") {
                div.classList.add("feed-journal-entry");
                div.dataset.entryId = entry.id
            }
            else if (type === "recents") {
                div.classList.add("users-recent-entry");
                div.dataset.entryId = entry._id;
            }
            const colorHex = entry.backgroundColor ? entry.backgroundColor : "#7aAAF7";
            div.style.backgroundColor = hexToRgba(colorHex, 0.3);
            div.style.border = `2px solid ${hexToRgba(colorHex, 1)}`;

            div.innerHTML = `
                <div class="feed-entry-header">
                    <img src="${entryProfilePic}" alt="${username}" class="feed-profile-pic">
                    <span class="feed-username">@${username.replace(/^@+/, "")}</span>
                </div>
                <h3>${entry.title}</h3>
                ${entry.photo ? `<img src="${entry.photo}" alt="Entry photo" class="entry-photo" />` : ""}
                <p class = "entry-content-text">${entry.content}</p>
                <div class="likes-and-comments-and-date"> 
                    <span>${new Date(entry.createdAt).toLocaleString()}${entry.edited ? " (Edited)" : ""}</span>
                    <div class = "likes-and-comments">
                        <h4 class="likesButton">${isLiked ? "♥︎" : "♡"}</h4>
                        <h3 class="entry-likes-amount">${entry.likes ? entry.likes.length : `0`}</h3>
                        <div class="commentsButton">
                            <span class="material-symbols-outlined">comment</span>
                    </div>
                    <h3 class="entry-comments-amount">${entry.comments ? entry.comments.length : `0`}</h3>
                </div>
                </div>
            `;
            appendContainer.appendChild(div);
            updateCommentsCount(entry, entry.comments.length, type);


            const entryLikeButton = div.querySelector(".likesButton");
            if (!entryLikeButton) {
                console.error("likesButton not found", div);
                return;
            }
            const entryLikeAmount = div.querySelector(".entry-likes-amount");
            entryLikeButton.addEventListener("click", async function () {
                await updateEntryLikes(entry, entryLikeButton, entryLikeAmount);
            });

            const commentsButton = div.querySelector(".commentsButton");
            commentsButton.addEventListener("click", () => {
                openComments(entry);
            });

        };

        if (type2 === "friends") {
            const friends = type2 === "friends" ? await getFriends() : [];
            const friendEntries = entryList.filter(entry =>
                friends.some(f => f.id === entry.author.id)
            );

            if (friendEntries.length === 0) {
                appendContainer.innerHTML = `
                <p style="
                    height: 200px; 
                    line-height: 200px; 
                    text-align: center; 
                    margin: 0;
                ">
                    No Friends' Posts Yet!
                </p>
            `;

            } else {
                for (const entry of friendEntries) {
                    await renderEntry(entry);
                }
            }
        }
        else {
            for (const entry of entryList) {
                await renderEntry(entry);
            }
        }
    }

}


function updateCommentsCount(entry, newCount, type) {
    let entryDiv = '';
    const entryId = entry.id ? entry.id : entry._id;

    if (type === "main") {
        entryDiv = document.querySelector(`.feed-journal-entry[data-entry-id="${entryId}"]`);
    }
    if (type === "recents") {
        entryDiv = document.querySelector(`.users-recent-entry[data-entry-id="${entryId}"]`);
    }
    if (!entryDiv) {
        return
    };

    entryDiv.querySelector(".entry-comments-amount").textContent = newCount;
}





/*UPDATE PROFILE COLORS*/
async function updateProfileColors() {
    try {
        const res = await fetch(`/profile`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error("Failed to load profile")
        };

        const data = await res.json();

        profileImage.src = data.profilePicUrl || "/Client Uploads/Profile Pics/default-profile.jpg";
        profileColorTheme = data.profileColor ? data.profileColor : "#7aAAF7";
        const profileBorder = data.profileColor ? `5px solid ${data.profileColor}` : "2px solid #7aAAF7";
        const profileBorderDarker = `4px solid ${darkenHexColor(profileColorTheme)}`;
        document.documentElement.style.setProperty('--profile-color', profileColorTheme);
        document.documentElement.style.setProperty('--profile-border', profileBorder);
        document.documentElement.style.setProperty('--profile-border-dark', profileBorderDarker);
        const textColor = getReadableTextColor(profileColorTheme);
        document.documentElement.style.setProperty('--readable-text', textColor);


        const { r, g, b } = hexToRgb(profileColorTheme);
        document.documentElement.style.setProperty('--profile-color-r', r);
        document.documentElement.style.setProperty('--profile-color-g', g);
        document.documentElement.style.setProperty('--profile-color-b', b);


    } catch (err) {
        console.error(err);
    }
}





/*LOAD PROFILE*/
async function updateProfilePage() {
    try {
        const res = await fetch(`/profile`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error("Failed to load profile")
        };

        const data = await res.json();

        await updateProfileColors();

        let cleanUsername = '';
        if (data.username) {
            cleanUsername = data.username.replace(/^@+/, "");
        }

        const admin = false;

        userUsername.textContent = "@" + cleanUsername || "No username";
        if (userUsername.textContent === "@Wificampbell") {
            document.querySelector("#admin-crown").style.display = "inline-block";
        }
        else {
            document.querySelector("#admin-crown").style.display = "none";
        }
        userBio.textContent = data.bio || `Hello, nice to meet you!`;


        const friendRes = await fetch(`/me/friends`,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

        const entryRes = await fetch(`/me/entries`,
            {
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

        const entries = await entryRes.json();

        if (!friendRes.ok) {
            throw new Error("Failed to get friends")
        };


        const friends = await friendRes.json();
        const friendsAmount = friends.safeMutualFriends.length;
        const entryCount = entries.userEntries.length;

        // Display counts in the profile page
        const friendsAmountSection = document.querySelector(".amount-of-friends");
        const entryAmount = document.querySelector(".amount-of-entries");

        if (friendsAmount) {
            friendsAmountSection.textContent = `${friendsAmount}`
        }
        else {
            friendsAmountSection.textContent = `0`
        };
        if (entryAmount) {
            entryAmount.textContent = `${entryCount}`
        };

        updateFriendRequestIcon();

    } catch (err) {
        console.error(err);
    }
}

/*EDIT PROFILE FORM*/
editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#edit-username").value.trim();
    const bio = document.querySelector("#edit-bio").value.trim();
    const profilePicFile = document.querySelector("#profile-pic-input").files[0];
    const profileColorInput = profileColor.value;
    const authEmail = editPasswordEmail.value;
    let correctEmail = '';
    const newPassword = editPassword.value;
    const newEmail = editEmail.value;

    try {
        const response = await fetch(`/profile`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const data = await response.json();
        correctEmail = data.email;
    }
    catch (err) {
        console.error(err);
        await createAlert("Error", "Server Error.")
    }


    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("profileColorInput", profileColorInput);
    formData.append("newPassword", newPassword);
    formData.append("newEmail", newEmail);


    if (authEmail !== "") {
        if (authEmail !== correctEmail) {
            await createAlert("Error", "Email Doesn't Match");
            return;
        }
    }
    if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
    }

    if (bio === '') {
        await createAlert("Error", "Bio Cannot Be Empty.");
        return;
    }
    else if (bio.length > 490 || username.length > 30) {
        await createAlert("Error", "Please have bio under 490 characters, and username under 30 characters!");
        return;
    }
    else if (username === '') {
        await createAlert("Error", "Username Cannot Be Empty.");
        return;
    }
    else if (!isColorAcceptable(profileColorInput)) {
        await createAlert("Error", "Please Select A Color Not Too Dark Or Light.");
        return;
    }


    try {
        const response = await fetch(`/profile/edit`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        console.log(response);

        if (!response.ok) {
            if (response.status === 409) {
                await createAlert("Error", "Username Taken.");
            }
            else {
                await createAlert("Error", "Failed To Update Profile.");
            }
            return;
        }

        editProfilePagePopup.classList.remove("open", "immediateclose");
        editProfilePagePopup.classList.add("close");

        const updatedUser = await response.json();

        const cleanUsername = updatedUser.username.replace(/^@+/, "");
        userUsername.textContent = cleanUsername;
        userBio.textContent = updatedUser.bio;
        if (updatedUser.profilePicUrl) {
            profileImage.src = updatedUser.profilePicUrl;
        }

        updateProfilePage();
        await createAlert("Success", "Profile Information Updated");
    } catch (err) {
        console.error(err);
        await createAlert("Error", "Server Error.")
    }
});

/*EDIT PROFILE*/
editProfileButton.addEventListener("click", () => {
    document.querySelector("#edit-username").value = userUsername.textContent.replace(/^@+/, "");
    document.querySelector("#edit-bio").value = userBio.textContent;
    document.querySelector(".select-profile-color").value = profileColorTheme;
    editPasswordEmail.value = '';
    editPassword.value = '';
    editEmail.value = '';
    editProfilePagePopup.classList.remove("close", "immediateclose");
    editProfilePagePopup.classList.add("open");
});

/*CANCEL PROFILE PAGE EDIT*/
cancelEditProfile.addEventListener("click", () => {
    editProfilePagePopup.classList.remove("open", "immediateclose");
    editProfilePagePopup.classList.add("close");
});


/*CREATING ALERTS*/
function createAlert(heading, description) {
    return new Promise((resolve) => {
        alertsHeading.innerHTML = heading;
        alertsDescription.innerHTML = description;
        alerts.classList.remove("close", "immediateclose");
        alerts.classList.add("open");

        function handleAlertExit() {
            alerts.classList.remove("open", "immediateclose");
            alerts.classList.add("close");
            exitAlert.removeEventListener("click", handleAlertExit);
            resolve();
        }

        exitAlert.addEventListener("click", handleAlertExit);
    });
}

/*CREATING CONFIRMATIONS*/
function createConfirmation(txt) {
    return new Promise((resolve) => {
        confirmationTxt.innerHTML = txt;
        confirmation.classList.remove("close", "immediateclose");
        confirmation.classList.add("open");

        function handleConfirmationExit() {
            confirmation.classList.remove("add", "immediateclose");
            confirmation.classList.add("close");
            resolve(false);
        }

        function handleConfirmationYes() {
            confirmation.classList.remove("add", "immediateclose");
            confirmation.classList.add("close");
            resolve(true);
        }

        exitConfirmation.addEventListener("click", handleConfirmationExit, { once: true });
        yesConfirmation.addEventListener("click", handleConfirmationYes, { once: true });
    });
}

/**GET USERS BASED ON USERNAME*/
searchBar.addEventListener('keydown', async function (event) {
    if (event.key === "Enter" && searchBar.value.trim() != "") {
        const users = await findUserByUsername(searchBar.value.trim());
        displayUsers(users, foundUsersContainer);
        showDisplaySection(searchForUsers);
    }
});

findingUsersSearchBar.addEventListener('keydown', async function (event) {
    if (event.key === "Enter" && findingUsersSearchBar.value.trim() != "") {
        const users = await findUserByUsername(findingUsersSearchBar.value.trim());
        displayUsers(users, foundUsersContainer);
        showDisplaySection(searchForUsers);
    }
});

searchButton.addEventListener('click', async function () {
    if (searchBar.value.trim() != "") {
        const users = await findUserByUsername(searchBar.value.trim());
        displayUsers(users, foundUsersContainer);
        showDisplaySection(searchForUsers);
    }
});

findingUsersSearchButton.addEventListener('click', async function () {
    if (findingUsersSearchBar.value.trim() != "") {
        const users = await findUserByUsername(findingUsersSearchBar.value.trim());
        displayUsers(users, foundUsersContainer);
        showDisplaySection(searchForUsers);
    }
});

/* FIND USERS BY USERNAME*/
async function findUserByUsername(username) {
    try {
        const foundUsersContainer = document.querySelector(".found-users-container");
        foundUsersContainer.innerHTML = "";

        const response = await fetch(`/users/${username}`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            foundUsersContainer.innerHTML = "<p>User Not Found</p>";
            return [];
        }

        const data = await response.json();
        let users = data.results || [];

        return users;

    } catch (err) {
        console.error(err);
        await createAlert("Error", "User Not Found. Please Try Again.");
        return [];
    }
}

/*GET CURRENT USER ID*/
async function getCurrentUserId() {
    //get current userId
    try {
        const res = await fetch(`/auth/me`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const currentUserId = data.currentUser.id;
        return currentUserId;

    } catch (err) {
        console.error(err);
    }

}

async function getCurrentUserUsername() {
    //get current userId
    try {
        const res = await fetch(`/auth/me`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const currentUserUsername = data.currentUser.username;
        return currentUserUsername;

    } catch (err) {
        console.error(err);
    }

}

/*DISPLAY USERS FRIENDS*/
async function displayUsers(users, section) {
    if (!Array.isArray(users)) {
        console.error("displayUsers received invalid users:", users);
        return;
    }

    const container = section;
    container.innerHTML = "";

    const currentUserId = await getCurrentUserId();

    // Mutual friends
    let mutualFriends = await getFriends() || [];
    const mutualIds = new Set(mutualFriends.map(f => f.id));

    // Users I am following 
    const following = await getFollowing() || [];
    const followingIds = new Set(following.map(f => f.id));

    // Users who sent me a friend request
    const friendRequests = await getFriendRequests() || [];
    const requestIds = new Set(friendRequests.map(f => f.id));


    const filteredUsers = users.filter(u => u.id !== currentUserId);

    if (filteredUsers.length === 0) {
        if (section === showUsersFriends) {
            container.innerHTML = `
                <p style="
                    height: 100%; 
                    line-height: 200px; 
                    text-align: center; 
                    margin: 0;
                ">
                    No Friends Yet!
                </p>
            `;
        }
        else {
            container.innerHTML = `
                <p style="
                    height: 100%; 
                    line-height: 200px; 
                    text-align: center; 
                    margin: 0;
                ">
                    No Users Found!
                </p>
            `;
        }
    }

    for (const u of filteredUsers) {

        let icon;
        if (mutualIds.has(u.id)) {
            icon = "person_heart";      // mutual friend
        } else if (followingIds.has(u.id)) {
            icon = "person_check";      // I follow them
        } else if (requestIds.has(u.id)) {
            icon = "person_alert";      // they sent me a friend request
        } else {
            icon = "person_add";
        }

        const foundUsersDiv = document.createElement("div");
        foundUsersDiv.classList.add("each-found-user");

        foundUsersDiv.innerHTML = `
            <div class="found-users-header">
                <img 
                    src="${u.profilePicUrl || '/Client Uploads/Profile Pics/default-profile.jpg'}"
                    alt="${u.username}"
                    class="found-user-profile-pic"
                >
                <div class="found-users-username-and-bio">
                    <div class="found-users-username-and-add-friend-button">
                        <span class="found-username">@${u.username.replace(/^@+/, "")}</span>
                        ${icon ? `<span class="add-friend-button material-symbols-outlined">${icon}</span>` : ""}
                    </div>
                    <span class="found-bio">${u.bio || ""}</span>
                </div>
            </div>
        `;
        if (section === showUsersFriends && icon !== "person_heart") {
            continue;
        } else {
            container.appendChild(foundUsersDiv);
        }

        const addFriendButton = foundUsersDiv.querySelector(".add-friend-button");

        addFriendButton.addEventListener("click", async () => {
            const state = addFriendButton.textContent.trim();
            let confirmed = null;

            if (state === "person_add") {
                confirmed = await createConfirmation(`Send friend request to ${u.username}?`);

                if (!confirmed) {
                    return
                };

                await sendFriendRequest(u.id);
                addFriendButton.textContent = "person_check";
            }
            else if (state === "person_alert") {
                confirmed = await createConfirmation(`Accept friend request?`);

                if (!confirmed) {
                    return
                };

                await acceptFriendRequest(u.id);
                addFriendButton.textContent = "person_heart";
            }

            else if (state === "person_check") {
                const confirmed = await createConfirmation(`Unfollow ${u.username}?`);
                if (!confirmed) return;

                await cancelFriendRequest(u);
                addFriendButton.textContent = "person_add";
            }
            else if (state === "person_heart") {
                const confirmed = await createConfirmation(`Remove ${u.username} as a friend?`);
                if (!confirmed) return;

                await deleteFriend(u);
                addFriendButton.textContent = "person_add";

                if (section === showUsersFriends) {
                    const newMutualFriends = await getFriends() || [];
                    displayUsers(newMutualFriends, showUsersFriends);
                }
            }
        });
    }
}

/*ACCEPT FRIEND REQUEST*/
async function acceptFriendRequest(userId) {
    if (!userId) {
        await createAlert("Missing Information", "Please Select A User.");
        return;
    }

    try {
        const response = await fetch(`/me/friend-requests/${userId}/accept`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            createAlert("Error", "Something Went Wrong. Please Try Again.");
            return;
        }
    }
    catch (error) {
        console.error(error);
        await createAlert("Error", "User Not Found. Please Try Again.");
    }
}

/*DELETE FRIEND*/
async function deleteFriend(user) {
    if (!user) {
        await createAlert("Missing Information", "Please Select A User.");
        return;
    }

    try {
        const response = await fetch(`/users/${user.id}/friend`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            createAlert("Error", "Something Went Wrong. Please Try Again.");
            return;
        }
    }
    catch (error) {
        console.error(error);
        await createAlert("Error", "User Not Found. Please Try Again.");
    }
}


/*UNFOLLOW*/
async function cancelFriendRequest(user) {
    if (!user || !user.id) return;

    await fetch(`/users/${user.id}/request`, {
        method: "DELETE",
        credentials: "include"
    });
}


/*UPDATE FRIEND ICON*/
async function updateFriendIcon(targetUserId, addFriendButton) {
    const friends = await getFriends();
    const following = await getFollowing();

    const isFriend = friends.some(f => f.id === targetUserId);
    const isFollowing = following.some(f => f.id === targetUserId);


    if (isFriend) {
        addFriendButton.innerHTML = "person_heart";
    }
    else if (isFollowing) {
        addFriendButton.innerHTML = "person_alert";
    }
    else {
        addFriendButton.innerHTML = "person_add";
    }
}

/*GET ALL FRIENDS*/
async function getFriends() {
    try {
        const response = await fetch(`/me/friends`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!response.ok) {
            createAlert("Error", "Something Went Wrong. Please Try Again.");
            return;
        }

        const { safeMutualFriends } = await response.json();

        return safeMutualFriends;
    }
    catch (error) {
        console.error(error);
        await createAlert("Error", "User Not Found. Please Try Again.");
    }
}

/*GET FOLLOWING*/
async function getFollowing() {
    const response = await fetch(`/me/following`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (!response.ok) {
        return []
    };
    const { safeFollowing } = await response.json();

    return safeFollowing || [];
}


/*CLICK FRIENDS*/
userStatisticsFriendAmount.addEventListener("click", async function () {
    const usersFriends = await getFriends();
    displayUsers(usersFriends, showUsersFriends);
    updateFriendRequestIcon();
    showDisplaySection(showUsersFriendsContainer);
})

/*SEE FRIEND REQUESTS*/
friendRequestButton.addEventListener("click", async function () {
    await displayFriendRequests();
})

async function updateFriendRequestIcon() {
    const followers = await getFriendRequests() || [];
    if (followers.length === 0) {
        friendRequestButton.textContent = 'notifications';
        document.querySelector("#friends-header").textContent = "Friends";
    }
    else {
        friendRequestButton.textContent = 'notification_important';
        document.querySelector("#friends-header").textContent = "Friends❕";
    }
}

closeFriendRequestButton.addEventListener("click", async function () {
    friendRequestPopup.classList.remove("open", "immediateclose");
    friendRequestPopup.classList.add("close");
});


/*DISPLAY FRIEND REQUESTS*/
async function displayFriendRequests() {
    friendRequestPopup.classList.remove("close", "immediateclose");
    friendRequestPopup.classList.add("open");

    friendRequestContainer.innerHTML = "";
    const requests = await getFriendRequests();

    if (requests.length === 0) {
        friendRequestContainer.innerHTML = `
            <p style="
                text-align: center; 
                margin: 0;
                color: var(--readable-text);
            ">
                No Friend Request Yet!
            </p>
        `;
        return;
    }

    requests.forEach(reqUser => {
        const foundUsersDiv = document.createElement("div");
        foundUsersDiv.classList.add("each-friend-request");

        foundUsersDiv.innerHTML = `
            <div class="found-users-header">
                <img 
                    src="${reqUser.profilePicUrl || '/profile-pics/default-profile.jpg'}"
                    alt="${reqUser.username}"
                    class="found-user-profile-pic"
                >

                <div class="found-users-username-and-bio">
                    <div class="found-users-username-and-add-friend-button">
                        <span class="found-username">${reqUser.username}</span>
                        <span id = "friend-request-person-alert" class="add-friend-button material-symbols-outlined">
                            person_alert
                        </span>
                    </div>
                    <span class="found-bio">${reqUser.bio || ""}</span>
                </div>
            </div>
        `;

        const acceptRequestButton = foundUsersDiv.querySelector(".add-friend-button");

        acceptRequestButton.addEventListener("click", async () => {
            const confirmed = await createConfirmation(`Friend ${reqUser.username}?`);

            if (confirmed) {
                const response = await fetch(`/me/friend-requests/${reqUser.id}/accept`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                }

                );

                if (!response.ok) {
                    createAlert("Error", "Please Try Again.");
                    friendRequestPopup.classList.remove("close", "immediateclose");
                    friendRequestPopup.classList.add("open");
                    return;
                }

                const newMutualFriends = await getFriends() || [];
                displayUsers(newMutualFriends, showUsersFriends);
            } else {
                await fetch(`/me/friend-requests/${reqUser.id}/reject`,
                    {
                        method: "POST",
                        credentials: "include"
                    }
                );
            }

            await displayFriendRequests();
            await updateFriendRequestIcon();

        });

        friendRequestContainer.appendChild(foundUsersDiv);
    });

    friendRequestContainer.style.display = "flex";
    friendRequestPopup.classList.remove("close", "immediateclose");
    friendRequestPopup.classList.add("open");
}


//SEND FRIEND REQUEST
async function sendFriendRequest(userId) {
    try {
        let response = await fetch(`/users/${userId}/request`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
        if (!response.ok) {
            await createAlert("Error", "Unable to Send Friend Request. Please Try Again.");
            return;
        }
    }
    catch (error) {
        await createAlert("Error", "Unable to Send Friend Request. Please Try Again.");
        return;
    }
}


//GET FRIEND REQUESTS
async function getFriendRequests() {
    const response = await fetch(`/me/friend-requests`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    if (!response.ok) {
        return []
    };

    const { friendRequests } = await response.json();
    return friendRequests;
}

//FEEDBACK
feedbackButton.addEventListener("click", () => {
    feedbackFormPopup.classList.remove("close", "immediateclose");
    feedbackFormPopup.classList.add("open");
})

closeFeedbackButton.addEventListener("click", () => {
    feedbackFormPopup.classList.remove("open", "immediateclose");
    feedbackFormPopup.classList.add("close");
});

submitFeedbackButton.addEventListener("click", async function (e) {
    e.preventDefault();
    const category = feedbackOptions.value.trim()
    const content = feedbackContent.value.trim()
    await sendFeedback(content, category);
});

async function sendFeedback(feedbackCategory, feedbackContent) {
    if (!feedbackCategory || !feedbackContent) {
        await createAlert("Error", "Missing Category or Feedback.");
        return;
    }
    try {
        const response = await fetch(`/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                feedbackCategory,
                feedbackContent
            }),
            credentials: "include"
        });

        if (!response.ok) {
            await createAlert("Error", "Unable to Send Feedback Form. Please Try Again.");
            return;
        }

        feedbackFormPopup.classList.remove("open", "immediate.close");
        feedbackFormPopup.classList.add("close");
        await createAlert("Success", "Feedback Sent. Thank You!");

    }
    catch (error) {
        await createAlert("Error", "Unable to Send Feedback Form. Please Try Again.");
        return;
    }
}

//bottom