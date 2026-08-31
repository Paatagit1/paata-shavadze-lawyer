/* =========================================================
   PAATA SHAVADZE — ADMIN PANEL
   Supabase Auth + Database + Storage
========================================================= */


/* =========================================================
   1. SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
    "https://kloegzeotojawshbmwcm.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_6Y4noj5QkAlX4S7z6JVJPw_dlzDiCo0";


const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const adminApp =
    document.getElementById("adminApp");

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginStatus =
    document.getElementById("loginStatus");

const logoutButton =
    document.getElementById("logoutButton");

const adminEmail =
    document.getElementById("adminEmail");

const adminPageTitle =
    document.getElementById("adminPageTitle");


/* COUNTERS */

const casesCount =
    document.getElementById("casesCount");

const newsCount =
    document.getElementById("newsCount");

const vacanciesCount =
    document.getElementById("vacanciesCount");

const publicationsCount =
    document.getElementById("publicationsCount");


/* LISTS */

const casesList =
    document.getElementById("casesList");

const newsList =
    document.getElementById("newsList");

const vacanciesList =
    document.getElementById("vacanciesList");

const publicationsList =
    document.getElementById("publicationsList");


/* =========================================================
   3. HELPERS
========================================================= */

function setStatus(
    element,
    message = "",
    type = ""
) {

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.classList.remove(
        "success",
        "error"
    );

    if (type) {
        element.classList.add(type);
    }

}


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function formatDate(value) {

    if (!value) {
        return "";
    }

    try {

        return new Intl.DateTimeFormat(
            "ka-GE",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        ).format(
            new Date(value)
        );

    } catch {

        return "";

    }

}


function shortenText(
    text = "",
    maxLength = 150
) {

    const clean =
        String(text).trim();

    if (
        clean.length <= maxLength
    ) {
        return clean;
    }

    return (
        clean.slice(0, maxLength) +
        "..."
    );

}


function safeFileName(name = "file") {

    const extension =
        name.includes(".")
            ? "." + name.split(".").pop()
            : "";

    const base =
        name
            .replace(extension, "")
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "-")
            .replace(/-+/g, "-");

    return (
        base +
        "-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2, 8) +
        extension
    );

}


/* =========================================================
   4. IMAGE / FILE UPLOAD
========================================================= */

async function uploadFile(
    file,
    folder = "uploads"
) {

    if (!file) {
        return null;
    }

    const fileName =
        safeFileName(file.name);

    const filePath =
        `${folder}/${fileName}`;


    const {
        error: uploadError
    } =
        await db
            .storage
            .from("website-media")
            .upload(
                filePath,
                file,
                {
                    cacheControl: "3600",
                    upsert: false
                }
            );


    if (uploadError) {

        console.error(
            "Upload error:",
            uploadError
        );

        throw uploadError;

    }


    const {
        data
    } =
        db
            .storage
            .from("website-media")
            .getPublicUrl(
                filePath
            );


    return (
        data?.publicUrl || null
    );

}


/* =========================================================
   5. AUTHENTICATION
========================================================= */

async function login(
    email,
    password
) {

    setStatus(
        loginStatus,
        "მიმდინარეობს შესვლა..."
    );


    const {
        data,
        error
    } =
        await db.auth.signInWithPassword({
            email,
            password
        });


    if (error) {

        console.error(error);

        setStatus(
            loginStatus,
            "ელფოსტა ან პაროლი არასწორია.",
            "error"
        );

        return;

    }


    const user =
        data.user;


    const isAdmin =
        await verifyAdmin(
            user.id
        );


    if (!isAdmin) {

        await db.auth.signOut();

        setStatus(
            loginStatus,
            "ამ ანგარიშს ადმინისტრატორის წვდომა არ აქვს.",
            "error"
        );

        return;

    }


    setStatus(
        loginStatus,
        "წარმატებით შეხვედით.",
        "success"
    );


    await showAdmin(
        user
    );

}


/* =========================================================
   6. VERIFY ADMIN
========================================================= */

async function verifyAdmin(
    userId
) {

    const {
        data,
        error
    } =
        await db
            .from("admin_users")
            .select("user_id")
            .eq(
                "user_id",
                userId
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Admin verification error:",
            error
        );

        return false;

    }


    return Boolean(data);

}


/* =========================================================
   7. SHOW / HIDE ADMIN
========================================================= */

async function showAdmin(user) {

    loginScreen.hidden =
        true;

    adminApp.hidden =
        false;


    if (adminEmail) {

        adminEmail.textContent =
            user.email || "Admin";

    }


    await loadAllContent();

}


function showLogin() {

    adminApp.hidden =
        true;

    loginScreen.hidden =
        false;

}


/* =========================================================
   8. LOGIN FORM
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                loginEmail.value.trim();

            const password =
                loginPassword.value;


            if (
                !email ||
                !password
            ) {

                setStatus(
                    loginStatus,
                    "შეავსეთ ელფოსტა და პაროლი.",
                    "error"
                );

                return;

            }


            await login(
                email,
                password
            );

        }
    );

}


/* =========================================================
   9. LOGOUT
========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            await db.auth.signOut();

            showLogin();

            if (loginForm) {
                loginForm.reset();
            }

            setStatus(
                loginStatus,
                "თქვენ გამოხვედით სისტემიდან."
            );

        }
    );

}


/* =========================================================
   10. SESSION CHECK
========================================================= */

async function checkSession() {

    const {
        data: {
            session
        }
    } =
        await db.auth.getSession();


    if (!session?.user) {

        showLogin();

        return;

    }


    const isAdmin =
        await verifyAdmin(
            session.user.id
        );


    if (!isAdmin) {

        await db.auth.signOut();

        showLogin();

        setStatus(
            loginStatus,
            "ამ ანგარიშს ადმინისტრატორის წვდომა არ აქვს.",
            "error"
        );

        return;

    }


    await showAdmin(
        session.user
    );

}


/* =========================================================
   11. NAVIGATION
========================================================= */

const navButtons =
    document.querySelectorAll(
        ".admin-nav-button"
    );

const adminPanels =
    document.querySelectorAll(
        ".admin-panel"
    );


const panelTitles = {

    dashboardPanel:
        "მთავარი",

    casesPanel:
        "წარმატებული საქმეები",

    newsPanel:
        "სიახლეები",

    vacanciesPanel:
        "ვაკანსიები",

    publicationsPanel:
        "პუბლიკაციები"

};


navButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.panel;


                navButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                adminPanels.forEach(
                    panel =>
                        panel.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const panel =
                    document.getElementById(
                        target
                    );


                if (panel) {

                    panel.classList.add(
                        "active"
                    );

                }


                if (adminPageTitle) {

                    adminPageTitle.textContent =
                        panelTitles[target] ||
                        "Administration";

                }

            }
        );

    }
);


/* =========================================================
   12. FORM OPEN / CLOSE
========================================================= */

document
    .querySelectorAll(
        "[data-form-toggle]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.formToggle;

                    const card =
                        document.getElementById(
                            id
                        );

                    if (card) {

                        card.hidden =
                            false;

                        card.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


document
    .querySelectorAll(
        "[data-form-close]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.formClose;

                    const card =
                        document.getElementById(
                            id
                        );

                    if (card) {

                        card.hidden =
                            true;

                    }

                }
            );

        }
    );


/* =========================================================
   13. LOAD ALL CONTENT
========================================================= */

async function loadAllContent() {

    await Promise.all([
        loadCases(),
        loadNews(),
        loadVacancies(),
        loadPublications()
    ]);

}


/* =========================================================
   14. CASES
========================================================= */

const caseForm =
    document.getElementById(
        "caseForm"
    );

const caseId =
    document.getElementById(
        "caseId"
    );

const caseTitle =
    document.getElementById(
        "caseTitle"
    );

const caseCategory =
    document.getElementById(
        "caseCategory"
    );

const caseDescription =
    document.getElementById(
        "caseDescription"
    );

const caseResult =
    document.getElementById(
        "caseResult"
    );

const caseImage =
    document.getElementById(
        "caseImage"
    );

const casePublished =
    document.getElementById(
        "casePublished"
    );

const caseStatus =
    document.getElementById(
        "caseStatus"
    );

const caseFormCard =
    document.getElementById(
        "caseFormCard"
    );


async function loadCases() {

    const {
        data,
        error
    } =
        await db
            .from("cases")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Cases load error:",
            error
        );

        if (casesList) {

            casesList.innerHTML =
                `<div class="empty-state">
                    საქმეების ჩატვირთვა ვერ მოხერხდა.
                </div>`;

        }

        return;

    }


    if (casesCount) {

        casesCount.textContent =
            data.length;

    }


    renderCases(data);

}


function renderCases(items) {

    if (!casesList) {
        return;
    }


    if (!items.length) {

        casesList.innerHTML = `
            <div class="empty-state">
                წარმატებული საქმეები ჯერ დამატებული არ არის.
            </div>
        `;

        return;

    }


    casesList.innerHTML =
        items.map(
            item => {

                return `
                    <article class="content-item">

                        <div class="content-thumb">

                            ${
                                item.image_url
                                    ? `
                                        <img
                                            src="${escapeHTML(item.image_url)}"
                                            alt=""
                                        >
                                    `
                                    : ""
                            }

                        </div>


                        <div class="content-body">

                            <h4>
                                ${escapeHTML(item.title)}
                            </h4>

                            <p>
                                ${escapeHTML(
                                    shortenText(
                                        item.description,
                                        180
                                    )
                                )}
                            </p>


                            <div class="content-meta">

                                <span class="badge">
                                    ${escapeHTML(item.category)}
                                </span>

                                <span
                                    class="badge ${
                                        item.is_published
                                            ? "published"
                                            : "draft"
                                    }"
                                >
                                    ${
                                        item.is_published
                                            ? "გამოქვეყნებულია"
                                            : "დრაფტი"
                                    }
                                </span>

                                <span class="badge">
                                    ${formatDate(item.created_at)}
                                </span>

                            </div>

                        </div>


                        <div class="item-actions">

                            <button
                                class="edit-button"
                                type="button"
                                data-edit-case="${item.id}"
                            >
                                რედაქტირება
                            </button>

                            <button
                                class="delete-button"
                                type="button"
                                data-delete-case="${item.id}"
                            >
                                წაშლა
                            </button>

                        </div>

                    </article>
                `;

            }
        ).join("");


    document
        .querySelectorAll(
            "[data-edit-case]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.editCase
                            );

                        const item =
                            items.find(
                                entry =>
                                    entry.id === id
                            );

                        if (item) {

                            editCase(item);

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-delete-case]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        await deleteRecord(
                            "cases",
                            Number(
                                button.dataset.deleteCase
                            ),
                            loadCases,
                            "საქმე"
                        );

                    }
                );

            }
        );

}


function editCase(item) {

    caseId.value =
        item.id;

    caseTitle.value =
        item.title || "";

    caseCategory.value =
        item.category || "";

    caseDescription.value =
        item.description || "";

    caseResult.value =
        item.result || "";

    casePublished.checked =
        Boolean(
            item.is_published
        );


    caseForm.dataset.currentImage =
        item.image_url || "";


    caseFormCard.hidden =
        false;


    caseFormCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (caseForm) {

    caseForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            setStatus(
                caseStatus,
                "მიმდინარეობს შენახვა..."
            );


            try {

                let imageUrl =
                    caseForm.dataset.currentImage ||
                    null;


                if (
                    caseImage.files[0]
                ) {

                    imageUrl =
                        await uploadFile(
                            caseImage.files[0],
                            "cases"
                        );

                }


                const payload = {

                    title:
                        caseTitle.value.trim(),

                    category:
                        caseCategory.value,

                    description:
                        caseDescription.value.trim(),

                    result:
                        caseResult.value.trim(),

                    image_url:
                        imageUrl,

                    is_published:
                        casePublished.checked

                };


                let error;


                if (caseId.value) {

                    ({
                        error
                    } =
                        await db
                            .from("cases")
                            .update(payload)
                            .eq(
                                "id",
                                caseId.value
                            ));

                } else {

                    ({
                        error
                    } =
                        await db
                            .from("cases")
                            .insert(payload));

                }


                if (error) {
                    throw error;
                }


                setStatus(
                    caseStatus,
                    "საქმე წარმატებით შეინახა.",
                    "success"
                );


                resetCaseForm();

                await loadCases();

                await updateDashboardCounters();

            } catch (error) {

                console.error(error);

                setStatus(
                    caseStatus,
                    error.message ||
                    "შენახვა ვერ მოხერხდა.",
                    "error"
                );

            }

        }
    );

}


function resetCaseForm() {

    caseForm.reset();

    caseId.value =
        "";

    casePublished.checked =
        true;

    delete caseForm.dataset.currentImage;

}


/* =========================================================
   15. NEWS
========================================================= */

const newsForm =
    document.getElementById(
        "newsForm"
    );

const newsId =
    document.getElementById(
        "newsId"
    );

const newsTitle =
    document.getElementById(
        "newsTitle"
    );

const newsDescription =
    document.getElementById(
        "newsDescription"
    );

const newsImage =
    document.getElementById(
        "newsImage"
    );

const newsPublished =
    document.getElementById(
        "newsPublished"
    );

const newsStatus =
    document.getElementById(
        "newsStatus"
    );

const newsFormCard =
    document.getElementById(
        "newsFormCard"
    );


async function loadNews() {

    const {
        data,
        error
    } =
        await db
            .from("news")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        return;

    }


    if (newsCount) {

        newsCount.textContent =
            data.length;

    }


    renderNews(data);

}


function renderNews(items) {

    if (!newsList) {
        return;
    }


    if (!items.length) {

        newsList.innerHTML = `
            <div class="empty-state">
                სიახლეები ჯერ დამატებული არ არის.
            </div>
        `;

        return;

    }


    newsList.innerHTML =
        items.map(
            item => `
                <article class="content-item">

                    <div class="content-thumb">

                        ${
                            item.image_url
                                ? `
                                    <img
                                        src="${escapeHTML(item.image_url)}"
                                        alt=""
                                    >
                                `
                                : ""
                        }

                    </div>


                    <div class="content-body">

                        <h4>
                            ${escapeHTML(item.title)}
                        </h4>

                        <p>
                            ${escapeHTML(
                                shortenText(
                                    item.description,
                                    180
                                )
                            )}
                        </p>


                        <div class="content-meta">

                            <span
                                class="badge ${
                                    item.is_published
                                        ? "published"
                                        : "draft"
                                }"
                            >
                                ${
                                    item.is_published
                                        ? "გამოქვეყნებულია"
                                        : "დრაფტი"
                                }
                            </span>

                            <span class="badge">
                                ${formatDate(item.created_at)}
                            </span>

                        </div>

                    </div>


                    <div class="item-actions">

                        <button
                            class="edit-button"
                            data-edit-news="${item.id}"
                            type="button"
                        >
                            რედაქტირება
                        </button>

                        <button
                            class="delete-button"
                            data-delete-news="${item.id}"
                            type="button"
                        >
                            წაშლა
                        </button>

                    </div>

                </article>
            `
        ).join("");


    document
        .querySelectorAll(
            "[data-edit-news]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.editNews
                            );

                        const item =
                            items.find(
                                entry =>
                                    entry.id === id
                            );

                        if (item) {

                            editNews(item);

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-delete-news]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        await deleteRecord(
                            "news",
                            Number(
                                button.dataset.deleteNews
                            ),
                            loadNews,
                            "სიახლე"
                        );

                    }
                );

            }
        );

}


function editNews(item) {

    newsId.value =
        item.id;

    newsTitle.value =
        item.title || "";

    newsDescription.value =
        item.description || "";

    newsPublished.checked =
        Boolean(
            item.is_published
        );


    newsForm.dataset.currentImage =
        item.image_url || "";


    newsFormCard.hidden =
        false;


    newsFormCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (newsForm) {

    newsForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            setStatus(
                newsStatus,
                "მიმდინარეობს შენახვა..."
            );


            try {

                let imageUrl =
                    newsForm.dataset.currentImage ||
                    null;


                if (
                    newsImage.files[0]
                ) {

                    imageUrl =
                        await uploadFile(
                            newsImage.files[0],
                            "news"
                        );

                }


                const payload = {

                    title:
                        newsTitle.value.trim(),

                    description:
                        newsDescription.value.trim(),

                    image_url:
                        imageUrl,

                    is_published:
                        newsPublished.checked

                };


                let error;


                if (newsId.value) {

                    ({
                        error
                    } =
                        await db
                            .from("news")
                            .update(payload)
                            .eq(
                                "id",
                                newsId.value
                            ));

                } else {

                    ({
                        error
                    } =
                        await db
                            .from("news")
                            .insert(payload));

                }


                if (error) {
                    throw error;
                }


                setStatus(
                    newsStatus,
                    "სიახლე წარმატებით შეინახა.",
                    "success"
                );


                resetNewsForm();

                await loadNews();

                await updateDashboardCounters();

            } catch (error) {

                console.error(error);

                setStatus(
                    newsStatus,
                    error.message ||
                    "შენახვა ვერ მოხერხდა.",
                    "error"
                );

            }

        }
    );

}


function resetNewsForm() {

    newsForm.reset();

    newsId.value =
        "";

    newsPublished.checked =
        true;

    delete newsForm.dataset.currentImage;

}


/* =========================================================
   16. VACANCIES
========================================================= */

const vacancyForm =
    document.getElementById(
        "vacancyForm"
    );

const vacancyId =
    document.getElementById(
        "vacancyId"
    );

const vacancyTitle =
    document.getElementById(
        "vacancyTitle"
    );

const vacancyDescription =
    document.getElementById(
        "vacancyDescription"
    );

const vacancyImage =
    document.getElementById(
        "vacancyImage"
    );

const vacancyPublished =
    document.getElementById(
        "vacancyPublished"
    );

const vacancyStatus =
    document.getElementById(
        "vacancyStatus"
    );

const vacancyFormCard =
    document.getElementById(
        "vacancyFormCard"
    );


async function loadVacancies() {

    const {
        data,
        error
    } =
        await db
            .from("vacancies")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        return;

    }


    if (vacanciesCount) {

        vacanciesCount.textContent =
            data.length;

    }


    renderVacancies(data);

}


function renderVacancies(items) {

    if (!vacanciesList) {
        return;
    }


    if (!items.length) {

        vacanciesList.innerHTML = `
            <div class="empty-state">
                აქტიური ვაკანსიები ჯერ დამატებული არ არის.
            </div>
        `;

        return;

    }


    vacanciesList.innerHTML =
        items.map(
            item => `
                <article class="content-item">

                    <div class="content-thumb">

                        ${
                            item.image_url
                                ? `
                                    <img
                                        src="${escapeHTML(item.image_url)}"
                                        alt=""
                                    >
                                `
                                : ""
                        }

                    </div>


                    <div class="content-body">

                        <h4>
                            ${escapeHTML(item.title)}
                        </h4>

                        <p>
                            ${escapeHTML(
                                shortenText(
                                    item.description,
                                    180
                                )
                            )}
                        </p>


                        <div class="content-meta">

                            <span
                                class="badge ${
                                    item.is_published
                                        ? "published"
                                        : "draft"
                                }"
                            >
                                ${
                                    item.is_published
                                        ? "გამოქვეყნებულია"
                                        : "დრაფტი"
                                }
                            </span>

                            <span class="badge">
                                ${formatDate(item.created_at)}
                            </span>

                        </div>

                    </div>


                    <div class="item-actions">

                        <button
                            class="edit-button"
                            data-edit-vacancy="${item.id}"
                            type="button"
                        >
                            რედაქტირება
                        </button>

                        <button
                            class="delete-button"
                            data-delete-vacancy="${item.id}"
                            type="button"
                        >
                            წაშლა
                        </button>

                    </div>

                </article>
            `
        ).join("");


    document
        .querySelectorAll(
            "[data-edit-vacancy]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.editVacancy
                            );

                        const item =
                            items.find(
                                entry =>
                                    entry.id === id
                            );

                        if (item) {

                            editVacancy(item);

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-delete-vacancy]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        await deleteRecord(
                            "vacancies",
                            Number(
                                button.dataset.deleteVacancy
                            ),
                            loadVacancies,
                            "ვაკანსია"
                        );

                    }
                );

            }
        );

}


function editVacancy(item) {

    vacancyId.value =
        item.id;

    vacancyTitle.value =
        item.title || "";

    vacancyDescription.value =
        item.description || "";

    vacancyPublished.checked =
        Boolean(
            item.is_published
        );


    vacancyForm.dataset.currentImage =
        item.image_url || "";


    vacancyFormCard.hidden =
        false;


    vacancyFormCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (vacancyForm) {

    vacancyForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            setStatus(
                vacancyStatus,
                "მიმდინარეობს შენახვა..."
            );


            try {

                let imageUrl =
                    vacancyForm.dataset.currentImage ||
                    null;


                if (
                    vacancyImage.files[0]
                ) {

                    imageUrl =
                        await uploadFile(
                            vacancyImage.files[0],
                            "vacancies"
                        );

                }


                const payload = {

                    title:
                        vacancyTitle.value.trim(),

                    description:
                        vacancyDescription.value.trim(),

                    image_url:
                        imageUrl,

                    is_published:
                        vacancyPublished.checked

                };


                let error;


                if (vacancyId.value) {

                    ({
                        error
                    } =
                        await db
                            .from("vacancies")
                            .update(payload)
                            .eq(
                                "id",
                                vacancyId.value
                            ));

                } else {

                    ({
                        error
                    } =
                        await db
                            .from("vacancies")
                            .insert(payload));

                }


                if (error) {
                    throw error;
                }


                setStatus(
                    vacancyStatus,
                    "ვაკანსია წარმატებით შეინახა.",
                    "success"
                );


                resetVacancyForm();

                await loadVacancies();

                await updateDashboardCounters();

            } catch (error) {

                console.error(error);

                setStatus(
                    vacancyStatus,
                    error.message ||
                    "შენახვა ვერ მოხერხდა.",
                    "error"
                );

            }

        }
    );

}


function resetVacancyForm() {

    vacancyForm.reset();

    vacancyId.value =
        "";

    vacancyPublished.checked =
        true;

    delete vacancyForm.dataset.currentImage;

}


/* =========================================================
   17. PUBLICATIONS
========================================================= */

const publicationForm =
    document.getElementById(
        "publicationForm"
    );

const publicationId =
    document.getElementById(
        "publicationId"
    );

const publicationTitle =
    document.getElementById(
        "publicationTitle"
    );

const publicationDescription =
    document.getElementById(
        "publicationDescription"
    );

const publicationImage =
    document.getElementById(
        "publicationImage"
    );

const publicationFile =
    document.getElementById(
        "publicationFile"
    );

const publicationPublished =
    document.getElementById(
        "publicationPublished"
    );

const publicationStatus =
    document.getElementById(
        "publicationStatus"
    );

const publicationFormCard =
    document.getElementById(
        "publicationFormCard"
    );


async function loadPublications() {

    const {
        data,
        error
    } =
        await db
            .from("publications")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        return;

    }


    if (publicationsCount) {

        publicationsCount.textContent =
            data.length;

    }


    renderPublications(data);

}


function renderPublications(items) {

    if (!publicationsList) {
        return;
    }


    if (!items.length) {

        publicationsList.innerHTML = `
            <div class="empty-state">
                პუბლიკაციები ჯერ დამატებული არ არის.
            </div>
        `;

        return;

    }


    publicationsList.innerHTML =
        items.map(
            item => `
                <article class="content-item">

                    <div class="content-thumb">

                        ${
                            item.image_url
                                ? `
                                    <img
                                        src="${escapeHTML(item.image_url)}"
                                        alt=""
                                    >
                                `
                                : ""
                        }

                    </div>


                    <div class="content-body">

                        <h4>
                            ${escapeHTML(item.title)}
                        </h4>

                        <p>
                            ${escapeHTML(
                                shortenText(
                                    item.description || "",
                                    180
                                )
                            )}
                        </p>


                        <div class="content-meta">

                            <span
                                class="badge ${
                                    item.is_published
                                        ? "published"
                                        : "draft"
                                }"
                            >
                                ${
                                    item.is_published
                                        ? "გამოქვეყნებულია"
                                        : "დრაფტი"
                                }
                            </span>

                            ${
                                item.file_url
                                    ? `
                                        <a
                                            class="badge"
                                            href="${escapeHTML(item.file_url)}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ფაილის ნახვა
                                        </a>
                                    `
                                    : ""
                            }

                            <span class="badge">
                                ${formatDate(item.created_at)}
                            </span>

                        </div>

                    </div>


                    <div class="item-actions">

                        <button
                            class="edit-button"
                            data-edit-publication="${item.id}"
                            type="button"
                        >
                            რედაქტირება
                        </button>

                        <button
                            class="delete-button"
                            data-delete-publication="${item.id}"
                            type="button"
                        >
                            წაშლა
                        </button>

                    </div>

                </article>
            `
        ).join("");


    document
        .querySelectorAll(
            "[data-edit-publication]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.editPublication
                            );

                        const item =
                            items.find(
                                entry =>
                                    entry.id === id
                            );

                        if (item) {

                            editPublication(item);

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-delete-publication]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        await deleteRecord(
                            "publications",
                            Number(
                                button.dataset.deletePublication
                            ),
                            loadPublications,
                            "პუბლიკაცია"
                        );

                    }
                );

            }
        );

}


function editPublication(item) {

    publicationId.value =
        item.id;

    publicationTitle.value =
        item.title || "";

    publicationDescription.value =
        item.description || "";

    publicationPublished.checked =
        Boolean(
            item.is_published
        );


    publicationForm.dataset.currentImage =
        item.image_url || "";

    publicationForm.dataset.currentFile =
        item.file_url || "";


    publicationFormCard.hidden =
        false;


    publicationFormCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


if (publicationForm) {

    publicationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            setStatus(
                publicationStatus,
                "მიმდინარეობს შენახვა..."
            );


            try {

                let imageUrl =
                    publicationForm.dataset.currentImage ||
                    null;

                let fileUrl =
                    publicationForm.dataset.currentFile ||
                    null;


                if (
                    publicationImage.files[0]
                ) {

                    imageUrl =
                        await uploadFile(
                            publicationImage.files[0],
                            "publications/images"
                        );

                }


                if (
                    publicationFile.files[0]
                ) {

                    fileUrl =
                        await uploadFile(
                            publicationFile.files[0],
                            "publications/files"
                        );

                }


                const payload = {

                    title:
                        publicationTitle.value.trim(),

                    description:
                        publicationDescription.value.trim(),

                    image_url:
                        imageUrl,

                    file_url:
                        fileUrl,

                    is_published:
                        publicationPublished.checked

                };


                let error;


                if (
                    publicationId.value
                ) {

                    ({
                        error
                    } =
                        await db
                            .from("publications")
                            .update(payload)
                            .eq(
                                "id",
                                publicationId.value
                            ));

                } else {

                    ({
                        error
                    } =
                        await db
                            .from("publications")
                            .insert(payload));

                }


                if (error) {
                    throw error;
                }


                setStatus(
                    publicationStatus,
                    "პუბლიკაცია წარმატებით შეინახა.",
                    "success"
                );


                resetPublicationForm();

                await loadPublications();

                await updateDashboardCounters();

            } catch (error) {

                console.error(error);

                setStatus(
                    publicationStatus,
                    error.message ||
                    "შენახვა ვერ მოხერხდა.",
                    "error"
                );

            }

        }
    );

}


function resetPublicationForm() {

    publicationForm.reset();

    publicationId.value =
        "";

    publicationPublished.checked =
        true;

    delete publicationForm.dataset.currentImage;

    delete publicationForm.dataset.currentFile;

}


/* =========================================================
   18. GENERIC DELETE
========================================================= */

async function deleteRecord(
    table,
    id,
    reloadFunction,
    itemName
) {

    const confirmed =
        window.confirm(
            `ნამდვილად გსურთ "${itemName}"-ის წაშლა?`
        );


    if (!confirmed) {
        return;
    }


    const {
        error
    } =
        await db
            .from(table)
            .delete()
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(error);

        alert(
            "წაშლა ვერ მოხერხდა: " +
            error.message
        );

        return;

    }


    await reloadFunction();

    await updateDashboardCounters();

}


/* =========================================================
   19. DASHBOARD COUNTERS
========================================================= */

async function getTableCount(
    table
) {

    const {
        count,
        error
    } =
        await db
            .from(table)
            .select(
                "*",
                {
                    count: "exact",
                    head: true
                }
            );


    if (error) {

        console.error(
            `Count error ${table}:`,
            error
        );

        return 0;

    }


    return count || 0;

}


async function updateDashboardCounters() {

    const [
        caseTotal,
        newsTotal,
        vacancyTotal,
        publicationTotal
    ] =
        await Promise.all([

            getTableCount(
                "cases"
            ),

            getTableCount(
                "news"
            ),

            getTableCount(
                "vacancies"
            ),

            getTableCount(
                "publications"
            )

        ]);


    if (casesCount) {

        casesCount.textContent =
            caseTotal;

    }


    if (newsCount) {

        newsCount.textContent =
            newsTotal;

    }


    if (vacanciesCount) {

        vacanciesCount.textContent =
            vacancyTotal;

    }


    if (publicationsCount) {

        publicationsCount.textContent =
            publicationTotal;

    }

}


/* =========================================================
   20. AUTH STATE LISTENER
========================================================= */

db.auth.onAuthStateChange(
    async (
        event,
        session
    ) => {

        if (
            event === "SIGNED_OUT"
        ) {

            showLogin();

        }


        if (
            event === "SIGNED_IN" &&
            session?.user
        ) {

            const isAdmin =
                await verifyAdmin(
                    session.user.id
                );


            if (isAdmin) {

                await showAdmin(
                    session.user
                );

            }

        }

    }
);


/* =========================================================
   21. START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await checkSession();

    }
);