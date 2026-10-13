"use strict";

const WHATSAPP_NUMBER = "995599114141";

const translations = {
    ka: {
        pageTitle: "პაატა შავაძე | ადვოკატი ბათუმში",
        skipLink: "მთავარ შინაარსზე გადასვლა",
        topbarNote: "კონსულტაცია წინასწარი შეთანხმებით",
        brandName: "პაატა შავაძე",
        brandRole: "ადვოკატი • სამართლის დოქტორი",
        navAbout: "პაატა შავაძე",
        navPractice: "პრაქტიკა",
        navCases: "საქმეები",
        navResources: "რესურსები",
        navUpdates: "სიახლეები",
        navContact: "კონტაქტი",
        headerCta: "კონსულტაცია",

        heroEyebrow: "დაცვა • წარმომადგენლობა • სამართლებრივი სტრატეგია",
        heroTitle: "ადვოკატი ბათუმში — თქვენი უფლებების პროფესიული დაცვა",
        heroCredential: "სამართლის დოქტორი, პროფესორი, საქართველოს ეროვნული აკადემიის ნამდვილი წევრი — აკადემიკოსი",
        heroText: "ინდივიდუალური სამართლებრივი სტრატეგია, კონფიდენციალურობა და თქვენი ინტერესების პასუხისმგებლიანი წარმომადგენლობა.",
        bookConsultation: "კონსულტაციის დაჯავშნა",
        writeWhatsapp: "WhatsApp-ზე მოწერა",

        trustOne: "კონფიდენციალურობა",
        trustTwo: "ინდივიდუალური მიდგომა",
        trustThree: "პროფესიული წარმომადგენლობა",

        profileLabel: "ადვოკატი",
        profileName: "პაატა შავაძე",
        profileRole: "სამართლის დოქტორი • პროფესორი • აკადემიკოსი",
        mobileLabel: "მობილური / WhatsApp",
        emailLabel: "ელფოსტა",
        paataPhotoAlt: "პაატა შავაძე",
        discoverMore: "გაიგეთ მეტი",

        aboutEyebrow: "პროფესიული პროფილი",
        aboutTitle: "ცოდნა, გამოცდილება და პასუხისმგებლობა თითოეულ საქმეში",
        aboutLead: "პაატა შავაძე არის ადვოკატი, სამართლის დოქტორი, პროფესორი და საქართველოს ეროვნული აკადემიის ნამდვილი წევრი — აკადემიკოსი.",
        aboutText: "პროფესიული საქმიანობის საფუძველია საქმის გარემოებების დეტალური შესწავლა, რისკების მკაფიო შეფასება, კლიენტისთვის შესაძლო სამართლებრივი გზების გასაგებად განმარტება და ინტერესების თანმიმდევრული დაცვა.",

        credentialOneTitle: "სამართლის დოქტორი",
        credentialOneText: "აკადემიური და პრაქტიკული სამართლებრივი გამოცდილება.",
        credentialTwoTitle: "პროფესორი",
        credentialTwoText: "სამართლის სწავლებისა და კვლევის პროფესიული გამოცდილება.",
        credentialThreeTitle: "აკადემიკოსი",
        credentialThreeText: "საქართველოს ეროვნული აკადემიის ნამდვილი წევრი.",

        missionEyebrow: "მისია და მიზნები",
        missionTitle: "სამართლიანი, გასაგები და შედეგზე ორიენტირებული სამართლებრივი დახმარება",
        missionIntro: "მთავარი ამოცანაა კლიენტის ინტერესების დაცვა პროფესიული ეთიკის, კონფიდენციალურობისა და კანონის უზენაესობის პრინციპებით.",
        missionOneTitle: "უფლებების დაცვა",
        missionOneText: "კლიენტის კანონიერი ინტერესების დაცვა საქმის ყველა შესაბამის ეტაპზე.",
        missionTwoTitle: "მკაფიო კომუნიკაცია",
        missionTwoText: "სამართლებრივი მდგომარეობისა და შესაძლო გზების მარტივად და ზუსტად განმარტება.",
        missionThreeTitle: "ინდივიდუალური სტრატეგია",
        missionThreeText: "ყოველი საქმისთვის გარემოებებზე მორგებული მოქმედების გეგმის შემუშავება.",

        practiceEyebrow: "სასამართლო პრაქტიკა",
        practiceTitle: "პრაქტიკის ძირითადი მიმართულებები",
        practiceIntro: "ანალიზი, მნიშვნელოვანი გადაწყვეტილებები და პრაქტიკული განმარტებები ეტაპობრივად დაემატება თითოეულ მიმართულებას.",
        courtPracticeLabel: "სასამართლო პრაქტიკა",

        criminalPracticeTitle: "სისხლის სამართალში",
        criminalPracticeText: "სისხლის სამართლის საქმეებზე მნიშვნელოვანი მიდგომებისა და გადაწყვეტილებების მიმოხილვა.",

        civilPracticeTitle: "სამოქალაქო სამართალში",
        civilPracticeText: "სამოქალაქო დავებზე მნიშვნელოვანი მიდგომებისა და გადაწყვეტილებების მიმოხილვა.",

        administrativePracticeTitle: "ადმინისტრაციულ სამართალში",
        administrativePracticeText: "ადმინისტრაციულ დავებზე მნიშვნელოვანი მიდგომებისა და გადაწყვეტილებების მიმოხილვა.",

        criminalImageAlt: "სასამართლოს სიმბოლო",
        civilImageAlt: "იურიდიული დოკუმენტები",
        administrativeImageAlt: "პროფესიული შეხვედრა",

        contentSoon: "მასალა მზადდება",
        officialPracticeTitle: "საქართველოს უზენაესი სასამართლოს გადაწყვეტილებები",
        officialPracticeText: "გადადით ოფიციალურ საძიებო და სასამართლო პრაქტიკის გვერდზე.",
        openOfficialSource: "ოფიციალური წყაროს გახსნა",

        casesEyebrow: "წარმატებული საქმეები",
        casesTitle: "გამოცდილება რეალური საქმეებიდან",
        casesIntro: "საქმეები გამოქვეყნდება მხოლოდ კონფიდენციალურობის დაცვით და ისეთი ფორმით, რომ კლიენტის პირადი მონაცემები არ გამჟღავნდეს.",

        caseCategoryCriminal: "სისხლის სამართალი",
        caseCategoryCivil: "სამოქალაქო სამართალი",
        caseCategoryAdministrative: "ადმინისტრაციული სამართალი",

        casePlaceholderTitle: "საქმის მოკლე აღწერა",
        casePlaceholderText: "საქმის გარემოებები, გამოყენებული სამართლებრივი სტრატეგია და მიღწეული შედეგი აქ განთავსდება.",
        caseMaterialPending: "მასალა დაემატება",
        casesDisclaimer: "აღნიშნული მასალები იქნება საინფორმაციო ხასიათის; წარსული შედეგი კონკრეტულ საქმეზე იგივე შედეგის გარანტიას არ წარმოადგენს.",

        resourcesEyebrow: "სამართლებრივი ბიბლიოთეკა",
        resourcesTitle: "კანონმდებლობა და პროფესიული რესურსები",
        resourcesIntro: "სწრაფი წვდომა კანონმდებლობაზე, აქტებზე, სასამართლოს ფორმებსა და პროფესიულ მასალებზე.",

        legislationTitle: "კანონმდებლობა",
        legislationText: "საქართველოს საკანონმდებლო მაცნეს ოფიციალური საძიებო სისტემა.",

        legalActsTitle: "სამართლებრივი აქტები",
        legalActsText: "იუსტიციის უმაღლესი საბჭოს გადაწყვეტილებები და აქტები.",

        courtFormsTitle: "სასამართლოს ფორმები",
        courtFormsText: "იუსტიციის უმაღლესი საბჭოს ოფიციალური სასამართლო ფორმები.",

        benchBarTitle: "ბენჩ-ბარი",
        benchBarText: "მოსამართლეებსა და ადვოკატებს შორის პროფესიული დიალოგის მასალები.",

        publicationsTitle: "პუბლიკაციები",
        publicationsText: "პაატა შავაძის სტატიები, კვლევები და პროფესიული ნაშრომები.",

        decisionsTitle: "სასამართლოს გადაწყვეტილებები",
        decisionsText: "უზენაესი სასამართლოს გადაწყვეტილებების ოფიციალური ბაზა.",

        openResource: "რესურსის გახსნა",
        viewSection: "განყოფილების ნახვა",

        updatesEyebrow: "მედია და შესაძლებლობები",
        updatesTitle: "სიახლეები, ვაკანსიები და პუბლიკაციები",
        updatesIntro: "განყოფილებები მზადაა რეალური მასალების ეტაპობრივად დასამატებლად.",

        newsLabel: "სიახლეები",
        newsPlaceholderTitle: "ახალი ამბების სათაური",
        newsPlaceholderText: "ოფისის სიახლეები, პროფესიული ღონისძიებები და მნიშვნელოვანი ინფორმაცია აქ გამოქვეყნდება.",

        vacanciesLabel: "ვაკანსიები",
        vacancyPlaceholderTitle: "ვაკანსიის განცხადება",
        vacancyPlaceholderText: "ახალი ვაკანსიის შემთხვევაში პოზიციის აღწერა და განაცხადის წესი აქ განთავსდება.",

        publicationLabel: "პუბლიკაცია",
        publicationPlaceholderTitle: "პუბლიკაციის სათაური",
        publicationPlaceholderText: "სტატიის, კვლევის ან პროფესიული ნაშრომის მოკლე აღწერა და ჩამოსატვირთი ფაილი აქ დაემატება.",

        faqEyebrow: "ხშირად დასმული შეკითხვები",
        faqTitle: "მოკლე პასუხები კონსულტაციამდე",
        faqIntro: "ზუსტი სამართლებრივი შეფასება შესაძლებელია მხოლოდ საქმის გარემოებებისა და დოკუმენტების გაცნობის შემდეგ.",
        askQuestion: "დასვით თქვენი შეკითხვა",

        faqOneQuestion: "როგორ დავჯავშნო კონსულტაცია?",
        faqOneAnswer: "დაგვიკავშირდით ტელეფონით, WhatsApp-ით, ელფოსტით ან შეავსეთ ქვემოთ მოცემული ფორმა. შეხვედრის დრო წინასწარ შეთანხმდება.",

        faqTwoQuestion: "რა დოკუმენტები უნდა მოვამზადო?",
        faqTwoAnswer: "მოამზადეთ საქმესთან დაკავშირებული გადაწყვეტილებები, ხელშეკრულებები, წერილები, შეტყობინებები და მნიშვნელოვანი თარიღების ჩამონათვალი.",

        faqThreeQuestion: "შესაძლებელია ონლაინ კონსულტაცია?",
        faqThreeAnswer: "კონსულტაციის ფორმატი — ოფისში ან დისტანციურად — წინასწარ შეთანხმდება საქმის საჭიროების მიხედვით.",

        faqFourQuestion: "ინფორმაცია კონფიდენციალურია?",
        faqFourAnswer: "ადვოკატთან პროფესიული ურთიერთობისას მოწოდებული ინფორმაცია მუშავდება კონფიდენციალურობის პრინციპის დაცვით.",

        faqFiveQuestion: "შეიძლება საქმის შედეგის წინასწარ გარანტირება?",
        faqFiveAnswer: "არა. შესაძლო გზებისა და რისკების შეფასება ხდება საქმის მასალების საფუძველზე, თუმცა კონკრეტული შედეგის გარანტირება დაუშვებელია.",

        linksEyebrow: "სასარგებლო ბმულები",
        linksTitle: "სახელმწიფო და პროფესიული უწყებები",
        linksIntro: "ყველა ბმული გადაგიყვანთ შესაბამისი უწყების ოფიციალურ ვებგვერდზე.",

        linkProsecutor: "საქართველოს პროკურატურა",
        linkSupremeCourt: "საქართველოს უზენაესი სასამართლო",
        linkMia: "შინაგან საქმეთა სამინისტრო",
        linkHcoj: "იუსტიციის უმაღლესი საბჭო",
        linkParliament: "საქართველოს პარლამენტი",
        linkPresident: "საქართველოს პრეზიდენტი",
        linkGovernment: "საქართველოს მთავრობა",
        linkPenitentiary: "სპეციალური პენიტენციური სამსახური",
        linkJustice: "იუსტიციის სამინისტრო",
        linkMfa: "საგარეო საქმეთა სამინისტრო",
        linkFinance: "ფინანსთა სამინისტრო",
        linkBar: "საქართველოს ადვოკატთა ასოციაცია",

        contactEyebrow: "კონტაქტი",
        contactTitle: "დაგეგმეთ პირველადი კონსულტაცია",
        contactIntro: "დაგვიკავშირდით თქვენთვის მოსახერხებელი გზით. შეხვედრის დრო და ფორმატი წინასწარ შეთანხმდება.",

        whatsappLabel: "WhatsApp",
        callCenterLabel: "ქოლ ცენტრი",
        phoneLabel: "ტელეფონი",
        addressLabel: "მისამართი",
        address: "დავით აღმაშენებლის ქუჩა 13, ბათუმი",

        formEyebrow: "საკონსულტაციო ფორმა",
        formTitle: "მოკლედ მოგვწერეთ თქვენი საკითხის შესახებ",
        formName: "სახელი და გვარი",
        formPhone: "ტელეფონი",
        formService: "სამართლებრივი მიმართულება",
        formChoose: "აირჩიეთ მიმართულება",

        serviceCriminal: "სისხლის სამართალი",
        serviceCivil: "სამოქალაქო სამართალი",
        serviceAdministrative: "ადმინისტრაციული სამართალი",
        serviceOther: "სხვა საკითხი",

        formMessage: "საკითხის მოკლე აღწერა",
        formSubmit: "WhatsApp-ზე გაგრძელება",
        formNote: "ღილაკზე დაჭერის შემდეგ გაიხსნება WhatsApp და მომზადდება თქვენი შეტყობინება.",
        formOpening: "იხსნება WhatsApp მომზადებული შეტყობინებით.",

        whatsappMessageTitle: "გამარჯობა, მსურს იურიდიული კონსულტაციის მიღება.",

        footerCredential: "ადვოკატი • სამართლის დოქტორი • პროფესორი • აკადემიკოსი",
        shareTitle: "გააზიარე ვებსაიტი",
        shareFacebook: "Facebook-ზე გაზიარება",
        shareTikTok: "TikTok-ზე გაზიარება",
        shareOnlineOnly: "გაზიარება სრულად იმუშავებს, როცა საიტი საჯარო მისამართზე იქნება გამოქვეყნებული.",
        shareLocalPreview: "გარე გვერდი გაიხსნა. ყურადღება: localhost-ის ბმული სხვებისთვის მიუწვდომელია; რეალური გაზიარებისთვის საიტი საჯარო დომენზე უნდა იყოს.",
        shareFacebookOpening: "იხსნება Facebook-ის გაზიარების ფანჯარა.",
        sharePopupBlocked: "ბრაუზერმა ახალი ფანჯარა დაბლოკა. ნება დართე ამ საიტზე ამომხტარ ფანჯრებს.",
        shareTikTokOpening: "გაზიარების მენიუ გაიხსნა — აირჩიე TikTok, თუ ის სიაში ჩანს.",
        shareTikTokCopied: "ბმული დაკოპირდა. გახსენი TikTok და გამოიყენე იქ, სადაც ბმულის ჩასმა დაშვებულია.",
        shareTikTokCopyError: "ბმულის კოპირება ვერ მოხერხდა. სცადე ვებსაიტის მისამართის ხელით დაკოპირება.",
        rights: "ყველა უფლება დაცულია.",
        legalNotice: "ვებგვერდზე განთავსებული ზოგადი ინფორმაცია არ წარმოადგენს ინდივიდუალურ სამართლებრივ კონსულტაციას."
    },    en: {
        pageTitle: "Paata Shavadze | Attorney in Batumi",
        skipLink: "Skip to main content",
        topbarNote: "Consultations by prior appointment",
        brandName: "Paata Shavadze",
        brandRole: "Attorney • Doctor of Law",
        navAbout: "Paata Shavadze",
        navPractice: "Practice",
        navCases: "Cases",
        navResources: "Resources",
        navUpdates: "Updates",
        navContact: "Contact",
        headerCta: "Consultation",

        heroEyebrow: "Defense • Representation • Legal Strategy",
        heroTitle: "Attorney in Batumi — professional protection of your rights",
        heroCredential: "Doctor of Law, Professor, Full Member of the Georgian National Academy — Academician",
        heroText: "Individual legal strategy, confidentiality and responsible representation of your interests.",
        bookConsultation: "Book a consultation",
        writeWhatsapp: "Message on WhatsApp",

        trustOne: "Confidentiality",
        trustTwo: "Individual approach",
        trustThree: "Professional representation",

        profileLabel: "Attorney",
        profileName: "Paata Shavadze",
        profileRole: "Doctor of Law • Professor • Academician",
        mobileLabel: "Mobile / WhatsApp",
        emailLabel: "Email",
        paataPhotoAlt: "Paata Shavadze",
        discoverMore: "Discover more",

        aboutEyebrow: "Professional Profile",
        aboutTitle: "Knowledge, experience and responsibility in every case",
        aboutLead: "Paata Shavadze is an attorney, Doctor of Law, Professor and Full Member of the Georgian National Academy — Academician.",
        aboutText: "Professional work is based on detailed analysis of each case, clear assessment of risks, understandable explanation of available legal options and consistent protection of the client's interests.",

        credentialOneTitle: "Doctor of Law",
        credentialOneText: "Academic and practical legal experience.",
        credentialTwoTitle: "Professor",
        credentialTwoText: "Professional experience in legal education and research.",
        credentialThreeTitle: "Academician",
        credentialThreeText: "Full Member of the Georgian National Academy.",

        missionEyebrow: "Mission & Goals",
        missionTitle: "Fair, clear and results-oriented legal assistance",
        missionIntro: "The main objective is to protect the client's interests in accordance with professional ethics, confidentiality and the rule of law.",

        missionOneTitle: "Protection of Rights",
        missionOneText: "Protection of the client's lawful interests at every relevant stage of the case.",

        missionTwoTitle: "Clear Communication",
        missionTwoText: "Clear and understandable explanation of the legal situation and available options.",

        missionThreeTitle: "Individual Strategy",
        missionThreeText: "Developing a course of action tailored to the circumstances of each case.",

        practiceEyebrow: "Court Practice",
        practiceTitle: "Main areas of practice",
        practiceIntro: "Analysis, important decisions and practical explanations will gradually be added to each area.",
        courtPracticeLabel: "Court Practice",

        criminalPracticeTitle: "Criminal Law",
        criminalPracticeText: "Review of significant approaches and decisions in criminal cases.",

        civilPracticeTitle: "Civil Law",
        civilPracticeText: "Review of significant approaches and decisions in civil disputes.",

        administrativePracticeTitle: "Administrative Law",
        administrativePracticeText: "Review of significant approaches and decisions in administrative disputes.",

        criminalImageAlt: "Symbol of justice",
        civilImageAlt: "Legal documents",
        administrativeImageAlt: "Professional meeting",

        contentSoon: "Content coming soon",
        officialPracticeTitle: "Decisions of the Supreme Court of Georgia",
        officialPracticeText: "Visit the official court decisions and case-law search page.",
        openOfficialSource: "Open official source",

        casesEyebrow: "Successful Cases",
        casesTitle: "Experience from real cases",
        casesIntro: "Cases will only be published while protecting confidentiality and without disclosing clients' personal information.",

        caseCategoryCriminal: "Criminal Law",
        caseCategoryCivil: "Civil Law",
        caseCategoryAdministrative: "Administrative Law",

        casePlaceholderTitle: "Case summary",
        casePlaceholderText: "The circumstances, legal strategy and achieved result will be presented here.",
        caseMaterialPending: "Content will be added",

        casesDisclaimer: "The materials are provided for informational purposes only; a previous result in a particular case does not guarantee the same result in another case.",

        resourcesEyebrow: "Legal Library",
        resourcesTitle: "Legislation and professional resources",
        resourcesIntro: "Quick access to legislation, legal acts, court forms and professional materials.",

        legislationTitle: "Legislation",
        legislationText: "Official legislative search system of Georgia.",

        legalActsTitle: "Legal Acts",
        legalActsText: "Decisions and acts of the High Council of Justice.",

        courtFormsTitle: "Court Forms",
        courtFormsText: "Official court forms of the High Council of Justice.",

        benchBarTitle: "Bench-Bar",
        benchBarText: "Materials supporting professional dialogue between judges and attorneys.",

        publicationsTitle: "Publications",
        publicationsText: "Articles, research and professional works by Paata Shavadze.",

        decisionsTitle: "Court Decisions",
        decisionsText: "Official database of Supreme Court decisions.",

        openResource: "Open resource",
        viewSection: "View section",

        updatesEyebrow: "Media & Opportunities",
        updatesTitle: "News, vacancies and publications",
        updatesIntro: "These sections are ready for real content to be added gradually.",

        newsLabel: "News",
        newsPlaceholderTitle: "News headline",
        newsPlaceholderText: "Office updates, professional events and important information will be published here.",

        vacanciesLabel: "Vacancies",
        vacancyPlaceholderTitle: "Vacancy announcement",
        vacancyPlaceholderText: "When a new position becomes available, its description and application details will appear here.",

        publicationLabel: "Publication",
        publicationPlaceholderTitle: "Publication title",
        publicationPlaceholderText: "A short description of an article, research paper or professional publication will appear here.",

        faqEyebrow: "Frequently Asked Questions",
        faqTitle: "Short answers before your consultation",
        faqIntro: "A precise legal assessment is only possible after reviewing the circumstances and documents of the case.",
        askQuestion: "Ask your question",

        faqOneQuestion: "How can I book a consultation?",
        faqOneAnswer: "Contact us by phone, WhatsApp, email or complete the form below. The meeting time will be arranged in advance.",

        faqTwoQuestion: "What documents should I prepare?",
        faqTwoAnswer: "Prepare relevant decisions, contracts, correspondence, notices and a list of important dates related to your case.",

        faqThreeQuestion: "Is an online consultation possible?",
        faqThreeAnswer: "The consultation format — in person or remotely — can be arranged according to the needs of the case.",

        faqFourQuestion: "Is the information confidential?",
        faqFourAnswer: "Information provided within the professional attorney-client relationship is handled in accordance with confidentiality principles.",

        faqFiveQuestion: "Can the result of a case be guaranteed in advance?",
        faqFiveAnswer: "No. Available options and risks are assessed based on the case materials, but a specific result cannot be guaranteed.",

        linksEyebrow: "Useful Links",
        linksTitle: "Government and professional institutions",
        linksIntro: "Each link takes you to the official website of the relevant institution.",

        linkProsecutor: "Prosecutor's Office of Georgia",
        linkSupremeCourt: "Supreme Court of Georgia",
        linkMia: "Ministry of Internal Affairs",
        linkHcoj: "High Council of Justice",
        linkParliament: "Parliament of Georgia",
        linkPresident: "President of Georgia",
        linkGovernment: "Government of Georgia",
        linkPenitentiary: "Special Penitentiary Service",
        linkJustice: "Ministry of Justice",
        linkMfa: "Ministry of Foreign Affairs",
        linkFinance: "Ministry of Finance",
        linkBar: "Georgian Bar Association",

        contactEyebrow: "Contact",
        contactTitle: "Schedule an initial consultation",
        contactIntro: "Contact us in the way most convenient for you. The time and format of the meeting will be arranged in advance.",

        whatsappLabel: "WhatsApp",
        callCenterLabel: "Call Center",
        phoneLabel: "Phone",
        addressLabel: "Address",
        address: "13 David Aghmashenebeli Street, Batumi",

        formEyebrow: "Consultation Form",
        formTitle: "Briefly tell us about your legal matter",
        formName: "Full name",
        formPhone: "Phone",
        formService: "Legal area",
        formChoose: "Choose an area",

        serviceCriminal: "Criminal Law",
        serviceCivil: "Civil Law",
        serviceAdministrative: "Administrative Law",
        serviceOther: "Other matter",

        formMessage: "Brief description",
        formSubmit: "Continue on WhatsApp",
        formNote: "After clicking the button, WhatsApp will open with your prepared message.",
        formOpening: "Opening WhatsApp with your prepared message.",

        whatsappMessageTitle: "Hello, I would like to request a legal consultation.",

        footerCredential: "Attorney • Doctor of Law • Professor • Academician",
        shareTitle: "Share this website",
        shareFacebook: "Share on Facebook",
        shareTikTok: "Share for TikTok",
        shareOnlineOnly: "Sharing will work fully once the website is published at a public address.",
        shareLocalPreview: "The external page opened. Note: a localhost link is not accessible to others; publish the site on a public domain for real sharing.",
        shareFacebookOpening: "Opening the Facebook sharing window.",
        sharePopupBlocked: "The browser blocked the new window. Allow pop-ups for this website.",
        shareTikTokOpening: "The device share menu opened — choose TikTok if it is available.",
        shareTikTokCopied: "The link was copied. Open TikTok and use it wherever links can be added.",
        shareTikTokCopyError: "The link could not be copied. Try copying the website address manually.",
        rights: "All rights reserved.",
        legalNotice: "General information provided on this website does not constitute individual legal advice."
    },

    ru: {
        pageTitle: "Паата Шавадзе | Адвокат в Батуми",
        skipLink: "Перейти к основному содержанию",
        topbarNote: "Консультации по предварительной записи",
        brandName: "Паата Шавадзе",
        brandRole: "Адвокат • Доктор права",
        navAbout: "Паата Шавадзе",
        navPractice: "Практика",
        navCases: "Дела",
        navResources: "Ресурсы",
        navUpdates: "Новости",
        navContact: "Контакты",
        headerCta: "Консультация",

        heroEyebrow: "Защита • Представительство • Правовая стратегия",
        heroTitle: "Адвокат в Батуми — профессиональная защита ваших прав",
        heroCredential: "Доктор права, профессор, действительный член Национальной академии Грузии — академик",
        heroText: "Индивидуальная правовая стратегия, конфиденциальность и ответственное представительство ваших интересов.",
        bookConsultation: "Записаться на консультацию",
        writeWhatsapp: "Написать в WhatsApp",

        trustOne: "Конфиденциальность",
        trustTwo: "Индивидуальный подход",
        trustThree: "Профессиональное представительство",

        profileLabel: "Адвокат",
        profileName: "Паата Шавадзе",
        profileRole: "Доктор права • Профессор • Академик",
        mobileLabel: "Мобильный / WhatsApp",
        emailLabel: "Эл. почта",
        paataPhotoAlt: "Паата Шавадзе",
        discoverMore: "Узнать больше",

        aboutEyebrow: "Профессиональный профиль",
        aboutTitle: "Знания, опыт и ответственность в каждом деле",
        aboutLead: "Паата Шавадзе — адвокат, доктор права, профессор и действительный член Национальной академии Грузии — академик.",
        aboutText: "Профессиональная деятельность основана на детальном изучении обстоятельств дела, четкой оценке рисков, понятном объяснении возможных правовых путей и последовательной защите интересов клиента.",

        credentialOneTitle: "Доктор права",
        credentialOneText: "Академический и практический юридический опыт.",
        credentialTwoTitle: "Профессор",
        credentialTwoText: "Профессиональный опыт преподавания и исследования права.",
        credentialThreeTitle: "Академик",
        credentialThreeText: "Действительный член Национальной академии Грузии.",

        missionEyebrow: "Миссия и цели",
        missionTitle: "Справедливая, понятная и ориентированная на результат юридическая помощь",
        missionIntro: "Основная задача — защита интересов клиента с соблюдением профессиональной этики, конфиденциальности и принципа верховенства закона.",

        missionOneTitle: "Защита прав",
        missionOneText: "Защита законных интересов клиента на всех соответствующих этапах дела.",

        missionTwoTitle: "Понятная коммуникация",
        missionTwoText: "Простое и точное объяснение правовой ситуации и возможных вариантов действий.",

        missionThreeTitle: "Индивидуальная стратегия",
        missionThreeText: "Разработка плана действий с учетом обстоятельств каждого конкретного дела.",

        practiceEyebrow: "Судебная практика",
        practiceTitle: "Основные направления практики",
        practiceIntro: "Анализ, важные решения и практические разъяснения будут постепенно добавляться по каждому направлению.",
        courtPracticeLabel: "Судебная практика",

        criminalPracticeTitle: "Уголовное право",
        criminalPracticeText: "Обзор важных подходов и решений по уголовным делам.",

        civilPracticeTitle: "Гражданское право",
        civilPracticeText: "Обзор важных подходов и решений по гражданским спорам.",

        administrativePracticeTitle: "Административное право",
        administrativePracticeText: "Обзор важных подходов и решений по административным спорам.",

        criminalImageAlt: "Символ правосудия",
        civilImageAlt: "Юридические документы",
        administrativeImageAlt: "Профессиональная встреча",

        contentSoon: "Материал готовится",
        officialPracticeTitle: "Решения Верховного суда Грузии",
        officialPracticeText: "Перейдите на официальную страницу поиска судебных решений и практики.",
        openOfficialSource: "Открыть официальный источник",

        casesEyebrow: "Успешные дела",
        casesTitle: "Опыт реальных дел",
        casesIntro: "Дела будут публиковаться только с соблюдением конфиденциальности и без раскрытия персональных данных клиентов.",

        caseCategoryCriminal: "Уголовное право",
        caseCategoryCivil: "Гражданское право",
        caseCategoryAdministrative: "Административное право",

        casePlaceholderTitle: "Краткое описание дела",
        casePlaceholderText: "Здесь будут представлены обстоятельства дела, примененная правовая стратегия и достигнутый результат.",
        caseMaterialPending: "Материал будет добавлен",

        casesDisclaimer: "Материалы носят информационный характер; предыдущий результат по конкретному делу не гарантирует аналогичный результат в другом деле.",

        resourcesEyebrow: "Юридическая библиотека",
        resourcesTitle: "Законодательство и профессиональные ресурсы",
        resourcesIntro: "Быстрый доступ к законодательству, правовым актам, судебным формам и профессиональным материалам.",

        legislationTitle: "Законодательство",
        legislationText: "Официальная система поиска законодательства Грузии.",

        legalActsTitle: "Правовые акты",
        legalActsText: "Решения и акты Высшего совета юстиции.",

        courtFormsTitle: "Судебные формы",
        courtFormsText: "Официальные судебные формы Высшего совета юстиции.",

        benchBarTitle: "Бенч-бар",
        benchBarText: "Материалы профессионального диалога между судьями и адвокатами.",

        publicationsTitle: "Публикации",
        publicationsText: "Статьи, исследования и профессиональные работы Пааты Шавадзе.",

        decisionsTitle: "Судебные решения",
        decisionsText: "Официальная база решений Верховного суда.",

        openResource: "Открыть ресурс",
        viewSection: "Открыть раздел",

        updatesEyebrow: "Медиа и возможности",
        updatesTitle: "Новости, вакансии и публикации",
        updatesIntro: "Разделы готовы для постепенного добавления реальных материалов.",

        newsLabel: "Новости",
        newsPlaceholderTitle: "Заголовок новости",
        newsPlaceholderText: "Новости офиса, профессиональные мероприятия и важная информация будут публиковаться здесь.",

        vacanciesLabel: "Вакансии",
        vacancyPlaceholderTitle: "Объявление о вакансии",
        vacancyPlaceholderText: "При появлении новой вакансии здесь будут размещены описание позиции и порядок подачи заявки.",

        publicationLabel: "Публикация",
        publicationPlaceholderTitle: "Название публикации",
        publicationPlaceholderText: "Здесь будет размещено краткое описание статьи, исследования или профессиональной работы.",

        faqEyebrow: "Часто задаваемые вопросы",
        faqTitle: "Краткие ответы перед консультацией",
        faqIntro: "Точная юридическая оценка возможна только после ознакомления с обстоятельствами дела и документами.",
        askQuestion: "Задать вопрос",

        faqOneQuestion: "Как записаться на консультацию?",
        faqOneAnswer: "Свяжитесь с нами по телефону, WhatsApp, электронной почте или заполните форму ниже. Время встречи согласовывается заранее.",

        faqTwoQuestion: "Какие документы необходимо подготовить?",
        faqTwoAnswer: "Подготовьте относящиеся к делу решения, договоры, письма, уведомления и список важных дат.",

        faqThreeQuestion: "Возможна ли онлайн-консультация?",
        faqThreeAnswer: "Формат консультации — в офисе или дистанционно — согласовывается заранее в зависимости от потребностей дела.",

        faqFourQuestion: "Сохраняется ли конфиденциальность информации?",
        faqFourAnswer: "Информация, предоставленная в рамках профессиональных отношений с адвокатом, обрабатывается с соблюдением принципа конфиденциальности.",
                faqFiveQuestion: "Можно ли заранее гарантировать результат дела?",
        faqFiveAnswer: "Нет. Возможные пути и риски оцениваются на основании материалов дела, однако конкретный результат не может быть гарантирован.",

        linksEyebrow: "Полезные ссылки",
        linksTitle: "Государственные и профессиональные учреждения",
        linksIntro: "Каждая ссылка ведет на официальный сайт соответствующего учреждения.",

        linkProsecutor: "Прокуратура Грузии",
        linkSupremeCourt: "Верховный суд Грузии",
        linkMia: "Министерство внутренних дел",
        linkHcoj: "Высший совет юстиции",
        linkParliament: "Парламент Грузии",
        linkPresident: "Президент Грузии",
        linkGovernment: "Правительство Грузии",
        linkPenitentiary: "Специальная пенитенциарная служба",
        linkJustice: "Министерство юстиции",
        linkMfa: "Министерство иностранных дел",
        linkFinance: "Министерство финансов",
        linkBar: "Ассоциация адвокатов Грузии",

        contactEyebrow: "Контакты",
        contactTitle: "Запланируйте первичную консультацию",
        contactIntro: "Свяжитесь с нами удобным для вас способом. Время и формат встречи согласовываются заранее.",

        whatsappLabel: "WhatsApp",
        callCenterLabel: "Колл-центр",
        phoneLabel: "Телефон",
        addressLabel: "Адрес",
        address: "Улица Давида Агмашенебели, 13, Батуми",

        formEyebrow: "Форма консультации",
        formTitle: "Кратко расскажите о вашем правовом вопросе",
        formName: "Имя и фамилия",
        formPhone: "Телефон",
        formService: "Правовое направление",
        formChoose: "Выберите направление",

        serviceCriminal: "Уголовное право",
        serviceCivil: "Гражданское право",
        serviceAdministrative: "Административное право",
        serviceOther: "Другой вопрос",

        formMessage: "Краткое описание вопроса",
        formSubmit: "Продолжить в WhatsApp",
        formNote: "После нажатия откроется WhatsApp с подготовленным сообщением.",
        formOpening: "WhatsApp открывается с подготовленным сообщением.",

        whatsappMessageTitle: "Здравствуйте, я хотел(а) бы получить юридическую консультацию.",

        footerCredential: "Адвокат • Доктор права • Профессор • Академик",
        shareTitle: "Поделиться сайтом",
        shareFacebook: "Поделиться в Facebook",
        shareTikTok: "Поделиться для TikTok",
        shareOnlineOnly: "Полный доступ к публикации ссылки появится после размещения сайта по публичному адресу.",
        shareLocalPreview: "Внешняя страница открылась. Внимание: ссылка localhost недоступна другим; для настоящего распространения разместите сайт на публичном домене.",
        shareFacebookOpening: "Открывается окно публикации Facebook.",
        sharePopupBlocked: "Браузер заблокировал новое окно. Разрешите всплывающие окна для этого сайта.",
        shareTikTokOpening: "Открылось меню отправки — выберите TikTok, если он доступен в списке.",
        shareTikTokCopied: "Ссылка скопирована. Откройте TikTok и используйте её там, где разрешено добавлять ссылки.",
        shareTikTokCopyError: "Не удалось скопировать ссылку. Попробуйте скопировать адрес сайта вручную.",
        rights: "Все права защищены.",
        legalNotice: "Общая информация на сайте не является индивидуальной юридической консультацией."
    }
};

const translatableElements = document.querySelectorAll("[data-i18n]");
const translatableAltElements = document.querySelectorAll("[data-i18n-alt]");
const languageButtons = document.querySelectorAll("[data-language]");

const siteHeader = document.getElementById("siteHeader");
const mainNavigation = document.getElementById("mainNavigation");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const pageProgress = document.getElementById("pageProgress");
const backToTop = document.getElementById("backToTop");
const consultationForm = document.getElementById("consultationForm");
const formStatus = document.getElementById("formStatus");
const shareStatus = document.getElementById("shareStatus");
const shareFacebookButton = document.getElementById("shareFacebook");
const shareTikTokButton = document.getElementById("shareTikTok");

let currentLanguage = "ka";

function getSavedLanguage() {
    try {
        const savedLanguage = localStorage.getItem("paata-website-language");
        return translations[savedLanguage] ? savedLanguage : "ka";
    } catch {
        return "ka";
    }
}

function updateLanguage(language) {
    const content = translations[language];

    if (!content) {
        return;
    }

    currentLanguage = language;

    document.documentElement.lang = language;
    document.title = content.pageTitle;

    translatableElements.forEach((element) => {
        const key = element.dataset.i18n;

        if (typeof content[key] === "string") {
            element.textContent = content[key];
        }
    });

    translatableAltElements.forEach((element) => {
        const key = element.dataset.i18nAlt;

        if (typeof content[key] === "string") {
            element.alt = content[key];
        }
    });

    languageButtons.forEach((button) => {
        const isActive = button.dataset.language === language;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    if (formStatus) {
        formStatus.textContent = "";
    }

    if (shareStatus) {
        shareStatus.textContent = "";
    }

    try {
        localStorage.setItem("paata-website-language", language);
    } catch {
        // საიტი localStorage-ის გარეშეც იმუშავებს.
    }
}

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateLanguage(button.dataset.language);
    });
});

function currentShareUrl() {
    return window.location.href.split("#")[0];
}

function isLocalShareAddress(address) {
    try {
        const url = new URL(address);
        const host = url.hostname.toLowerCase();
        const privateIpv4 = /^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(host);
        return url.protocol === "file:" ||
            host === "localhost" ||
            host === "::1" ||
            host.endsWith(".local") ||
            privateIpv4;
    } catch {
        return true;
    }
}

function setShareStatus(key) {
    if (shareStatus) {
        shareStatus.textContent = translations[currentLanguage]?.[key] || "";
    }
}

async function copyTextToClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    helper.style.top = "0";
    document.body.appendChild(helper);
    helper.select();

    let copied = false;
    try {
        copied = document.execCommand("copy");
    } finally {
        helper.remove();
    }

    if (!copied) {
        throw new Error("Clipboard access is unavailable");
    }
}

if (shareFacebookButton) {
    shareFacebookButton.addEventListener("click", () => {
        const url = currentShareUrl();
        const isLocal = isLocalShareAddress(url);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        // Open directly from the click event even during local testing.
        // Facebook cannot fetch a localhost URL, but opening the share dialog
        // still lets the user verify the button and will work with the public URL.
        const popup = window.open(shareUrl, "_blank", "width=760,height=640,scrollbars=yes,resizable=yes");

        if (popup) {
            try { popup.opener = null; } catch { /* უსაფრთხოება ბრაუზერზეა დამოკიდებული. */ }
            setShareStatus(isLocal ? "shareLocalPreview" : "shareFacebookOpening");
        } else {
            setShareStatus("sharePopupBlocked");
        }
    });
}

if (shareTikTokButton) {
    shareTikTokButton.addEventListener("click", async () => {
        const url = currentShareUrl();
        const isLocal = isLocalShareAddress(url);

        // Prefer the browser/device share sheet where supported.
        if (typeof navigator.share === "function") {
            try {
                await navigator.share({
                    title: document.title,
                    url
                });
                setShareStatus(isLocal ? "shareLocalPreview" : "shareTikTokOpening");
                return;
            } catch (error) {
                if (error && error.name === "AbortError") {
                    return;
                }
            }
        }

        // TikTok has no generic Facebook-style URL-share endpoint. If the
        // device share sheet is unavailable, open TikTok and copy the current URL.
        const tiktokTab = window.open("https://www.tiktok.com/", "_blank");
        if (tiktokTab) {
            try { tiktokTab.opener = null; } catch { /* ბრაუზერზეა დამოკიდებული. */ }
        }

        try {
            await copyTextToClipboard(url);
            setShareStatus(isLocal ? "shareLocalPreview" : "shareTikTokCopied");
        } catch {
            setShareStatus("shareTikTokCopyError");
        }
    });
}

function closeMobileMenu() {
    if (!mainNavigation || !mobileMenuButton) {
        return;
    }

    mainNavigation.classList.remove("open");
    mobileMenuButton.classList.remove("open");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");

        mobileMenuButton.classList.toggle("open", isOpen);
        mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

function updateScrollUI() {
    const scrollTop = window.scrollY;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    if (siteHeader) {
        siteHeader.classList.toggle("scrolled", scrollTop > 35);
    }

    if (backToTop) {
        backToTop.classList.toggle("visible", scrollTop > 650);
    }

    if (pageProgress) {
        pageProgress.style.width = `${Math.min(progress, 100)}%`;
    }
}

window.addEventListener("scroll", updateScrollUI, {
    passive: true
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
        closeMobileMenu();
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

if (mainNavigation) {
    const navigationLinks = Array.from(
        mainNavigation.querySelectorAll("a[href^='#']")
    );

    const observedSections = navigationLinks
        .map((link) =>
            document.querySelector(link.getAttribute("href"))
        )
        .filter(Boolean);

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    )[0];

                if (!visibleEntry) {
                    return;
                }

                navigationLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                            `#${visibleEntry.target.id}`
                    );
                });
            },
            {
                rootMargin: "-28% 0px -58%",
                threshold: [0.05, 0.25, 0.5]
            }
        );

        observedSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }
}

document
    .querySelectorAll(".faq-list details")
    .forEach((detailsElement) => {
        detailsElement.addEventListener("toggle", () => {
            if (!detailsElement.open) {
                return;
            }

            document
                .querySelectorAll(".faq-list details")
                .forEach((otherDetails) => {
                    if (otherDetails !== detailsElement) {
                        otherDetails.open = false;
                    }
                });
        });
    });

function activatePhotoFallback(image) {
    const showFallback = () => {
        image.classList.add("photo-error");
    };

    const showPhoto = () => {
        image.classList.remove("photo-error");
    };

    image.addEventListener("error", showFallback);
    image.addEventListener("load", showPhoto);

    if (image.complete) {
        if (image.naturalWidth > 0) {
            showPhoto();
        } else {
            showFallback();
        }
    }
}

[
    document.getElementById("brandPhoto"),
    document.getElementById("paataPhoto")
]
    .filter(Boolean)
    .forEach(activatePhotoFallback);

if (consultationForm) {
    consultationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const content = translations[currentLanguage];
        const formData = new FormData(consultationForm);

        const serviceSelect =
            consultationForm.querySelector(
                "select[name='service']"
            );

        const serviceLabel =
            serviceSelect.options[
                serviceSelect.selectedIndex
            ].textContent;

        const message = [
            content.whatsappMessageTitle,
            "",
            `${content.formName}: ${formData.get("name")}`,
            `${content.formPhone}: ${formData.get("phone")}`,
            `${content.formService}: ${serviceLabel}`,
            "",
            `${content.formMessage}:`,
            formData.get("message")
        ].join("\n");

        const whatsappUrl =
            `https://wa.me/${WHATSAPP_NUMBER}` +
            `?text=${encodeURIComponent(message)}`;

        if (formStatus) {
            formStatus.textContent = content.formOpening;
        }        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    });
}

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

updateLanguage(getSavedLanguage());
updateScrollUI();


/* =========================================================
   PAATA SHAVADZE — BIOGRAPHY + PAID CONSULTATION UPDATE
========================================================= */


/* =========================================================
   NEW TRANSLATIONS
========================================================= */

Object.assign(translations.ka, {
    fullBiographyButton: "სრული ბიოგრაფიის ნახვა",

    biographyEyebrow: "ადვოკატის შესახებ",

    biographyTitle:
        "პაატა შავაძის ბიოგრაფია და პროფესიული გზა",

    biographyIntro:
        "სამართლებრივი, აკადემიური, სამეცნიერო და საზოგადოებრივი საქმიანობის მრავალწლიანი გამოცდილება.",

    biographyExpand:
        "სრული ბიოგრაფიის გახსნა",

    biographyCollapse:
        "სრული ბიოგრაფიის დახურვა",

    paidConsultation:
        "კონსულტაცია ფასიანია • ღირებულება და პირობები შეთანხმდება წინასწარ.",

    paidConsultationShort:
        "გთხოვთ გაითვალისწინოთ: კონსულტაცია ფასიანია.",

    whatsappMessageTitle:
        "გამარჯობა, მსურს ფასიანი იურიდიული კონსულტაციის მიღება."
});


Object.assign(translations.en, {
    fullBiographyButton:
        "View full biography",

    biographyEyebrow:
        "About the Attorney",

    biographyTitle:
        "Biography and Professional Career of Paata Shavadze",

    biographyIntro:
        "Many years of legal, academic, scientific and public professional experience.",

    biographyExpand:
        "Open full biography",

    biographyCollapse:
        "Close full biography",

    paidConsultation:
        "Consultations are paid • The fee and conditions are agreed in advance.",

    paidConsultationShort:
        "Please note: the consultation is paid.",

    whatsappMessageTitle:
        "Hello, I would like to request a paid legal consultation."
});


Object.assign(translations.ru, {
    fullBiographyButton:
        "Полная биография",

    biographyEyebrow:
        "Об адвокате",

    biographyTitle:
        "Биография и профессиональный путь Пааты Шавадзе",

    biographyIntro:
        "Многолетний опыт юридической, академической, научной и общественной деятельности.",

    biographyExpand:
        "Открыть полную биографию",

    biographyCollapse:
        "Закрыть полную биографию",

    paidConsultation:
        "Консультация платная • Стоимость и условия согласовываются заранее.",

    paidConsultationShort:
        "Обратите внимание: консультация платная.",

    whatsappMessageTitle:
        "Здравствуйте, я хотел(а) бы получить платную юридическую консультацию."
});


/* =========================================================
   BIOGRAPHY OPEN / CLOSE
========================================================= */

const bioToggle =
    document.getElementById("bioToggle");

const bioFull =
    document.getElementById("bioFull");


function updateBiographyButtonText() {

    if (!bioToggle || !bioFull) {
        return;
    }

    const textElement =
        bioToggle.querySelector(
            "[data-i18n='biographyExpand']"
        );

    if (!textElement) {
        return;
    }

    const languageContent =
        translations[currentLanguage] ||
        translations.ka;

    const isOpen =
        bioToggle.getAttribute(
            "aria-expanded"
        ) === "true";

    textElement.textContent =
        isOpen
            ? languageContent.biographyCollapse
            : languageContent.biographyExpand;
}


if (bioToggle && bioFull) {

    bioToggle.addEventListener(
        "click",
        () => {

            const isCurrentlyOpen =
                bioToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            const newState =
                !isCurrentlyOpen;

            bioToggle.setAttribute(
                "aria-expanded",
                String(newState)
            );

            bioToggle.classList.toggle(
                "open",
                newState
            );

            bioFull.hidden =
                !newState;

            updateBiographyButtonText();

            if (newState) {

                window.setTimeout(
                    () => {

                        const biographyTop =
                            bioToggle
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            120;

                        window.scrollTo({
                            top: biographyTop,
                            behavior: "smooth"
                        });

                    },
                    100
                );
            }
        }
    );
}


/* =========================================================
   LANGUAGE CHANGE + BIOGRAPHY
========================================================= */

languageButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            window.setTimeout(
                () => {
                    updateBiographyButtonText();
                },
                0
            );

        }
    );

});


/* =========================================================
   FULL BIOGRAPHY LINK
========================================================= */

const biographyLink =
    document.querySelector(
        ".bio-link-button"
    );


if (
    biographyLink &&
    bioToggle &&
    bioFull
) {

    biographyLink.addEventListener(
        "click",
        () => {

            if (
                bioToggle.getAttribute(
                    "aria-expanded"
                ) !== "true"
            ) {

                bioToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                bioToggle.classList.add(
                    "open"
                );

                bioFull.hidden =
                    false;

                updateBiographyButtonText();
            }

        }
    );

}


/* =========================================================
   PAID CONSULTATION FORM NOTICE
========================================================= */

if (consultationForm) {

    const paidMessage =
        document.querySelector(
            ".form-paid-note"
        );

    consultationForm.addEventListener(
        "focusin",
        () => {

            if (!paidMessage) {
                return;
            }

            paidMessage.classList.add(
                "highlight"
            );

        }
    );


    consultationForm.addEventListener(
        "focusout",
        () => {

            if (!paidMessage) {
                return;
            }

            window.setTimeout(
                () => {

                    if (
                        !consultationForm.contains(
                            document.activeElement
                        )
                    ) {

                        paidMessage.classList.remove(
                            "highlight"
                        );
                    }

                },
                50
            );

        }
    );

}


/* =========================================================
   CONTACT FORM — IMPROVED PHONE CLEANUP
========================================================= */

const phoneInput =
    consultationForm
        ? consultationForm.querySelector(
            "input[name='phone']"
        )
        : null;


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            let value =
                phoneInput.value;

            value =
                value.replace(
                    /[^0-9+\s()-]/g,
                    ""
                );

            phoneInput.value =
                value;
        }
    );

}


/* =========================================================
   EXTERNAL RESOURCE LINKS
========================================================= */

document
    .querySelectorAll(
        ".resource-card[target='_blank'], .links-grid a[target='_blank']"
    )
    .forEach((link) => {

        if (
            !link.getAttribute("rel")
        ) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        }

    });


/* =========================================================
   IMAGE FALLBACK FOR RESOURCE / UPDATE PHOTOS
========================================================= */

const contentImages =
    document.querySelectorAll(
        ".resource-image img, .update-image img, .practice-image img"
    );


contentImages.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            const wrapper =
                image.parentElement;

            if (!wrapper) {
                return;
            }

            wrapper.classList.add(
                "image-failed"
            );

            image.style.display =
                "none";
        }
    );

});


/* =========================================================
   INITIALIZE NEW CONTENT TRANSLATIONS
========================================================= */

updateLanguage(currentLanguage);

updateBiographyButtonText();


console.log(
    "Paata Shavadze website update loaded successfully."
);


/* =========================================================
   SUPABASE — SUCCESSFUL CASES
========================================================= */

const PUBLIC_SUPABASE_URL =
    "https://kloegzeotojawshbmwcm.supabase.co";

const PUBLIC_SUPABASE_KEY =
    "sb_publishable_6Y4noj5QkAlX4S7z6JVJPw_dlzDiCo0";


let publicDb = null;


if (window.supabase) {

    publicDb =
        window.supabase.createClient(
            PUBLIC_SUPABASE_URL,
            PUBLIC_SUPABASE_KEY
        );

} else {

    console.error(
        "Supabase library is not loaded."
    );
}


function escapeCaseHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}



/* =========================================================
   PER-ITEM SHARING — Facebook + TikTok/share-sheet + copy link
========================================================= */
function addItemShareActions(card, item, type, titleText) {
    if (!card || !item) return;

    const rawId = String(item.id || titleText || (type + "-" + Date.now()));
    const slug = rawId.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || (type + "-" + Date.now());
    const anchorId = "shared-" + type + "-" + slug;
    card.id = anchorId;
    card.dataset.shareTitle = String(titleText || document.title);

    const actions = document.createElement("div");
    actions.className = "item-share-actions";
    actions.setAttribute("aria-label", "მასალის გაზიარება");

    const facebook = document.createElement("button");
    facebook.type = "button";
    facebook.className = "item-share-button item-share-facebook";
    facebook.textContent = "f  Facebook";
    facebook.addEventListener("click", () => {
        const url = window.location.origin + window.location.pathname + window.location.search + "#" + anchorId;
        const shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=620");
    });

    const tiktok = document.createElement("button");
    tiktok.type = "button";
    tiktok.className = "item-share-button item-share-tiktok";
    tiktok.textContent = "♪  TikTok";
    tiktok.addEventListener("click", async () => {
        const url = window.location.origin + window.location.pathname + window.location.search + "#" + anchorId;
        try {
            if (navigator.share) {
                await navigator.share({ title: String(titleText || document.title), text: String(titleText || ""), url });
                return;
            }
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                tiktok.textContent = "✓ ბმული დაკოპირდა";
                return;
            }
            window.prompt("დააკოპირე მასალის ბმული:", url);
        } catch (err) {
            if (!err || err.name !== "AbortError") {
                window.prompt("დააკოპირე მასალის ბმული:", url);
            }
        }
    });

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "item-share-button item-share-copy";
    copy.textContent = "🔗 ბმულის კოპირება";
    copy.addEventListener("click", async () => {
        const url = window.location.origin + window.location.pathname + window.location.search + "#" + anchorId;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                copy.textContent = "✓ დაკოპირდა";
            } else {
                window.prompt("დააკოპირე მასალის ბმული:", url);
            }
        } catch (_) {
            window.prompt("დააკოპირე მასალის ბმული:", url);
        }
    });

    actions.append(facebook, tiktok, copy);
    card.appendChild(actions);
}

(function addItemShareStyles() {
    if (document.getElementById("itemShareStyles")) return;
    const style = document.createElement("style");
    style.id = "itemShareStyles";
    style.textContent = `
      .item-share-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;padding-top:14px;border-top:1px solid rgba(100,116,139,.22)}
      .item-share-button{font:inherit;font-size:.86rem;font-weight:600;line-height:1.2;border:1px solid #d5dde7;border-radius:9px;padding:9px 11px;background:#fff;color:#17324d;cursor:pointer;transition:transform .15s ease,background .15s ease}
      .item-share-button:hover{transform:translateY(-1px);background:#f1f6fa}
      .item-share-facebook{color:#fff;background:#1877f2;border-color:#1877f2}
      .item-share-facebook:hover{background:#0d65d9}
      .item-share-tiktok{color:#111;background:#fff}
      @media(max-width:520px){.item-share-actions{gap:6px}.item-share-button{font-size:.78rem;padding:8px}}
    `;
    document.head.appendChild(style);
})();

async function loadPublishedCases() {

    const container =
        document.getElementById(
            "dynamicCases"
        );

    if (!container) {

        console.error(
            "dynamicCases container not found."
        );

        return;
    }


    if (!publicDb) {

        console.error(
            "Supabase client is not available."
        );

        return;
    }


    const { data, error } =
        await publicDb
            .from("cases")
            .select("*")
            .eq(
                "is_published",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Cases loading error:",
            error
        );

        return;
    }


    /*
        თუ ჯერ არცერთი გამოქვეყნებული საქმე არ არის,
        ძველი 3 placeholder უჯრა რჩება.
    */

    if (
        !data ||
        data.length === 0
    ) {

        console.log(
            "No published cases. Default cards remain."
        );

        return;
    }


    container.innerHTML =
        data
            .map(
                (item, index) => {

                    const number =
                        String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        );


                    const category =
                        escapeCaseHTML(
                            item.category ||
                            "საქმე"
                        );


                    const title =
                        escapeCaseHTML(
                            item.title ||
                            ""
                        );


                    const description =
                        escapeCaseHTML(
                            item.description ||
                            ""
                        );


                    const result =
                        escapeCaseHTML(
                            item.result ||
                            ""
                        );


                    return `
                        <article class="case-card">

                            <div class="case-topline">

                                <span>
                                    ${category}
                                </span>

                                <span>
                                    ${number}
                                </span>

                            </div>

                            <h3>
                                ${title}
                            </h3>

                            <p>
                                ${description}
                            </p>

                            ${
                                result
                                    ? `
                                        <span class="status-pill neutral">
                                            ${result}
                                        </span>
                                    `
                                    : ""
                            }

                        </article>
                    `;
                }
            )
            .join("");


    container.querySelectorAll(".case-card").forEach((card, index) => {
        const item = data[index];
        addItemShareActions(card, item, "case", item && item.title ? item.title : "საქმე");
    });

    console.log(
        `${data.length} published case(s) loaded.`
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        loadPublishedCases
    );

} else {

    loadPublishedCases();
}

/* =========================================================
   SUPABASE — ALL PUBLISHED NEWS
========================================================= */

function escapeNewsHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


async function loadPublishedNews() {

    const newsCard =
        document.getElementById("news");

    if (!newsCard) {
        console.error(
            "News card not found."
        );
        return;
    }


    if (!publicDb) {
        console.error(
            "Supabase client is not available."
        );
        return;
    }


    const updatesGrid =
        newsCard.parentElement;

    if (!updatesGrid) {
        console.error(
            "Updates grid not found."
        );
        return;
    }


    const { data, error } =
        await publicDb
            .from("news")
            .select("*")
            .eq(
                "is_published",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {
        console.error(
            "News loading error:",
            error
        );
        return;
    }


    /*
        თუ Admin Panel-ში ჯერ არცერთი
        გამოქვეყნებული სიახლე არ არის,
        ძველი News placeholder დარჩება.
    */

    if (
        !data ||
        data.length === 0
    ) {
        console.log(
            "No published news. Default news card remains."
        );
        return;
    }


    /*
        ვიპოვოთ ვაკანსიის ბარათი.
        News ბარათები მის წინ ჩაჯდება.
    */

    const vacanciesCard =
        document.getElementById(
            "vacancies"
        );


    /*
        ძველი News placeholder წავშალოთ.
    */

    newsCard.remove();


    /*
        თითოეული გამოქვეყნებული სიახლე
        გადაიქცევა ცალკე ბარათად.
    */

    data.forEach(
        (item, index) => {

            const title =
                escapeNewsHTML(
                    item.title || ""
                );


            const description =
                escapeNewsHTML(
                    item.description || ""
                );


            const imageUrl =
                item.image_url
                    ? escapeNewsHTML(
                        item.image_url
                    )
                    : "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=84";


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "update-card";


            card.innerHTML = `

                <div class="update-image">

                    <img
                        src="${imageUrl}"
                        alt="${title}"
                        loading="lazy"
                    >

                </div>


                <div class="update-card-head">

                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <small>
                        სიახლეები
                    </small>

                </div>


                <h3>
                    ${title}
                </h3>


                <p>
                    ${description}
                </p>


                <span class="status-pill">
                    გამოქვეყნებულია
                </span>

            `;
        addItemShareActions(card, item, "news", item.title || "მასალა");



            /*
                თუ ვაკანსიის ბარათი არსებობს,
                News მის წინ დაემატება.

                თუ არა — Grid-ის ბოლოში.
            */

            if (
                vacanciesCard &&
                vacanciesCard.parentElement === updatesGrid
            ) {

                updatesGrid.insertBefore(
                    card,
                    vacanciesCard
                );

            } else {

                updatesGrid.appendChild(
                    card
                );
            }

        }
    );


    console.log(
        `${data.length} published news item(s) loaded.`
    );
}


/* =========================================================
   START NEWS LOADING
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        loadPublishedNews
    );

} else {

    loadPublishedNews();
}
/* =========================================================
   SUPABASE — ALL PUBLISHED VACANCIES
========================================================= */

async function loadPublishedVacancies() {

    const vacancyCard =
        document.getElementById("vacancies");

    if (!vacancyCard) {
        console.error("Vacancies card not found.");
        return;
    }

    if (!publicDb) {
        console.error(
            "Supabase client is not available."
        );
        return;
    }

    const updatesGrid =
        vacancyCard.parentElement;

    if (!updatesGrid) {
        return;
    }


    const { data, error } =
        await publicDb
            .from("vacancies")
            .select("*")
            .eq(
                "is_published",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {
        console.error(
            "Vacancies loading error:",
            error
        );
        return;
    }


    if (
        !data ||
        data.length === 0
    ) {
        console.log(
            "No published vacancies. Default vacancy card remains."
        );
        return;
    }


    vacancyCard.remove();


    data.forEach((item) => {

        const title =
            escapeNewsHTML(
                item.title || ""
            );

        const description =
            escapeNewsHTML(
                item.description || ""
            );

        const imageUrl =
            item.image_url
                ? escapeNewsHTML(
                    item.image_url
                )
                : "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=84";
const applicationMessage =
    `გამარჯობა, მსურს განაცხადის გაკეთება ვაკანსიაზე: ${item.title || ""}`;

const applicationUrl =
    `https://wa.me/995599114141?text=${encodeURIComponent(applicationMessage)}`;

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "update-card";


        card.innerHTML = `

            <div class="update-image">

                <img
                    src="${imageUrl}"
                    alt="${title}"
                    loading="lazy"
                >

            </div>


            <div class="update-card-head">

                <span>
                    V
                </span>

                <small>
                    ვაკანსიები
                </small>

            </div>


            <h3>
                ${title}
            </h3>


            <p>
                ${description}
            </p>


            <span class="status-pill">
                აქტიური ვაკანსია
            </span>

        `;
        addItemShareActions(card, item, "vacancy", item.title || "მასალა");



        const publicationsCard =
            document.getElementById(
                "publications"
            );


        if (publicationsCard) {

            updatesGrid.insertBefore(
                card,
                publicationsCard
            );

        } else {

            updatesGrid.appendChild(
                card
            );
        }

    });


    console.log(
        `${data.length} published vacancy item(s) loaded.`
    );
}


/* =========================================================
   SUPABASE — ALL PUBLISHED PUBLICATIONS
========================================================= */

async function loadPublishedPublications() {

    const publicationCard =
        document.getElementById(
            "publications"
        );

    if (!publicationCard) {
        console.error(
            "Publications card not found."
        );
        return;
    }

    if (!publicDb) {
        console.error(
            "Supabase client is not available."
        );
        return;
    }

    const updatesGrid =
        publicationCard.parentElement;

    if (!updatesGrid) {
        return;
    }


    const { data, error } =
        await publicDb
            .from("publications")
            .select("*")
            .eq(
                "is_published",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {
        console.error(
            "Publications loading error:",
            error
        );
        return;
    }


    if (
        !data ||
        data.length === 0
    ) {
        console.log(
            "No published publications. Default publication card remains."
        );
        return;
    }


    publicationCard.remove();


    data.forEach((item) => {

        const title =
            escapeNewsHTML(
                item.title || ""
            );

        const description =
            escapeNewsHTML(
                item.description || ""
            );

        const imageUrl =
            item.image_url
                ? escapeNewsHTML(
                    item.image_url
                )
                : "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=84";

        const fileUrl =
            item.file_url
                ? escapeNewsHTML(
                    item.file_url
                )
                : "";


        const card =
            document.createElement(
                "article"
            );

        card.className =
            "update-card";


        card.innerHTML = `

            <div class="update-image">

                <img
                    src="${imageUrl}"
                    alt="${title}"
                    loading="lazy"
                >

            </div>


            <div class="update-card-head">

                <span>
                    P
                </span>

                <small>
                    პუბლიკაცია
                </small>

            </div>


            <h3>
                ${title}
            </h3>


            <p>
                ${description}
            </p>


            ${
                fileUrl
                    ? `
                        <a
                            class="status-pill"
                            href="${fileUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            პუბლიკაციის გახსნა
                        </a>
                    `
                    : `
                        <span class="status-pill">
                            გამოქვეყნებულია
                        </span>
                    `
            }

        `;
        addItemShareActions(card, item, "publication", item.title || "მასალა");



        updatesGrid.appendChild(
            card
        );

    });


    console.log(
        `${data.length} published publication item(s) loaded.`
    );
}


/* =========================================================
   INITIALIZE VACANCIES + PUBLICATIONS
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            loadPublishedVacancies();
            loadPublishedPublications();
        }
    );

} else {

    loadPublishedVacancies();
    loadPublishedPublications();
}
/* =========================================================
   VACANCY — WHATSAPP APPLICATION BUTTON
   საბოლოო დამატება
========================================================= */

function setupVacancyWhatsAppButtons() {

    const updateCards =
        document.querySelectorAll(
            ".updates-grid .update-card"
        );

    updateCards.forEach((card) => {

        const category =
            card.querySelector(
                ".update-card-head small"
            );

        if (!category) {
            return;
        }

        const categoryText =
            category.textContent
                .trim()
                .toLowerCase();

        /*
            მხოლოდ ვაკანსიის ბარათებს ვეხებით
        */
        if (
            categoryText !== "ვაკანსიები" &&
            categoryText !== "vacancies" &&
            categoryText !== "вакансии"
        ) {
            return;
        }


        /*
            თუ ღილაკი უკვე გაკეთებულია,
            მეორედ აღარ ვქმნით
        */
        if (
            card.querySelector(
                ".vacancy-apply-button"
            )
        ) {
            return;
        }


        const titleElement =
            card.querySelector("h3");

        const vacancyTitle =
            titleElement
                ? titleElement.textContent.trim()
                : "ვაკანსია";


        const oldStatus =
            card.querySelector(
                ".status-pill"
            );

        if (!oldStatus) {
            return;
        }


        const applicationMessage =
            `გამარჯობა, მსურს განაცხადის გაკეთება ვაკანსიაზე: ${vacancyTitle}`;


        const applicationUrl =
            `https://wa.me/995599114141?text=${encodeURIComponent(
                applicationMessage
            )}`;


        const applyButton =
            document.createElement("a");


        applyButton.className =
            "status-pill vacancy-apply-button";


        applyButton.href =
            applicationUrl;


        applyButton.target =
            "_blank";


        applyButton.rel =
            "noopener noreferrer";


        applyButton.textContent =
            "განაცხადის გაგზავნა";


        applyButton.style.textDecoration =
            "none";


        oldStatus.replaceWith(
            applyButton
        );

    });

}


/* =========================================================
   WATCH DYNAMIC SUPABASE CONTENT
========================================================= */

const vacancyUpdatesGrid =
    document.querySelector(
        ".updates-grid"
    );


if (vacancyUpdatesGrid) {

    const vacancyObserver =
        new MutationObserver(() => {

            setupVacancyWhatsAppButtons();

        });


    vacancyObserver.observe(
        vacancyUpdatesGrid,
        {
            childList: true,
            subtree: true
        }
    );

}


/* =========================================================
   FIRST RUN
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            setupVacancyWhatsAppButtons();

        }
    );

} else {

    setupVacancyWhatsAppButtons();

}
/* PAATA CMS — add only at the bottom of the EXISTING script.js. */
(() => {
"use strict";
if (!window.supabase || typeof publicDb === "undefined" || !publicDb) return;

const state={
    content:new Map(),
    media:new Map(),
    links:new Map(),
    settings:new Map(),
    sections:[],
    blocks:[],
    blocksTableLoaded:false
};

const esc=v=>String(v??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

const lang=()=>[
    "ka",
    "en",
    "ru"
].includes(currentLanguage)
    ?currentLanguage
    :"ka";

const c=(k,l=lang(),fb="")=>
    state.content.has(k)
        ?(state.content.get(k)?.[l]??"")
        :(typeof translations!=="undefined"
            ?translations[l]?.[k]??fb
            :fb);

const bval=(b,l,f,fb="")=>
    b?.[l]?.[f]??fb;

const bkeys={
    mission:[
        ["missionOneTitle","missionOneText"],
        ["missionTwoTitle","missionTwoText"],
        ["missionThreeTitle","missionThreeText"]
    ],

    practice:[
        ["criminalPracticeTitle","criminalPracticeText"],
        ["civilPracticeTitle","civilPracticeText"],
        ["administrativePracticeTitle","administrativePracticeText"]
    ],

    resources:[
        ["legislationTitle","legislationText"],
        ["legalActsTitle","legalActsText"],
        ["courtFormsTitle","courtFormsText"],
        ["benchBarTitle","benchBarText"],
        ["publicationsTitle","publicationsText"],
        ["decisionsTitle","decisionsText"]
    ],

    faq:[
        ["faqOneQuestion","faqOneAnswer"],
        ["faqTwoQuestion","faqTwoAnswer"],
        ["faqThreeQuestion","faqThreeAnswer"],
        ["faqFourQuestion","faqFourAnswer"],
        ["faqFiveQuestion","faqFiveAnswer"]
    ],

    usefulLinks:[
        ["linkProsecutor"],
        ["linkSupremeCourt"],
        ["linkMia"],
        ["linkHcoj"],
        ["linkParliament"],
        ["linkPresident"],
        ["linkGovernment"],
        ["linkPenitentiary"],
        ["linkJustice"],
        ["linkMfa"],
        ["linkFinance"],
        ["linkBar"]
    ]
};

const imageKey=(s,i)=>
    s==="practice"
        ?[
            "criminalPracticeImage",
            "civilPracticeImage",
            "administrativePracticeImage"
        ][i]||""
        :s==="resources"
            ?`resourceImage${i+1}`
            :"";

const linkKey=(s,i)=>
    s==="resources"
        ?`link_${String(19+i).padStart(3,"0")}`
        :s==="usefulLinks"
            ?`link_${String(26+i).padStart(3,"0")}`
            :"";

const blockText=(s,b,i,l,field)=>{
    let k=bkeys[s]?.[i]?.[
        field==="title"
            ?0
            :1
    ];

    return k
        ?c(
            k,
            l,
            bval(b,l,field,"")
        )
        :bval(
            b,
            l,
            field,
            ""
        );
};

function imageUrl(s,b,i){
    let k=imageKey(s,i);

    if(k&&state.media.has(k))
        return state.media.get(k)?.url||"";

    return b?.image_url||"";
}

function hrefUrl(s,b,i){
    let k=linkKey(s,i);

    if(k&&state.links.has(k))
        return state.links.get(k)?.url||"#";

    return b?.link_url||"#";
}

function setImg(img,url){
    if(!img)
        return;

    if(url){
        img.src=url;
        img.style.display="";
    }else{
        img.removeAttribute("src");
        img.style.display="none";
    }
}

function applyContent(){
    if(typeof translations!=="undefined"){
        state.content.forEach((r,k)=>{
            [
                "ka",
                "en",
                "ru"
            ].forEach(l=>{
                translations[l][k]=r[l]??"";
            });
        });
    }

    updateLanguage(lang());
}

function applyMedia(){
    const map={
        brandPhoto:"#brandPhoto",
        heroImage:".hero-media img",
        paataPhoto:"#paataPhoto",

        criminalPracticeImage:
            "#practice .practice-grid .practice-card:nth-child(1) img",

        civilPracticeImage:
            "#practice .practice-grid .practice-card:nth-child(2) img",

        administrativePracticeImage:
            "#practice .practice-grid .practice-card:nth-child(3) img",

        resourceImage1:
            "#resources .resources-grid .resource-card:nth-child(1) img",

        resourceImage2:
            "#resources .resources-grid .resource-card:nth-child(2) img",

        resourceImage3:
            "#resources .resources-grid .resource-card:nth-child(3) img",

        resourceImage4:
            "#resources .resources-grid .resource-card:nth-child(4) img",

        resourceImage5:
            "#resources .resources-grid .resource-card:nth-child(5) img",

        resourceImage6:
            "#resources .resources-grid .resource-card:nth-child(6) img"
    };

    state.media.forEach((r,k)=>{
        let q=map[k];

        if(q)
            setImg(
                document.querySelector(q),
                r.url||""
            );
    });
}

function applyLinks(){
    let a=[
        ...document.querySelectorAll("a")
    ];

    state.links.forEach((r,k)=>{
        let m=k.match(
            /^link_(\d+)$/
        );

        if(!m)
            return;

        let x=a[
            Number(m[1])-1
        ];

        if(!x)
            return;

        if(r.url!==undefined)
            x.href=r.url;

        if(
            !x.dataset.i18n &&
            x.children.length===0 &&
            r.label
        ){
            x.textContent=r.label;
        }
    });
}

function applySettings(){
    let g=k=>
        state.settings.get(k)||"";

    let title=g("site_title");
    let desc=g("meta_description");
    let tc=g("theme_color");
    let fav=g("favicon_url");
    let css=g("custom_css");

    let phone=g("phone");
    let email=g("email");
    let wa=g("whatsapp");

    if(title) {
        let seoTitle=String(title).trim();
        if(!/(ბათუმი|batumi|батуми)/i.test(seoTitle)) {
            const lang=document.documentElement.lang || "ka";
            const localSuffix={
                ka:"ადვოკატი ბათუმში",
                en:"Attorney in Batumi",
                ru:"Адвокат в Батуми"
            };
            seoTitle += " | " + (localSuffix[lang] || localSuffix.ka);
        }
        document.title=seoTitle;
        const ogTitle=document.querySelector("meta[property='og:title']");
        const twitterTitle=document.querySelector("meta[name='twitter:title']");
        if(ogTitle) ogTitle.content=seoTitle;
        if(twitterTitle) twitterTitle.content=seoTitle;
    }

    let d=document.querySelector(
        "meta[name='description']"
    );

    if(d&&desc) {
        d.content=desc;
        const ogDescription=document.querySelector("meta[property='og:description']");
        const twitterDescription=document.querySelector("meta[name='twitter:description']");
        if(ogDescription) ogDescription.content=desc;
        if(twitterDescription) twitterDescription.content=desc;
    }

    let t=document.querySelector(
        "meta[name='theme-color']"
    );

    if(t&&tc)
        t.content=tc;

    if(fav){
        let f=document.querySelector(
            "link[rel='icon']"
        );

        if(f)
            f.href=fav;
    }

    if(css!==undefined){
        let s=
            document.getElementById(
                "paataCmsCustomCss"
            ) ||
            document.head.appendChild(
                Object.assign(
                    document.createElement("style"),
                    {id:"paataCmsCustomCss"}
                )
            );

        s.textContent=css;
    }

    if(phone)
        document
            .querySelectorAll(
                ".topbar-contacts a[href^='tel:'],.profile-contact-list a[href^='tel:']"
            )
            .forEach(a=>{
                a.href=
                    `tel:${phone.replace(/\s/g,"")}`;

                let st=a.querySelector(
                    "strong"
                );

                if(st)
                    st.textContent=phone;
                else
                    a.textContent=phone;
            });

    if(email)
        document
            .querySelectorAll(
                ".topbar-contacts a[href^='mailto:'],.profile-contact-list a[href^='mailto:'],.contact-card.wide a[href^='mailto:']"
            )
            .forEach(a=>{
                a.href=`mailto:${email}`;

                let st=a.querySelector(
                    "strong"
                );

                if(st)
                    st.textContent=email;
                else
                    a.textContent=email;
            });

    if(wa){
        let n=wa.replace(
            /\D/g,
            ""
        );

        document
            .querySelectorAll(
                ".hero-actions a[href*='wa.me/'],.profile-contact-list a[href*='wa.me/'],.contact-card a[href*='wa.me/']"
            )
            .forEach(a=>{
                a.href=
                    `https://wa.me/${n}`;
            });
    }

    let ld=document.querySelector(
        "script[type='application/ld+json']"
    );

    if(ld)
        try{
            let j=JSON.parse(
                ld.textContent
            );

            if(email)
                j.email=`mailto:${email}`;

            if(phone)
                j.telephone=phone;

            if(state.content.has("address")){
                j.address=j.address||{};

                j.address.streetAddress=
                    c("address");
            }

            ld.textContent=
                JSON.stringify(j);
        }catch{}
}

function renderBlock(s,b,i){
    let l=lang();

    let title=blockText(
        s,b,i,l,"title"
    );

    let body=blockText(
        s,b,i,l,"body"
    );

    let badge=bval(
        b,
        l,
        "badge",
        s==="practice"
            ?c("courtPracticeLabel")
            :""
    );

    let button=bval(
        b,
        l,
        "button",
        s==="practice"
            ?c("contentSoon")
            :s==="resources"
                ?(
                    i===4
                        ?c("viewSection")
                        :c("openResource")
                )
                :""
    );

    let n=
        b.metadata?.number||
        b.metadata?.code||
        String(i+1).padStart(2,"0");

    let img=imageUrl(
        s,b,i
    );

    let url=hrefUrl(
        s,b,i
    );

    let delay=
        i===1
            ?" delay-1"
            :i>1
                ?" delay-2"
                :"";

    if(s==="mission"){
        let e=document.createElement(
            "article"
        );

        e.className=
            `mission-card reveal visible${delay}`;

        e.innerHTML=`
            ${
                img
                ? `
                    <div class="cms-custom-image">
                        <img src="${esc(img)}" alt="${esc(title)}" loading="lazy">
                    </div>
                `
                : ""
            }
            <span class="mission-number"></span>
            <h3></h3>
            <p></p>
        `;

        e.querySelector(
            ".mission-number"
        ).textContent=n;

        e.querySelector(
            "h3"
        ).textContent=title;

        e.querySelector(
            "p"
        ).textContent=body;

        return e;
    }

    if(s==="practice"){
        let e=document.createElement(
            "article"
        );

        e.className=
            `practice-card reveal visible${delay}`;

        e.innerHTML=`
            ${
                img
                ?`
                    <div class="practice-image">
                        <img
                            src="${esc(img)}"
                            alt=""
                            loading="lazy"
                        >
                    </div>
                `
                :""
            }

            <div class="practice-body">
                <span class="practice-index"></span>
                <p class="card-kicker"></p>
                <h3></h3>
                <p class="practice-copy"></p>
                ${
                    button
                    ?`<span class="status-pill"></span>`
                    :""
                }
            </div>
        `;

        e.querySelector(
            ".practice-index"
        ).textContent=n;

        e.querySelector(
            ".card-kicker"
        ).textContent=badge;

        e.querySelector(
            "h3"
        ).textContent=title;

        e.querySelector(
            ".practice-copy"
        ).textContent=body;

        if(
            e.querySelector(
                ".status-pill"
            )
        )
            e.querySelector(
                ".status-pill"
            ).textContent=button;

        return e;
    }

    if(s==="resources"){
        let e=document.createElement(
            "a"
        );

        e.className=
            `resource-card reveal visible${delay}`;

        e.href=url;

        if(b.open_new_tab){
            e.target="_blank";
            e.rel=
                "noopener noreferrer";
        }

        e.innerHTML=`
            ${
                img
                ?`
                    <div class="resource-image">
                        <img
                            src="${esc(img)}"
                            alt=""
                            loading="lazy"
                        >
                    </div>
                `
                :""
            }

            <span class="resource-code"></span>
            <span class="resource-number"></span>
            <h3></h3>
            <p></p>
            <strong></strong>
        `;

        e.querySelector(
            ".resource-code"
        ).textContent=
            b.metadata?.code||"";

        e.querySelector(
            ".resource-number"
        ).textContent=n;

        e.querySelector(
            "h3"
        ).textContent=title;

        e.querySelector(
            "p"
        ).textContent=body;

        e.querySelector(
            "strong"
        ).textContent=button;

        return e;
    }

    if(s==="faq"){
        let e=document.createElement(
            "details"
        );

        e.innerHTML=`
            <summary></summary>
            <p></p>
        `;

        e.querySelector(
            "summary"
        ).textContent=title;

        e.querySelector(
            "p"
        ).textContent=body;

        if(i===0)
            e.open=true;

        return e;
    }

    if(s==="usefulLinks"){
        let e=document.createElement(
            "a"
        );

        e.href=url;

        e.target=
            b.open_new_tab
                ?"_blank"
                :"_self";

        if(b.open_new_tab)
            e.rel=
                "noopener noreferrer";

        e.innerHTML=`
            <span></span>
            <strong></strong>
        `;

        e.querySelector(
            "span"
        ).textContent=n;

        e.querySelector(
            "strong"
        ).textContent=title;

        return e;
    }

    let e=document.createElement(
        "article"
    );

    e.className=
        "mission-card reveal visible";

    e.innerHTML=`
        <span class="mission-number"></span>
        <h3></h3>
        <p></p>
    `;

    e.querySelector(
        ".mission-number"
    ).textContent=n;

    e.querySelector(
        "h3"
    ).textContent=title;

    e.querySelector(
        "p"
    ).textContent=body;

    return e;
}
function renderCustom(s){
    const e = document.createElement("section");

    e.id = s.id;

    e.className = (
        (s.css_class || "section")
            .split(/\s+/)
            .filter(Boolean)
            .concat(["section"])
    ).join(" ");

    const ctn = document.createElement("div");
    ctn.className = "container";

    const l = lang();

    const title =
        s[`title_${l}`] ||
        s.title_ka ||
        s.id;

    const subtitle =
        s[`subtitle_${l}`] ||
        s.subtitle_ka ||
        "";

    /*
     * SECTION HEADER
     * ვიყენებთ საიტის უკვე არსებულ კლასებს,
     * ამიტომ დიზაინს არ ვცვლით.
     */
    const heading = document.createElement("div");
    heading.className = "section-heading reveal visible";

    heading.innerHTML = `
        <div>
            <p class="eyebrow">
                <span></span>
                <span class="cms-eyebrow"></span>
            </p>

            <h2 class="section-title cms-title"></h2>
        </div>

        <p class="cms-subtitle"></p>
    `;

    heading.querySelector(".cms-eyebrow").textContent = title;
    heading.querySelector(".cms-title").textContent = title;
    heading.querySelector(".cms-subtitle").textContent = subtitle;

    ctn.appendChild(heading);

    /*
     * CUSTOM BLOCKS
     */
    const rows = state.blocks
        .filter(b =>
            b.section_id === s.id &&
            b.is_published !== false
        )
        .sort((a,b) =>
            Number(a.sort_order || 0) -
            Number(b.sort_order || 0)
        );

    /*
     * უნივერსალური grid.
     * ვიყენებთ არსებულ mission-grid კლასს,
     * რათა არსებული დიზაინის სისტემა შევინარჩუნოთ.
     */
    const grid = document.createElement("div");
    grid.className = "mission-grid cms-custom-grid";

    /*
     * თუ სექციას საერთოდ არ აქვს ბლოკები,
     * მაინც გამოჩნდეს სექცია.
     */
    if(!rows.length){

        const empty = document.createElement("div");

        empty.className = "mission-card reveal visible";

        const emptyTitle = document.createElement("h3");
        emptyTitle.textContent = title;

        const emptyText = document.createElement("p");
        emptyText.textContent = subtitle || "";

        empty.appendChild(emptyTitle);
        empty.appendChild(emptyText);

        grid.appendChild(empty);
    }

    rows.forEach((b, i) => {

        const data =
            b[l] ||
            b.ka ||
            {};

        const blockTitle =
            data.title ||
            data.heading ||
            data.name ||
            "";

        const blockBody =
            data.body ||
            data.text ||
            data.description ||
            data.content ||
            "";

        const buttonText =
            data.button ||
            data.buttonText ||
            "";

        const image =
            b.image_url ||
            data.image ||
            data.image_url ||
            "";

        const link =
            b.link_url ||
            data.link ||
            data.url ||
            "";

        const number =
            b.metadata?.number ||
            b.metadata?.code ||
            String(i + 1).padStart(2, "0");

        /*
         * LINK BLOCK
         */
        if(
            b.type === "link" ||
            link
        ){

            const card = document.createElement("a");

            card.className =
                "mission-card reveal visible cms-custom-card";

            card.href = link || "#";

            if(b.open_new_tab){
                card.target = "_blank";
                card.rel = "noopener noreferrer";
            }

            if(image){
                const imgWrap =
                    document.createElement("div");

                imgWrap.className =
                    "cms-custom-image";

                const img =
                    document.createElement("img");

                img.src = image;
                img.alt = blockTitle;
                img.loading = "lazy";

                imgWrap.appendChild(img);
                card.appendChild(imgWrap);
            }

            const num =
                document.createElement("span");

            num.className = "mission-number";
            num.textContent = number;

            const h =
                document.createElement("h3");

            h.textContent = blockTitle;

            const p =
                document.createElement("p");

            p.textContent = blockBody;

            card.appendChild(num);
            card.appendChild(h);
            card.appendChild(p);

            if(buttonText){

                const strong =
                    document.createElement("strong");

                strong.textContent = buttonText;

                card.appendChild(strong);
            }

            grid.appendChild(card);

            return;
        }

        /*
         * FAQ BLOCK
         */
        if(b.type === "faq"){

            const details =
                document.createElement("details");

            details.className =
                "cms-custom-faq";

            const summary =
                document.createElement("summary");

            summary.textContent = blockTitle;

            const p =
                document.createElement("p");

            p.textContent = blockBody;

            details.appendChild(summary);
            details.appendChild(p);

            if(i === 0)
                details.open = true;

            grid.appendChild(details);

            return;
        }

        /*
         * IMAGE / NORMAL CARD
         */
        const card =
            document.createElement("article");

        card.className =
            "mission-card reveal visible cms-custom-card";

        if(image){

            const imgWrap =
                document.createElement("div");

            imgWrap.className =
                "cms-custom-image";

            const img =
                document.createElement("img");

            img.src = image;
            img.alt = blockTitle;
            img.loading = "lazy";

            imgWrap.appendChild(img);

            card.appendChild(imgWrap);
        }

        const num =
            document.createElement("span");

        num.className = "mission-number";
        num.textContent = number;

        const h =
            document.createElement("h3");

        h.textContent = blockTitle;

        const p =
            document.createElement("p");

        p.textContent = blockBody;

        card.appendChild(num);
        card.appendChild(h);
        card.appendChild(p);

        if(buttonText){

            const strong =
                document.createElement("strong");

            strong.textContent = buttonText;

            card.appendChild(strong);
        }

        /*
         * თუ ბლოკს აქვს ბმული,
         * მთელ ბარათს ვაქცევთ clickable-ად.
         */
        if(link){

            card.style.cursor = "pointer";

            card.addEventListener(
                "click",
                () => {

                    if(b.open_new_tab){

                        window.open(
                            link,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }else{

                        window.location.href =
                            link;
                    }
                }
            );
        }

        grid.appendChild(card);
    });

    ctn.appendChild(grid);
    e.appendChild(ctn);

    return e;
}

function applySections(){
    let main=document.getElementById(
        "mainContent"
    );

    if(
        !main||
        !state.sections.length
    )
        return;

    let existing=new Map(
        [
            ...main.querySelectorAll(
                ":scope > section[id]"
            )
        ]
        .map(x=>[x.id,x])
    );

    [
        ...state.sections
    ]
    .sort(
        (a,b)=>a.sort_order-b.sort_order
    )
    .forEach(s=>{
        let e=existing.get(
            s.id
        );

        if(s.is_custom){
            let n=renderCustom(s);

            n.hidden=
                s.is_visible===false;

            if(e)
                e.replaceWith(n);
            else
                main.appendChild(n);

            return;
        }

        if(!e)
            return;

        e.hidden=
            s.is_visible===false;

        main.appendChild(e);
    });
}

function applyBlocks(){
    [
        "mission",
        "practice",
        "resources",
        "faq",
        "usefulLinks"
    ]
    .forEach(s=>{
        let sec=document.getElementById(
            s
        );

        if(!sec)
            return;

        let rows=state.blocks
            .filter(
                b=>
                    b.section_id===s &&
                    b.is_published
            )
            .sort(
                (a,b)=>a.sort_order-b.sort_order
            );

        let selector={
            mission:".mission-grid",
            practice:".practice-grid",
            resources:".resources-grid",
            faq:".faq-list",
            usefulLinks:".links-grid"
        }[s];

        let grid=sec.querySelector(
            selector
        );

        if(!grid)
            return;

        if(!rows.length){
            if(state.blocksTableLoaded)
                grid.innerHTML="";

            return;
        }

        grid.innerHTML="";

        rows.forEach((b,i)=>{
            grid.appendChild(
                renderBlock(
                    s,
                    b,
                    i
                )
            );
        });
    });
}

async function table(name,fn){
    try{
        let r=await publicDb
            .from(name)
            .select("*");

        if(r.error)
            throw r.error;

        fn(r.data||[]);

        return true;
    }catch(e){
        console.warn(
            `CMS ${name}:`,
            e.message||e
        );

        return false;
    }
}

async function init(){
    let r=await Promise.all([
        table(
            "site_content",
            x=>
                state.content=
                    new Map(
                        x.map(
                            y=>[y.key,y]
                        )
                    )
        ),

        table(
            "site_media",
            x=>
                state.media=
                    new Map(
                        x.map(
                            y=>[y.key,y]
                        )
                    )
        ),

        table(
            "site_links",
            x=>
                state.links=
                    new Map(
                        x.map(
                            y=>[y.key,y]
                        )
                    )
        ),

        table(
            "site_settings",
            x=>
                state.settings=
                    new Map(
                        x.map(
                            y=>[y.key,y.value]
                        )
                    )
        ),

        table(
            "site_sections",
            x=>
                state.sections=x
        ),

        table(
            "site_blocks",
            x=>
                state.blocks=x
        )
    ]);

    state.blocksTableLoaded=r[5];

    if(r[0])
        applyContent();

    if(r[1])
        applyMedia();

    if(r[2])
        applyLinks();

    if(r[3])
        applySettings();

    if(r[4])
        applySections();

    if(r[5])
        applyBlocks();

    document
        .querySelectorAll("[data-language]")
        .forEach(x=>{
            x.addEventListener(
                "click",
                ()=>setTimeout(()=>{
                    applySections();
                    applyBlocks();
                },0)
            );
        });

    try{
        updateBiographyButtonText();
        updateScrollUI();
    }catch{}

    console.log(
        "Paata Shavadze CMS loaded"
    );
}

if(
    document.readyState==="loading"
)
    document.addEventListener(
        "DOMContentLoaded",
        init,
        {once:true}
    );
else
    init();

})();
