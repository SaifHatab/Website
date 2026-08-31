/*=============== TABS BUTTONS WITH SMOOTH ANIMATION ===============*/ 
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      const targetSelector = tab.dataset.target,
            targetContent = document.querySelector(targetSelector),
            currentContent = document.querySelector('[data-content].main-active')

      // Avoid re-triggering if the same tab is clicked
      if(targetContent === currentContent) return

      // Switch active button
      tabs.forEach((t) => t.classList.remove('main-active'))
      tab.classList.add('main-active')

      // Fade out current content
      currentContent.classList.remove('show')

      currentContent.addEventListener('transitionend', function handler(){
         currentContent.classList.remove('main-active')
         currentContent.removeEventListener('transitionend', handler)

         // Fade in new content
         targetContent.classList.add('main-active')

         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               targetContent.classList.add('show')
            })
         })
      }, { once: true })
   })
})


/*=============== INITIAL FADE IN ON LOAD ===============*/
window.addEventListener('load', () => {
   const initialContent = document.querySelector('[data-content].main-active')
   requestAnimationFrame(() => {
      requestAnimationFrame(() => {
         initialContent.classList.add('show')
      })
   })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'right',
   distance: '200px',
   duration: 1500,
   delay: 300,
   easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
})

sr.reveal(`.main__content`, {origin: 'top'})
sr.reveal(`.profile`, {delay: 600})
sr.reveal(`.profile__img`, {rotate: {z: -55}, scale: 0, delay: 900})
sr.reveal(`.profile__greeting`, {delay: 900})
sr.reveal(`.profile__name`, {delay: 1100})
sr.reveal(`.profile__buttons`, {delay: 1300, scale: 0})
sr.reveal(`.profile__data .section__title`, {delay: 1500})
sr.reveal(`.profile__description`, {delay: 1700})
sr.reveal(`.main__area`, {origin: 'left', delay: 2000})

/*=============== PROJECTS LIGHTBOX ===============*/
const lightbox = document.getElementById('lightbox'),
      lightboxImg = document.getElementById('lightbox-img'),
      lightboxClose = document.getElementById('lightbox-close'),
      projectLinks = document.querySelectorAll('.projects__link')

const openLightbox = (src, alt) => {
   lightboxImg.setAttribute('src', src)
   lightboxImg.setAttribute('alt', alt)
   lightbox.classList.add('show')
   document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
   lightbox.classList.remove('show')
   document.body.style.overflow = ''
}

projectLinks.forEach((link) => {
   link.addEventListener('click', (e) => {
      e.preventDefault()
      const img = link.querySelector('.projects__img')
      openLightbox(img.getAttribute('src'), img.getAttribute('alt'))
   })
})

lightboxClose.addEventListener('click', closeLightbox)

// Close when clicking the dark backdrop (but not the image itself)
lightbox.addEventListener('click', (e) => {
   if (e.target === lightbox) closeLightbox()
})

// Close on Escape key
document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox()
})

/*=============== I18N / LANGUAGE SWITCHER ===============*/
const translations = {
   en: {
      page_title: "Mostafa Rashed - Portfolio",
      greeting: "Hello, I'm",
      nav_info: "Information",
      nav_projects: "Projects",
      profile_title: "Profile",
      profile_desc: "Seeking a position as a dental technician in a dental lab, medical complex, or hospital to expand my professional experience and skills, exchange prior scientific expertise with the work team, and build my professional path in a highly professional environment while gaining practical experience.",

      skills_title: "Skills",
      skills_item1: "Proficient in Exocad software",
      skills_item2: "Handling all lab tasks and supervision",

      tools_title: "Tools & Technologies",
      tools_exocad: "Exocad",
      tools_invisalign: "Invisalign",
      tools_3shape: "3Shape Dental System",
      tools_printers: "3D Printers (Models & Try-ins)",

      experience_title: "Experience",

      exp1_date: "2017",
      exp1_title: "Dental Technician — Sidi Ghazi General Hospital, Kafr El-Sheikh",
      exp1_item1: "Responsible for all lab tasks assigned regarding mobile dental prosthetics",
      exp1_item2: "Handled removable prosthetic appliances for patients",
      exp1_item3: "Worked directly within a hospital dental team",

      exp2_date: "2018",
      exp2_title: "Dental Technician — Private Dental Lab, Dakahlia",
      exp2_item1: "Worked with all types of fixed prosthetics",
      exp2_item2: "Specialized in ceramic restorations",
      exp2_item3: "Specialized in metal framework restorations",

      exp3_date: "2019",
      exp3_title: "Dental Technician — Private Dental Lab, Cairo",
      exp3_item1: "Worked with all types of fixed prosthetics",
      exp3_item2: "Specialized in porcelain restorations",
      exp3_item3: "Delivered precise, patient-specific fixed work",

      exp4_date: "2021",
      exp4_title: "Dental Technician — Al-Fares Dental Lab (Vita-Kulzer-Rnefert certified)",
      exp4_item1: "Trained at an internationally certified dental prosthetics lab",
      exp4_item2: "Developed skills in CAD/CAM workflow using Exocad",
      exp4_item3: "Worked with zirconia and lens-based restorations",

      exp5_date: "2021",
      exp5_title: "Dental Technician — Dental Medical Complex, Al-Ahsa, Saudi Arabia",
      exp5_item1: "Handled all lab tasks: mobile prosthetics, ceramics, molds, and metal frameworks",
      exp5_item2: "Supervised lab equipment maintenance",
      exp5_item3: "Managed tasks independently to achieve optimal results",

      exp6_date: "2024",
      exp6_title: "Dental Technician — Taj Care for Dentistry and Dental Implants, Hafr Al-Batin",
      exp6_item1: "Worked at a dental and implant care center",
      exp6_item2: "Handled dental prosthetics work at the facility",
      exp6_item3: "Contributed to the center's dental and implant care team",

      exp7_date: "2025 – Present",
      exp7_title: "Dental Technician — Dental Lab, Jeddah",
      exp7_item1: "Currently working at a dental lab in Jeddah",
      exp7_item2: "Handling ongoing dental prosthetics production",
      exp7_item3: "Continuing professional development in the role",

      education_title: "Education",
      edu1_date: "2016",
      edu1_title: "Tanta University — Technical Health Institute",

      projects_title: "Projects",
   },
   ar: {
      page_title: "مصطفى راشد - السيرة الذاتية",
      greeting: "مرحباً، أنا",
      nav_info: "المعلومات",
      nav_projects: "المشاريع",
      profile_title: "نبذة",
      profile_desc: "أبحث عن وظيفة فني أسنان في معمل أسنان أو مجمع طبي أو مستشفى لتوسيع خبرتي المهنية ومهاراتي، وتبادل الخبرة العلمية السابقة مع فريق العمل، وبناء مساري المهني في بيئة عالية الاحترافية مع اكتساب خبرة عملية.",

      skills_title: "المهارات",
      skills_item1: "إتقان برنامج Exocad",
      skills_item2: "إدارة جميع مهام المعمل والإشراف عليها",

      tools_title: "الأدوات والتقنيات",
      tools_exocad: "Exocad",
      tools_invisalign: "Invisalign",
      tools_3shape: "نظام 3Shape Dental System",
      tools_printers: "طابعات ثلاثية الأبعاد (نماذج وتجارب القياس)",

      experience_title: "الخبرة العملية",

      exp1_date: "2017",
      exp1_title: "فني أسنان — مستشفى سيدي غازي العام، كفر الشيخ",
      exp1_item1: "مسؤول عن جميع مهام المعمل الخاصة بالأطقم السنية المتحركة",
      exp1_item2: "التعامل مع الأطقم التعويضية المتحركة للمرضى",
      exp1_item3: "العمل بشكل مباشر ضمن فريق طب أسنان بالمستشفى",

      exp2_date: "2018",
      exp2_title: "فني أسنان — معمل أسنان خاص، الدقهلية",
      exp2_item1: "العمل مع جميع أنواع التعويضات الثابتة",
      exp2_item2: "التخصص في الترميمات الخزفية",
      exp2_item3: "التخصص في ترميمات الهياكل المعدنية",

      exp3_date: "2019",
      exp3_title: "فني أسنان — معمل أسنان خاص، القاهرة",
      exp3_item1: "العمل مع جميع أنواع التعويضات الثابتة",
      exp3_item2: "التخصص في ترميمات البورسلين",
      exp3_item3: "تقديم عمل ثابت دقيق يناسب كل مريض",

      exp4_date: "2021",
      exp4_title: "فني أسنان — معمل الفارس لطب الأسنان (معتمد من Vita-Kulzer-Rnefert)",
      exp4_item1: "التدريب في معمل معتمد دولياً للتعويضات السنية",
      exp4_item2: "تطوير المهارات في سير عمل CAD/CAM باستخدام Exocad",
      exp4_item3: "العمل مع الزركونيا والترميمات القائمة على العدسات",

      exp5_date: "2021",
      exp5_title: "فني أسنان — المجمع الطبي لطب الأسنان، الأحساء، المملكة العربية السعودية",
      exp5_item1: "إدارة جميع مهام المعمل: التعويضات المتحركة، الخزف، القوالب، والهياكل المعدنية",
      exp5_item2: "الإشراف على صيانة معدات المعمل",
      exp5_item3: "إدارة المهام بشكل مستقل لتحقيق أفضل النتائج",

      exp6_date: "2024",
      exp6_title: "فني أسنان — تاج كير لطب الأسنان وزراعة الأسنان، حفر الباطن",
      exp6_item1: "العمل في مركز رعاية طب الأسنان والزراعة",
      exp6_item2: "التعامل مع أعمال التعويضات السنية في المركز",
      exp6_item3: "المساهمة في فريق رعاية طب الأسنان والزراعة بالمركز",

      exp7_date: "2025 – حتى الآن",
      exp7_title: "فني أسنان — معمل أسنان، جدة",
      exp7_item1: "العمل حالياً في معمل أسنان بجدة",
      exp7_item2: "إدارة إنتاج التعويضات السنية المستمر",
      exp7_item3: "الاستمرار في التطوير المهني بالوظيفة",

      education_title: "التعليم",
      edu1_date: "2016",
      edu1_title: "جامعة طنطا — المعهد الفني الصحي",

      projects_title: "المشاريع",
   }
}

const htmlRoot = document.getElementById('html-root')
const langButtons = document.querySelectorAll('.lang-switch__btn')
const i18nElements = document.querySelectorAll('[data-i18n]')

function setLanguage(lang) {
   const dict = translations[lang] || translations.en

   i18nElements.forEach((el) => {
      const key = el.dataset.i18n
      if (dict[key] === undefined) return

      if (el.tagName === 'TITLE') {
         document.title = dict[key]
      } else {
         el.textContent = dict[key]
      }
   })

   htmlRoot.setAttribute('lang', lang)
   htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')

   langButtons.forEach((btn) => {
      btn.classList.toggle('main-active', btn.dataset.lang === lang)
   })

   localStorage.setItem('portfolio-lang', lang)
}

langButtons.forEach((btn) => {
   btn.addEventListener('click', () => setLanguage(btn.dataset.lang))
})

// Apply saved or browser-preferred language on load
const savedLang = localStorage.getItem('portfolio-lang')
const browserLang = navigator.language && navigator.language.startsWith('ar') ? 'ar' : 'en'
setLanguage(savedLang || browserLang)
