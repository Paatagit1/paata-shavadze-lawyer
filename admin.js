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
/* PAATA CMS — add only at the bottom of the EXISTING admin.js. */
(() => {
"use strict";
if (!window.supabase || typeof db === "undefined") return;

const L = ["ka","en","ru"];
const IMG = [
  "brandPhoto","heroImage","paataPhoto","criminalPracticeImage","civilPracticeImage","administrativePracticeImage",
  "resourceImage1","resourceImage2","resourceImage3","resourceImage4","resourceImage5","resourceImage6","resourceImage7","resourceImage8","resourceImage9"
];
const state={content:new Map(),media:new Map(),links:new Map(),settings:new Map(),sections:[],blocks:[],keys:[],defaults:{},src:{ka:{},en:{},ru:{}},images:[],anchors:[],tab:"content",section:"mission"};
const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const txt=v=>String(v??"").trim();
const inp=(label,id,value="",type="text",extra="")=>`<label><span>${esc(label)}</span><input id="${esc(id)}" type="${type}" value="${esc(value)}" ${extra}></label>`;
const area=(label,id,value="",rows=3)=>`<label><span>${esc(label)}</span><textarea id="${esc(id)}" rows="${rows}">${esc(value)}</textarea></label>`;
const status=(m,t="")=>{const e=document.getElementById("paataCmsStatus");if(e){e.textContent=m;e.className=`form-status ${t}`;}};

function balanced(s,start){let o=s.indexOf("{",start),d=0,q=null,e=false,lc=false,bc=false;if(o<0)return null;for(let i=o;i<s.length;i++){let c=s[i],n=s[i+1];if(lc){if(c==="\n")lc=false;continue}if(bc){if(c==="*"&&n==="/"){bc=false;i++}continue}if(q){if(e){e=false;continue}if(c==="\\"){e=true;continue}if(c===q)q=null;continue}if(c==="'"||c==='"'||c==="`"){q=c;continue}if(c==="/"&&n==="/"){lc=true;i++;continue}if(c==="/"&&n==="*"){bc=true;i++;continue}if(c==="{")d++;else if(c==="}"&&--d===0)return s.slice(o,i+1)}return null}
function obj(s){try{return Function(`"use strict";return (${s});`)()}catch{return{}}}
function parseTranslations(s){let out={ka:{},en:{},ru:{}};let a=s.indexOf("const translations =");if(a>=0){let o=balanced(s,a);if(o){let x=obj(o);L.forEach(k=>Object.assign(out[k],x?.[k]||{}))}}let re=/Object\.assign\(\s*translations\.(ka|en|ru)\s*,/g,m;while((m=re.exec(s))){let o=balanced(s,re.lastIndex);if(!o)break;Object.assign(out[m[1]],obj(o));re.lastIndex+=o.length}return out}

async function source(){
    const [a,b]=await Promise.all([
        fetch(new URL("index.html",location.href),{cache:"no-store"}),
        fetch(new URL("script.js",location.href),{cache:"no-store"})
    ]);

    if(!a.ok||!b.ok)
        throw Error("index.html ან script.js ვერ ჩაიტვირთა. სახელები გადაამოწმე.");

    const html=await a.text();
    const js=await b.text();
    const d=new DOMParser().parseFromString(html,"text/html");

    state.src=parseTranslations(js);

    let set=new Set();

    d.querySelectorAll("[data-i18n]").forEach(e=>{
        let k=e.dataset.i18n;
        if(k){
            set.add(k);
            if(state.defaults[k]===undefined)
                state.defaults[k]=txt(e.textContent);
        }
    });

    state.keys=[...set].sort();

    state.images=[...d.querySelectorAll("img")].map((e,i)=>({
        i,
        key:IMG[i]||`image_${String(i+1).padStart(3,"0")}`,
        src:e.src||e.getAttribute("src")||"",
        alt:e.alt||"",
        i18nAlt:e.dataset.i18nAlt||""
    }));

    state.anchors=[...d.querySelectorAll("a")].map((e,i)=>({
        i,
        key:`link_${String(i+1).padStart(3,"0")}`,
        href:e.getAttribute("href")||"",
        label:txt(e.textContent),
        i18n:e.dataset.i18n||""
    }));
}

async function dbLoad(){
    const r=await Promise.all([
        db.from("site_content").select("*"),
        db.from("site_media").select("*"),
        db.from("site_links").select("*"),
        db.from("site_settings").select("*"),
        db.from("site_sections").select("*").order("sort_order"),
        db.from("site_blocks").select("*").order("sort_order")
    ]);

    const bad=r.find(x=>x.error);

    if(bad)
        throw Error(bad.error.message);

    state.content=new Map((r[0].data||[]).map(x=>[x.key,x]));
    state.media=new Map((r[1].data||[]).map(x=>[x.key,x]));
    state.links=new Map((r[2].data||[]).map(x=>[x.key,x]));
    state.settings=new Map((r[3].data||[]).map(x=>[x.key,x.value]));
    state.sections=r[4].data||[];
    state.blocks=r[5].data||[];
}

const cv=(k,l)=>state.content.get(k)?.[l]??state.src[l]?.[k]??(l==="ka"?state.defaults[k]||"":"");
const sv=(k,fb="")=>state.settings.has(k)?state.settings.get(k):fb;

function panel(){
    let nav=document.querySelector(".admin-navigation");
    let main=document.querySelector(".admin-main");

    if(!nav||!main)
        return false;

    if(!document.getElementById("paataCmsNav")){
        let b=document.createElement("button");
        b.className="admin-nav-button";
        b.type="button";
        b.id="paataCmsNav";
        b.textContent="სრული საიტი";
        b.onclick=()=>openPanel();
        nav.appendChild(b);
    }

    if(!document.getElementById("paataCmsPanel")){
        let p=document.createElement("section");
        p.id="paataCmsPanel";
        p.className="admin-panel";

        p.innerHTML=`
            <div class="panel-heading">
                <div>
                    <p class="section-label">CMS</p>
                    <h3>საიტის სრული მართვა</h3>
                </div>

                <p style="max-width:560px;margin:0;color:var(--muted);line-height:1.7">
                    ყველა ტექსტი, ფოტო, ბმული, სექცია, უჯრა და მთავარი პარამეტრი ერთი ადგილიდან.
                </p>
            </div>

            <div
                id="paataCmsTabs"
                style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px"
            ></div>

            <p
                id="paataCmsStatus"
                class="form-status"
            ></p>

            <div id="paataCmsBody"></div>
        `;

        main.appendChild(p);
    }

    return true;
}

function openPanel(){
    document.querySelectorAll(".admin-nav-button")
        .forEach(x=>x.classList.remove("active"));

    document.querySelectorAll(".admin-panel")
        .forEach(x=>x.classList.remove("active"));

    document.getElementById("paataCmsNav")?.classList.add("active");
    document.getElementById("paataCmsPanel")?.classList.add("active");

    if(typeof adminPageTitle!=="undefined"&&adminPageTitle)
        adminPageTitle.textContent="სრული საიტი";
}

function tabs(){
    let e=document.getElementById("paataCmsTabs");

    if(!e)
        return;

    e.innerHTML=[
        ["content","ტექსტები"],
        ["sections","სექციები"],
        ["blocks","უჯრები / ბლოკები"],
        ["media","ფოტოები"],
        ["links","ბმულები"],
        ["settings","პარამეტრები"]
    ]
    .map(([k,v])=>`
        <button
            class="primary-button"
            type="button"
            data-cmst="${k}"
            style="opacity:${state.tab===k?1:.72}"
        >
            ${v}
        </button>
    `)
    .join("");

    e.querySelectorAll("[data-cmst]").forEach(b=>{
        b.onclick=()=>{
            state.tab=b.dataset.cmst;
            tabs();
            render();
        };
    });
}

async function saveContent(k){
    let p={
        key:k,
        ka:document.getElementById(`c-ka-${k}`).value,
        en:document.getElementById(`c-en-${k}`).value,
        ru:document.getElementById(`c-ru-${k}`).value
    };

    let r=await db
        .from("site_content")
        .upsert(p,{onConflict:"key"})
        .select("*")
        .single();

    if(r.error)
        throw r.error;

    state.content.set(k,r.data);
}

function content(){
    let b=document.getElementById("paataCmsBody");

    b.innerHTML=`
        ${inp("ძებნა","cmsTextSearch","")}
        <div
            class="content-list"
            id="cmsTextList"
            style="margin-top:14px"
        ></div>
    `;

    let search=document.getElementById("cmsTextSearch");
    let list=document.getElementById("cmsTextList");

    function paint(){
        let q=txt(search.value).toLowerCase();

        let rows=state.keys.filter(k=>
            !q ||
            (
                `${k} ${cv(k,"ka")} ${cv(k,"en")} ${cv(k,"ru")}`
            )
            .toLowerCase()
            .includes(q)
        );

        list.innerHTML=rows.map(k=>`
            <article
                class="content-item"
                style="display:block"
            >
                <div class="content-body">

                    <h4>${esc(k)}</h4>

                    <div
                        style="
                            display:grid;
                            grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                            gap:10px;
                            margin-top:10px
                        "
                    >
                        ${area("ქართული",`c-ka-${k}`,cv(k,"ka"),3)}
                        ${area("English",`c-en-${k}`,cv(k,"en"),3)}
                        ${area("Русский",`c-ru-${k}`,cv(k,"ru"),3)}
                    </div>

                    <div
                        class="item-actions"
                        style="margin-top:10px;justify-content:flex-end"
                    >
                        <button
                            class="edit-button"
                            type="button"
                            data-csave="${esc(k)}"
                        >
                            შენახვა
                        </button>
                    </div>

                </div>
            </article>
        `).join("");

        list.querySelectorAll("[data-csave]").forEach(x=>{
            x.onclick=async()=>{
                try{
                    await saveContent(x.dataset.csave);

                    x.textContent="შენახულია ✓";
                    status(`შენახულია: ${x.dataset.csave}`,"success");

                    setTimeout(()=>{
                        x.textContent="შენახვა";
                    },1200);

                }catch(e){
                    status(
                        e.message||"ტექსტის შენახვა ვერ მოხერხდა.",
                        "error"
                    );
                }
            };
        });
    }

    paint();

    search.oninput=paint;
}

const sectionMap={
    home:["heroTitle","heroText"],
    about:["aboutTitle","aboutLead"],
    biography:["biographyTitle","biographyIntro"],
    mission:["missionTitle","missionIntro"],
    practice:["practiceTitle","practiceIntro"],
    cases:["casesTitle","casesIntro"],
    resources:["resourcesTitle","resourcesIntro"],
    updates:["updatesTitle","updatesIntro"],
    faq:["faqTitle","faqIntro"],
    usefulLinks:["linksTitle","linksIntro"],
    contact:["contactTitle","contactIntro"]
};

async function saveSection(id){
    let s=state.sections.find(x=>x.id===id);

    if(!s)
        return;

    let p={
        title_ka:document.getElementById(`s-ka-${id}`).value,
        title_en:document.getElementById(`s-en-${id}`).value,
        title_ru:document.getElementById(`s-ru-${id}`).value,

        subtitle_ka:document.getElementById(`ss-ka-${id}`).value,
        subtitle_en:document.getElementById(`ss-en-${id}`).value,
        subtitle_ru:document.getElementById(`ss-ru-${id}`).value,

        is_visible:document.getElementById(`s-show-${id}`).checked,
        sort_order:Number(
            document.getElementById(`s-order-${id}`).value
        )||0,

        css_class:
            document.getElementById(`s-class-${id}`).value.trim()
            ||"section"
    };

    let r=await db
        .from("site_sections")
        .update(p)
        .eq("id",id);

    if(r.error)
        throw r.error;

    s=Object.assign(s,p);

    let keys=sectionMap[id];

    if(keys){
        let vals=[
            [p.title_ka,p.title_en,p.title_ru],
            [p.subtitle_ka,p.subtitle_en,p.subtitle_ru]
        ];

        for(let n=0;n<2;n++){
            let k=keys[n];

            if(k){
                let x=await db
                    .from("site_content")
                    .upsert(
                        {
                            key:k,
                            ka:vals[n][0],
                            en:vals[n][1],
                            ru:vals[n][2]
                        },
                        {onConflict:"key"}
                    );

                if(x.error)
                    throw x.error;
            }
        }
    }
}

async function sections(){
    let b=document.getElementById("paataCmsBody");

    b.innerHTML=`
        <div
            class="panel-heading"
            style="margin-bottom:18px"
        >
            <div>
                <p class="section-label">STRUCTURE</p>
                <h3>სექციები</h3>
            </div>

            <button
                class="primary-button"
                id="addSection"
                type="button"
            >
                + ახალი სექცია
            </button>
        </div>

        <div
            class="content-list"
            id="cmsSections"
        ></div>
    `;

    let list=document.getElementById("cmsSections");
    let arr=[...state.sections].sort(
        (a,b)=>a.sort_order-b.sort_order
    );

    list.innerHTML=arr.map((s,i)=>`
        <article
            class="content-item"
            style="display:block"
            draggable="true"
            data-drag-section="${esc(s.id)}"
        >
            <div class="content-body">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        gap:12px;
                        flex-wrap:wrap
                    "
                >
                    <div>
                        <h4>${esc(s.id)}</h4>
                        <p>${esc(s.title_ka||"")}</p>
                    </div>

                    <div class="content-meta">
                        <span
                            class="badge ${s.is_visible?"published":"draft"}"
                        >
                            ${s.is_visible?"ჩანს":"დამალულია"}
                        </span>

                        ${
                            s.is_custom
                            ?`<span class="badge">CUSTOM</span>`
                            :""
                        }
                    </div>
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${inp("ქართული სათაური",`s-ka-${s.id}`,s.title_ka)}
                    ${inp("English title",`s-en-${s.id}`,s.title_en)}
                    ${inp("Русский заголовок",`s-ru-${s.id}`,s.title_ru)}
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${inp("ქართული აღწერა",`ss-ka-${s.id}`,s.subtitle_ka)}
                    ${inp("English subtitle",`ss-en-${s.id}`,s.subtitle_en)}
                    ${inp("Русский subtitle",`ss-ru-${s.id}`,s.subtitle_ru)}
                </div>

                <div
                    style="
                        display:flex;
                        gap:10px;
                        align-items:end;
                        flex-wrap:wrap;
                        margin-top:10px
                    "
                >
                    <label class="checkbox-row">
                        <input
                            type="checkbox"
                            id="s-show-${s.id}"
                            ${s.is_visible?"checked":""}
                        >
                        <span>გამოჩნდეს</span>
                    </label>

                    ${inp(
                        "Order",
                        `s-order-${s.id}`,
                        s.sort_order,
                        "number",
                        'style="max-width:120px"'
                    )}

                    ${inp(
                        "CSS class",
                        `s-class-${s.id}`,
                        s.css_class||"section"
                    )}
                </div>

                <div
                    class="item-actions"
                    style="margin-top:10px;justify-content:flex-end"
                >
                    ${
                        i
                        ?`<button
                            class="edit-button"
                            data-sup="${esc(s.id)}"
                            type="button"
                        >↑</button>`
                        :""
                    }

                    ${
                        i<arr.length-1
                        ?`<button
                            class="edit-button"
                            data-sdn="${esc(s.id)}"
                            type="button"
                        >↓</button>`
                        :""
                    }

                    <button
                        class="edit-button"
                        data-ssave="${esc(s.id)}"
                        type="button"
                    >
                        შენახვა
                    </button>

                    ${
                        s.is_custom
                        ?`<button
                            class="delete-button"
                            data-sdel="${esc(s.id)}"
                            type="button"
                        >წაშლა</button>`
                        :""
                    }
                </div>

            </div>
        </article>
    `).join("");

    document.getElementById("addSection").onclick=async()=>{
        let t=prompt(
            "ახალი სექციის სათაური ქართულად:",
            "ახალი სექცია"
        );

        if(!t)
            return;

        let id=`custom-${Date.now().toString(36)}`;

        let o=Math.max(
            0,
            ...state.sections.map(
                x=>Number(x.sort_order)||0
            )
        )+10;

        let r=await db
            .from("site_sections")
            .insert({
                id,
                title_ka:t,
                title_en:t,
                title_ru:t,
                subtitle_ka:"",
                subtitle_en:"",
                subtitle_ru:"",
                is_visible:true,
                is_custom:true,
                css_class:"section",
                sort_order:o
            })
            .select("*")
            .single();

        if(r.error)
            return status(r.error.message,"error");

        await dbLoad();
        render();

        status(
            "ახალი სექცია შეიქმნა.",
            "success"
        );
    };

    list.querySelectorAll("[data-ssave]").forEach(x=>{
        x.onclick=async()=>{
            try{
                await saveSection(x.dataset.ssave);
                await dbLoad();
                sections();

                status(
                    "სექცია შენახულია.",
                    "success"
                );
            }catch(e){
                status(e.message,"error");
            }
        };
    });

    list.querySelectorAll("[data-sup],[data-sdn]").forEach(x=>{
        x.onclick=async()=>{
            let id=x.dataset.sup||x.dataset.sdn;
            let dir=x.dataset.sup?-1:1;

            let a=[...state.sections]
                .sort((p,q)=>p.sort_order-q.sort_order);

            let i=a.findIndex(p=>p.id===id);
            let o=a[i+dir];

            if(!o)
                return;

            let n=a[i].sort_order;
            let c=o.sort_order;

            let r1=await db
                .from("site_sections")
                .update({sort_order:c})
                .eq("id",a[i].id);

            let r2=await db
                .from("site_sections")
                .update({sort_order:n})
                .eq("id",o.id);

            if(r1.error||r2.error)
                return status(
                    (r1.error||r2.error).message,
                    "error"
                );

            await dbLoad();
            sections();
        };
    });

    let draggedSection = null;

    list.querySelectorAll("[data-drag-section]").forEach(el=>{
        el.addEventListener("dragstart",()=>{
            draggedSection = el;
            el.style.opacity = "0.55";
        });

        el.addEventListener("dragend",()=>{
            el.style.opacity = "";
            draggedSection = null;
        });

        el.addEventListener("dragover",e=>{
            e.preventDefault();
        });

        el.addEventListener("drop",async e=>{
            e.preventDefault();

            if(!draggedSection || draggedSection===el)
                return;

            const items=[...list.querySelectorAll("[data-drag-section]")];
            const from=items.indexOf(draggedSection);
            const to=items.indexOf(el);

            if(from<0 || to<0)
                return;

            if(from<to)
                el.after(draggedSection);
            else
                el.before(draggedSection);

            const ordered=[...list.querySelectorAll("[data-drag-section]")];

            for(let i=0;i<ordered.length;i++){
                const id=ordered[i].dataset.dragSection;
                const r=await db
                    .from("site_sections")
                    .update({sort_order:(i+1)*10})
                    .eq("id",id);

                if(r.error){
                    status(r.error.message,"error");
                    await dbLoad();
                    sections();
                    return;
                }
            }

            await dbLoad();
            sections();
            status("სექციების რიგი განახლდა.","success");
        });
    });

    list.querySelectorAll("[data-sdel]").forEach(x=>{
        x.onclick=async()=>{
            if(!confirm(
                "ნამდვილად წავშალოთ სექცია?"
            ))
                return;

            let r=await db
                .from("site_sections")
                .delete()
                .eq("id",x.dataset.sdel);

            if(r.error)
                return status(
                    r.error.message,
                    "error"
                );

            await dbLoad();
            sections();

            status(
                "სექცია წაიშალა.",
                "success"
            );
        };
    });
}

function blockVal(b,l,f){
    return b?.[l]?.[f]??"";
}

function bimgKey(sec,i){
    return sec==="practice"
        ?[
            "criminalPracticeImage",
            "civilPracticeImage",
            "administrativePracticeImage"
        ][i]||""
        :sec==="resources"
        ?`resourceImage${i+1}`
        :"";
}

function blinkKey(sec,i){
    return sec==="resources"
        ?`link_${String(19+i).padStart(3,"0")}`
        :sec==="usefulLinks"
        ?`link_${String(26+i).padStart(3,"0")}`
        :"";
}

async function saveBlock(id){
    let b=state.blocks.find(x=>x.id===id);

    if(!b)
        return;

    let image=
        document.getElementById(`bi-${id}`)
        .value.trim()
        ||null;

    let f=document.getElementById(`bf-${id}`)
        ?.files?.[0];

    if(f&&typeof uploadFile==="function")
        image=await uploadFile(
            f,
            `site-blocks/${b.section_id}`
        );

    let payload={
        section_id:
            document.getElementById("blockSection")?.value
            ||b.section_id,

        type:
            document.getElementById(`bt-${id}`).value
            ||"card",

        is_published:
            document.getElementById(`bp-${id}`).checked,

        ka:{
            title:document.getElementById(`bka-${id}`).value,
            body:document.getElementById(`bkab-${id}`).value,
            badge:document.getElementById(`bkad-${id}`).value,
            button:document.getElementById(`bkabu-${id}`).value
        },

        en:{
            title:document.getElementById(`ben-${id}`).value,
            body:document.getElementById(`benb-${id}`).value,
            badge:document.getElementById(`benbd-${id}`).value,
            button:document.getElementById(`benbu-${id}`).value
        },

        ru:{
            title:document.getElementById(`bru-${id}`).value,
            body:document.getElementById(`brub-${id}`).value,
            badge:document.getElementById(`brubd-${id}`).value,
            button:document.getElementById(`brubu-${id}`).value
        },

        image_url:image,

        link_url:
            document.getElementById(`bl-${id}`)
            .value.trim()
            ||null,

        open_new_tab:
            document.getElementById(`bn-${id}`).checked,

        metadata:{
            ...(b.metadata||{}),
            number:
                document.getElementById(`bnum-${id}`)
                .value.trim()
        }
    };

    let r=await db
        .from("site_blocks")
        .update(payload)
        .eq("id",id);

    if(r.error)
        throw r.error;

    let ix=state.blocks
        .filter(x=>x.section_id===b.section_id)
        .sort((a,c)=>a.sort_order-c.sort_order)
        .findIndex(x=>x.id===id);

    let ik=bimgKey(
        b.section_id,
        ix
    );

    let lk=blinkKey(
        b.section_id,
        ix
    );

    if(ik){
        const mediaResult = await db
            .from("site_media")
            .upsert(
                {
                    key:ik,
                    label:ik,
                    url:image||""
                },
                {onConflict:"key"}
            );

        if(mediaResult.error)
            throw mediaResult.error;
    }

    if(lk){
        const linkResult = await db
            .from("site_links")
            .upsert(
                {
                    key:lk,
                    label:lk,
                    url:payload.link_url||""
                },
                {onConflict:"key"}
            );

        if(linkResult.error)
            throw linkResult.error;
    }
}

async function blocks(){
    let b=document.getElementById("paataCmsBody");

    let ops=state.sections
        .filter(s=>
            s.is_custom ||
            [
                "mission",
                "practice",
                "resources",
                "faq",
                "usefulLinks"
            ].includes(s.id)
        )
        .sort((a,c)=>a.sort_order-c.sort_order);

    if(!state.sections.some(x=>x.id===state.section))
        state.section=ops[0]?.id||"mission";

    let rows=state.blocks
        .filter(x=>x.section_id===state.section)
        .sort((a,c)=>a.sort_order-c.sort_order);

    b.innerHTML=`
        <div
            class="panel-heading"
            style="margin-bottom:18px"
        >
            <div>
                <p class="section-label">CONTENT BUILDER</p>
                <h3>უჯრები / ბლოკები</h3>
            </div>

            <button
                class="primary-button"
                id="addBlock"
                type="button"
            >
                + ახალი უჯრა
            </button>
        </div>

        <select
            id="blockSection"
            style="margin-bottom:14px"
        >
            ${
                ops.map(s=>`
                    <option
                        value="${esc(s.id)}"
                        ${s.id===state.section?"selected":""}
                    >
                        ${esc(s.id)} — ${esc(s.title_ka||"")}
                    </option>
                `).join("")
            }
        </select>

        <div
            class="content-list"
            id="cmsBlocks"
        ></div>
    `;

    document.getElementById("blockSection").onchange=e=>{
        state.section=e.target.value;
        blocks();
    };

    let list=document.getElementById("cmsBlocks");

    list.innerHTML=rows.map((x,i)=>`
        <article
            class="content-item"
            style="display:block"
            draggable="true"
            data-drag-block="${x.id}"
        >
            <div class="content-body">

                <h4>
                    უჯრა #${i+1} — ${esc(x.type)}
                </h4>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${area(
                        "KA title",
                        `bka-${x.id}`,
                        blockVal(x,"ka","title"),
                        2
                    )}

                    ${area(
                        "KA text",
                        `bkab-${x.id}`,
                        blockVal(x,"ka","body"),
                        3
                    )}

                    ${inp(
                        "KA badge",
                        `bkad-${x.id}`,
                        blockVal(x,"ka","badge")
                    )}

                    ${inp(
                        "KA button",
                        `bkabu-${x.id}`,
                        blockVal(x,"ka","button")
                    )}
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${area(
                        "EN title",
                        `ben-${x.id}`,
                        blockVal(x,"en","title"),
                        2
                    )}

                    ${area(
                        "EN text",
                        `benb-${x.id}`,
                        blockVal(x,"en","body"),
                        3
                    )}

                    ${inp(
                        "EN badge",
                        `benbd-${x.id}`,
                        blockVal(x,"en","badge")
                    )}

                    ${inp(
                        "EN button",
                        `benbu-${x.id}`,
                        blockVal(x,"en","button")
                    )}
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${area(
                        "RU title",
                        `bru-${x.id}`,
                        blockVal(x,"ru","title"),
                        2
                    )}

                    ${area(
                        "RU text",
                        `brub-${x.id}`,
                        blockVal(x,"ru","body"),
                        3
                    )}

                    ${inp(
                        "RU badge",
                        `brubd-${x.id}`,
                        blockVal(x,"ru","badge")
                    )}

                    ${inp(
                        "RU button",
                        `brubu-${x.id}`,
                        blockVal(x,"ru","button")
                    )}
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px;
                        margin-top:10px
                    "
                >
                    ${inp(
                        "ფოტოს URL",
                        `bi-${x.id}`,
                        x.image_url||""
                    )}

                    ${inp(
                        "ბმული",
                        `bl-${x.id}`,
                        x.link_url||""
                    )}

                    ${inp(
                        "ტიპი",
                        `bt-${x.id}`,
                        x.type||"card"
                    )}

                    ${inp(
                        "ნომერი / კოდი",
                        `bnum-${x.id}`,
                        x.metadata?.number||x.metadata?.code||""
                    )}
                </div>

                <label style="margin-top:10px">
                    <span>ახალი ფოტო</span>
                    <input
                        id="bf-${x.id}"
                        type="file"
                        accept="image/*"
                    >
                </label>

                <div
                    style="
                        display:flex;
                        gap:14px;
                        flex-wrap:wrap;
                        margin-top:10px
                    "
                >
                    <label class="checkbox-row">
                        <input
                            type="checkbox"
                            id="bp-${x.id}"
                            ${x.is_published?"checked":""}
                        >
                        <span>გამოქვეყნდეს</span>
                    </label>

                    <label class="checkbox-row">
                        <input
                            type="checkbox"
                            id="bn-${x.id}"
                            ${x.open_new_tab?"checked":""}
                        >
                        <span>ახალ ფანჯარაში</span>
                    </label>
                </div>

                <div
                    class="item-actions"
                    style="margin-top:10px;justify-content:flex-end"
                >
                    ${
                        i
                        ?`<button
                            class="edit-button"
                            type="button"
                            data-bup="${x.id}"
                        >↑</button>`
                        :""
                    }

                    ${
                        i<rows.length-1
                        ?`<button
                            class="edit-button"
                            type="button"
                            data-bdn="${x.id}"
                        >↓</button>`
                        :""
                    }

                    <button
                        class="edit-button"
                        type="button"
                        data-bsave="${x.id}"
                    >
                        შენახვა
                    </button>

                    <button
                        class="delete-button"
                        type="button"
                        data-bdel="${x.id}"
                    >
                        წაშლა
                    </button>
                </div>

            </div>
        </article>
    `).join("");

    document.getElementById("addBlock").onclick=async()=>{
        let t=prompt(
            "ახალი უჯრის ქართული სათაური:",
            "ახალი უჯრა"
        );

        if(!t)
            return;

        let o=Math.max(
            0,
            ...rows.map(
                x=>Number(x.sort_order)||0
            )
        )+10;

        const selectedSection =
            document.getElementById("blockSection")?.value
            || state.section;

        if(!selectedSection || !state.sections.some(x=>x.id===selectedSection)) {
            return status(
                "ჯერ აირჩიეთ სწორი სექცია.",
                "error"
            );
        }

        state.section = selectedSection;

        const r=await db
            .from("site_blocks")
            .insert({
                section_id:selectedSection,
                type:"card",
                sort_order:o,
                is_published:true,
                ka:{
                    title:t,
                    body:"",
                    badge:"",
                    button:""
                },
                en:{
                    title:t,
                    body:"",
                    badge:"",
                    button:""
                },
                ru:{
                    title:t,
                    body:"",
                    badge:"",
                    button:""
                },
                metadata:{
                    number:String(o/10).padStart(2,"0")
                }
            });

        if(r.error)
            return status(
                r.error.message,
                "error"
            );

        await dbLoad();
        blocks();

        status(
            "ახალი უჯრა შეიქმნა.",
            "success"
        );
    };

    list.querySelectorAll("[data-bsave]").forEach(x=>{
        x.onclick=async()=>{
            try{
                await saveBlock(x.dataset.bsave);
                await dbLoad();
                blocks();

                status(
                    "უჯრა შენახულია.",
                    "success"
                );
            }catch(e){
                status(
                    e.message,
                    "error"
                );
            }
        };
    });

    list.querySelectorAll("[data-bup],[data-bdn]").forEach(x=>{
        x.onclick=async()=>{
            let id=x.dataset.bup||x.dataset.bdn;
            let dir=x.dataset.bup?-1:1;

            let i=rows.findIndex(
                q=>q.id===id
            );

            let o=rows[i+dir];

            if(!o)
                return;

            let a=rows[i].sort_order;
            let c=o.sort_order;

            let r1=await db
                .from("site_blocks")
                .update({sort_order:c})
                .eq("id",rows[i].id);

            let r2=await db
                .from("site_blocks")
                .update({sort_order:a})
                .eq("id",o.id);

            if(r1.error||r2.error)
                return status(
                    (r1.error||r2.error).message,
                    "error"
                );

            await dbLoad();
            blocks();
        };
    });

    let draggedBlock = null;

    list.querySelectorAll("[data-drag-block]").forEach(el=>{
        el.addEventListener("dragstart",()=>{
            draggedBlock = el;
            el.style.opacity = "0.55";
        });

        el.addEventListener("dragend",()=>{
            el.style.opacity = "";
            draggedBlock = null;
        });

        el.addEventListener("dragover",e=>{
            e.preventDefault();
        });

        el.addEventListener("drop",async e=>{
            e.preventDefault();

            if(!draggedBlock || draggedBlock===el)
                return;

            const items=[...list.querySelectorAll("[data-drag-block]")];
            const from=items.indexOf(draggedBlock);
            const to=items.indexOf(el);

            if(from<0 || to<0)
                return;

            if(from<to)
                el.after(draggedBlock);
            else
                el.before(draggedBlock);

            const ordered=[...list.querySelectorAll("[data-drag-block]")];
            const sec=document.getElementById("blockSection")?.value || state.section;

            for(let i=0;i<ordered.length;i++){
                const id=ordered[i].dataset.dragBlock;
                const r=await db
                    .from("site_blocks")
                    .update({sort_order:(i+1)*10, section_id:sec})
                    .eq("id",id);

                if(r.error){
                    status(r.error.message,"error");
                    await dbLoad();
                    blocks();
                    return;
                }
            }

            await dbLoad();
            blocks();
            status("უჯრების რიგი განახლდა.","success");
        });
    });

    list.querySelectorAll("[data-bdel]").forEach(x=>{
        x.onclick=async()=>{
            if(!confirm(
                "ნამდვილად წავშალოთ ეს უჯრა?"
            ))
                return;

            let r=await db
                .from("site_blocks")
                .delete()
                .eq("id",x.dataset.bdel);

            if(r.error)
                return status(
                    r.error.message,
                    "error"
                );

            await dbLoad();
            blocks();

            status(
                "უჯრა წაიშალა.",
                "success"
            );
        };
    });
}

async function media(){
    let b=document.getElementById("paataCmsBody");

    b.innerHTML=`
        <div class="panel-heading">
            <div>
                <p class="section-label">MEDIA</p>
                <h3>ფოტოები</h3>
            </div>
        </div>

        <div
            class="content-list"
            id="cmsMedia"
        ></div>
    `;

    let list=document.getElementById("cmsMedia");

    list.innerHTML=state.images.map(im=>{
        let u=state.media.get(im.key)?.url??im.src;

        return `
            <article class="content-item">

                <div class="content-thumb">
                    ${
                        u
                        ?`<img
                            src="${esc(u)}"
                            alt=""
                        >`
                        :""
                    }
                </div>

                <div class="content-body">

                    <h4>${esc(im.key)}</h4>

                    <p>
                        ${esc(
                            im.i18nAlt||
                            im.alt||
                            `ფოტო #${im.i+1}`
                        )}
                    </p>

                    <div
                        style="
                            display:grid;
                            grid-template-columns:2fr 1fr;
                            gap:10px;
                            margin-top:8px
                        "
                    >
                        ${inp(
                            "URL",
                            `murl-${im.key}`,
                            u,
                            "url"
                        )}

                        <label>
                            <span>ახალი ფოტო</span>
                            <input
                                id="mfile-${im.key}"
                                type="file"
                                accept="image/*"
                            >
                        </label>
                    </div>

                    <div
                        class="item-actions"
                        style="margin-top:8px;justify-content:flex-end"
                    >
                        <button
                            class="edit-button"
                            data-ms="${im.key}"
                            type="button"
                        >
                            შენახვა
                        </button>

                        <button
                            class="delete-button"
                            data-md="${im.key}"
                            type="button"
                        >
                            წაშლა
                        </button>
                    </div>

                </div>
            </article>
        `;
    }).join("");

    list.querySelectorAll("[data-ms]").forEach(x=>{
        x.onclick=async()=>{
            try{
                let k=x.dataset.ms;

                let u=document
                    .getElementById(`murl-${k}`)
                    .value
                    .trim();

                let f=document
                    .getElementById(`mfile-${k}`)
                    ?.files?.[0];

                if(f&&typeof uploadFile==="function")
                    u=await uploadFile(
                        f,
                        "site-media"
                    );

                let r=await db
                    .from("site_media")
                    .upsert(
                        {
                            key:k,
                            label:k,
                            url:u
                        },
                        {onConflict:"key"}
                    )
                    .select("*")
                    .single();

                if(r.error)
                    throw r.error;

                state.media.set(
                    k,
                    r.data
                );

                media();

                status(
                    "ფოტო შენახულია.",
                    "success"
                );
            }catch(e){
                status(
                    e.message,
                    "error"
                );
            }
        };
    });

    list.querySelectorAll("[data-md]").forEach(x=>{
        x.onclick=async()=>{
            if(!confirm(
                "ფოტო გავთიშოთ?"
            ))
                return;

            let k=x.dataset.md;

            let r=await db
                .from("site_media")
                .upsert(
                    {
                        key:k,
                        label:k,
                        url:""
                    },
                    {onConflict:"key"}
                );

            if(r.error)
                return status(
                    r.error.message,
                    "error"
                );

            await dbLoad();
            media();

            status(
                "ფოტო გაითიშა.",
                "success"
            );
        };
    });
}

async function links(){
    let b=document.getElementById("paataCmsBody");

    b.innerHTML=`
        <div class="panel-heading">
            <div>
                <p class="section-label">LINKS</p>
                <h3>ბმულები</h3>
            </div>
        </div>

        <div
            class="content-list"
            id="cmsLinks"
        ></div>
    `;

    let list=document.getElementById("cmsLinks");

    list.innerHTML=state.anchors.map(a=>{
        let u=state.links.get(a.key)?.url??a.href;

        return `
            <article
                class="content-item"
                style="display:block"
            >
                <div class="content-body">

                    <h4>
                        ${esc(a.key)} —
                        ${esc(a.label.slice(0,80))}
                    </h4>

                    <p>
                        ${
                            a.i18n
                            ?`ტექსტი: ${esc(a.i18n)}`
                            :""
                        }
                    </p>

                    <div
                        style="
                            display:grid;
                            grid-template-columns:1fr auto;
                            gap:10px;
                            align-items:end;
                            margin-top:8px
                        "
                    >
                        ${inp(
                            "URL / href",
                            `lurl-${a.key}`,
                            u
                        )}

                        <button
                            class="edit-button"
                            data-ls="${a.key}"
                            type="button"
                        >
                            შენახვა
                        </button>
                    </div>

                </div>
            </article>
        `;
    }).join("");

    list.querySelectorAll("[data-ls]").forEach(x=>{
        x.onclick=async()=>{
            let k=x.dataset.ls;

            let a=state.anchors.find(
                q=>q.key===k
            );

            let u=document
                .getElementById(`lurl-${k}`)
                .value
                .trim();

            let r=await db
                .from("site_links")
                .upsert(
                    {
                        key:k,
                        label:a?.label||k,
                        url:u
                    },
                    {onConflict:"key"}
                );

            if(r.error)
                return status(
                    r.error.message,
                    "error"
                );

            await dbLoad();
            links();

            status(
                "ბმული შენახულია.",
                "success"
            );
        };
    });
}

async function settings(){
    let b=document.getElementById("paataCmsBody");

    b.innerHTML=`
        <div class="editor-card">

            <form id="cmsSettings">

                ${inp(
                    "საიტის სათაური",
                    "st-title",
                    sv(
                        "site_title",
                        "პაატა შავაძე | ადვოკატი"
                    )
                )}

                ${area(
                    "SEO description",
                    "st-desc",
                    sv("meta_description",""),
                    4
                )}

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px
                    "
                >
                    ${inp(
                        "ტელეფონი",
                        "st-phone",
                        sv(
                            "phone",
                            "+995599114141"
                        )
                    )}

                    ${inp(
                        "ელფოსტა",
                        "st-email",
                        sv(
                            "email",
                            "Paatashavadze30@gmail.com"
                        ),
                        "email"
                    )}

                    ${inp(
                        "WhatsApp",
                        "st-wa",
                        sv(
                            "whatsapp",
                            "995599114141"
                        )
                    )}
                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
                        gap:10px
                    "
                >
                    ${inp(
                        "Theme color",
                        "st-color",
                        sv(
                            "theme_color",
                            "#39aee8"
                        )
                    )}

                    ${inp(
                        "Favicon URL",
                        "st-favicon",
                        sv(
                            "favicon_url",
                            ""
                        ),
                        "url"
                    )}
                </div>

                ${area(
                    "Custom CSS",
                    "st-css",
                    sv("custom_css",""),
                    7
                )}

                <button
                    class="primary-button"
                    type="submit"
                >
                    შენახვა
                </button>

            </form>

        </div>
    `;

    document.getElementById("cmsSettings").onsubmit=async e=>{
        e.preventDefault();

        let m={
            site_title:
                document.getElementById("st-title").value,

            meta_description:
                document.getElementById("st-desc").value,

            phone:
                document.getElementById("st-phone").value,

            email:
                document.getElementById("st-email").value,

            whatsapp:
                document.getElementById("st-wa").value,

            theme_color:
                document.getElementById("st-color").value,

            favicon_url:
                document.getElementById("st-favicon").value,

            custom_css:
                document.getElementById("st-css").value
        };

        try{
            for(let k of Object.keys(m)){
                let r=await db
                    .from("site_settings")
                    .upsert(
                        {
                            key:k,
                            value:m[k]
                        },
                        {onConflict:"key"}
                    );

                if(r.error)
                    throw r.error;

                state.settings.set(
                    k,
                    m[k]
                );
            }

            status(
                "პარამეტრები შენახულია.",
                "success"
            );

        }catch(e){
            status(
                e.message,
                "error"
            );
        }
    };
}

function render(){
    if(state.tab==="content")
        content();
    else if(state.tab==="sections")
        sections();
    else if(state.tab==="blocks")
        blocks();
    else if(state.tab==="media")
        media();
    else if(state.tab==="links")
        links();
    else
        settings();
}

async function init(){
    try{
        if(!panel())
            return;

        await Promise.all([
            source(),
            dbLoad()
        ]);

        tabs();
        render();

        status(
            "CMS მზადაა.",
            "success"
        );

    }catch(e){
        console.error(e);

        status(
            e.message||"CMS ვერ ჩაიტვირთა.",
            "error"
        );
    }
}

if(document.readyState==="loading")
    document.addEventListener(
        "DOMContentLoaded",
        init,
        {once:true}
    );
else
    init();

})();
