// 언어 데이터 및 전환 기능 구현
const languageData = {
    ko: {
        // 헤더 네비게이션
        nav: {
            home: "홈",
            research: "연구 분야",
            publications: "논문 발표",
            team: "연구진",
            partnership: "파트너십",
            contact: "연락처",
            tools: "도구"
        },
        
        // 드롭다운 메뉴
        dropdown: {
            overview: "연구 개요",
            neuralInterfaces: "신경 인터페이스",
            visualCognition: "시각 인지",
            brainComputer: "뇌-컴퓨터 인터페이스",
            neuroplasticity: "신경가소성",
            clinicalTrials: "임상 시험",
            
            journalPapers: "저널 논문",
            conferenceProceedings: "학회 발표",
            patents: "특허",
            researchGrants: "연구비",
            
            researchTeam: "연구진 소개",
            leadership: "연구 책임자",
            collaborators: "공동 연구자",
            students: "대학원생",
            advisoryBoard: "자문위원회",
            
            forInvestors: "투자자 대상",
            forIndustry: "산업체 대상",
            licensing: "기술 이전",
            collaboration: "공동 연구",
            
            labInfo: "연구실 정보", 
            location: "위치 안내",
            careers: "채용 정보",
            newsUpdates: "뉴스 및 업데이트"
        },
        
        // 메인 히어로 섹션
        hero: {
            title: "혁신적인 시각재활 연구",
            subtitle: "최첨단 신경과학 기술을 통해 시각 장애인의 삶의 질 향상을 위한 획기적인 솔루션을 개발합니다. 뇌-컴퓨터 인터페이스와 신경 자극 기술로 새로운 가능성을 열어갑니다.",
            primaryBtn: "연구 보기",
            secondaryBtn: "파트너십"
        },
        
        // 연구 개요 섹션
        researchOverview: {
            title: "연구 개요",
            description: "우리는 시각재활과 신경과학의 융합을 통해 혁신적인 연구를 수행하고 있습니다. 뇌-컴퓨터 인터페이스, 신경 자극, 시각 보철 등의 첨단 기술을 활용하여 시각 장애인의 독립적인 생활을 지원하는 솔루션을 개발합니다.",
            
            highlights: {
                innovation: {
                    title: "혁신적 접근",
                    description: "최첨단 신경과학과 인공지능 기술을 결합한 독창적인 연구 방법론을 통해 기존의 한계를 뛰어넘는 솔루션을 개발합니다."
                },
                clinical: {
                    title: "임상 적용",
                    description: "연구 결과를 실제 임상 환경에 적용하여 환자들에게 직접적인 도움을 제공하는 것을 목표로 합니다."
                },
                collaboration: {
                    title: "국제 협력",
                    description: "전 세계 연구기관과의 활발한 협력을 통해 글로벌 수준의 연구 성과를 달성하고 있습니다."
                }
            }
        }
    },
    
    en: {
        // Header Navigation
        nav: {
            home: "Home",
            research: "Research",
            publications: "Publications", 
            team: "Team",
            partnership: "Partnership",
            contact: "Contact",
            tools: "Tools"
        },
        
        // Dropdown Menus
        dropdown: {
            overview: "Research Overview",
            neuralInterfaces: "Neural Interfaces",
            visualCognition: "Visual Cognition", 
            brainComputer: "Brain-Computer Interface",
            neuroplasticity: "Neuroplasticity",
            clinicalTrials: "Clinical Trials",
            
            journalPapers: "Journal Papers",
            conferenceProceedings: "Conference Proceedings",
            patents: "Patents",
            researchGrants: "Research Grants",
            
            researchTeam: "Research Team",
            leadership: "Leadership",
            collaborators: "Collaborators",
            students: "Graduate Students", 
            advisoryBoard: "Advisory Board",
            
            forInvestors: "For Investors",
            forIndustry: "For Industry",
            licensing: "Technology Transfer",
            collaboration: "Collaboration",
            
            labInfo: "Lab Information",
            location: "Location",
            careers: "Careers",
            newsUpdates: "News & Updates"
        },
        
        // Main Hero Section
        hero: {
            title: "Innovative Vision Rehabilitation Research",
            subtitle: "We develop groundbreaking solutions to improve the quality of life for visually impaired individuals through cutting-edge neuroscience technology. Opening new possibilities with brain-computer interfaces and neural stimulation technologies.",
            primaryBtn: "View Research",
            secondaryBtn: "Partnership"
        },
        
        // Research Overview Section
        researchOverview: {
            title: "Research Overview", 
            description: "We conduct innovative research through the convergence of vision rehabilitation and neuroscience. Using advanced technologies such as brain-computer interfaces, neural stimulation, and visual prosthetics, we develop solutions that support independent living for visually impaired individuals.",
            
            highlights: {
                innovation: {
                    title: "Innovative Approach",
                    description: "We develop solutions that surpass existing limitations through original research methodologies combining cutting-edge neuroscience and artificial intelligence technologies."
                },
                clinical: {
                    title: "Clinical Application", 
                    description: "We aim to provide direct assistance to patients by applying our research results to actual clinical environments."
                },
                collaboration: {
                    title: "International Collaboration",
                    description: "We achieve global-level research outcomes through active collaboration with research institutions worldwide."
                }
            }
        },
        
        // Research Data Section
        researchData: {
            title: "연구 데이터 및 성과",
            subtitle: "우리의 연구는 실증적 데이터와 정량적 결과를 바탕으로 수행되며, 다음과 같은 성과들을 통해 우리의 연구 역량과 혁신에 대한 헌신을 입증합니다.",
            
            cards: {
                neuralInterface: {
                    label: "신경 인터페이스 테스팅",
                    description: "시각 복원 응용을 위한 신경 인터페이스 장치와 뇌-컴퓨터 인터페이스 시스템의 포괄적인 테스트를 수행합니다."
                },
                clinicalTrials: {
                    label: "임상 시험",
                    description: "시각재활, 신경 자극, 시각 보철 및 보조 기술 분야에서 임상 시험을 수행합니다."
                },
                expertise: {
                    label: "경험과 전문성",
                    description: "국제 전문가들과의 정기적인 교육 및 지속적인 교류를 통해 최고 수준의 연구 품질과 방법론을 보장합니다."
                },
                certification: {
                    label: "인증된 직원",
                    description: "모든 팀원이 ICH & GCP 가이드라인에 따라 인증되어 국제 연구 표준 준수를 보장합니다."
                },
                education: {
                    label: "교육과 연구",
                    description: "시각재활과 신경공학 분야에서 정기적인 세미나를 진행하고 고품질 연구 논문을 지도합니다."
                },
                database: {
                    label: "환자 데이터베이스",
                    description: "서울의 시각재활 센터들과의 강력한 협력을 통해 대규모의 다양한 피험자 데이터베이스를 유지합니다."
                },
                fastRealization: {
                    label: "신속한 구현",
                    description: "효율적인 프로젝트 관리를 통해 귀하의 연구 아이디어와 장치 개발 프로젝트를 단시간 내에 실현할 수 있습니다."
                },
                communication: {
                    label: "신속한 소통",
                    description: "경험이 풍부한 팀에 직접 연락하세요 - 24시간 내에 응답하고 귀하의 요청을 신속하게 만족스럽게 처리합니다."
                },
                internationality: {
                    label: "국제성",
                    description: "특히 시각재활과 신경 인터페이스 연구 분야에서 전 세계의 고객과 연구 협력 관계를 맺고 있습니다."
                },
                experience: {
                    label: "10년 이상의 경험",
                    description: "시각재활 연구에서의 다년간의 경험과 국제 학술 협회를 통한 혜택을 누리세요."
                },
                interdisciplinary: {
                    label: "학제간 연구",
                    description: "서울의 대학교와 의료기기 산업과의 근접성을 통한 광범위한 네트워킹의 이점을 활용하세요."
                },
                highTech: {
                    label: "첨단 기술",
                    description: "시각재활 연구에서 최적이고 재현 가능한 결과를 제공하기 위해 정확하고 최신 기술로 작업합니다."
                }
            },
            
            certification: {
                title: "우리는 인증받았습니다!",
                standard: "ISO 9001:2015",
                description: "연구 우수성을 위한 품질 관리 시스템"
            }
        }
    },
    
    en: {
        // Header Navigation
        nav: {
            home: "Home",
            research: "Research",
            publications: "Publications", 
            team: "Team",
            partnership: "Partnership",
            contact: "Contact",
            tools: "Tools"
        },
        
        // Dropdown Menus
        dropdown: {
            overview: "Research Overview",
            neuralInterfaces: "Neural Interfaces",
            visualCognition: "Visual Cognition", 
            brainComputer: "Brain-Computer Interface",
            neuroplasticity: "Neuroplasticity",
            clinicalTrials: "Clinical Trials",
            
            journalPapers: "Journal Papers",
            conferenceProceedings: "Conference Proceedings",
            patents: "Patents",
            researchGrants: "Research Grants",
            
            researchTeam: "Research Team",
            leadership: "Leadership",
            collaborators: "Collaborators",
            students: "Graduate Students", 
            advisoryBoard: "Advisory Board",
            
            forInvestors: "For Investors",
            forIndustry: "For Industry",
            licensing: "Technology Transfer",
            collaboration: "Collaboration",
            
            labInfo: "Lab Information",
            location: "Location",
            careers: "Careers",
            newsUpdates: "News & Updates"
        },
        
        // Main Hero Section
        hero: {
            title: "Innovative Vision Rehabilitation Research",
            subtitle: "We develop groundbreaking solutions to improve the quality of life for visually impaired individuals through cutting-edge neuroscience technology. Opening new possibilities with brain-computer interfaces and neural stimulation technologies.",
            primaryBtn: "View Research",
            secondaryBtn: "Partnership"
        },
        
        // Research Overview Section
        researchOverview: {
            title: "Research Overview", 
            description: "We conduct innovative research through the convergence of vision rehabilitation and neuroscience. Using advanced technologies such as brain-computer interfaces, neural stimulation, and visual prosthetics, we develop solutions that support independent living for visually impaired individuals.",
            
            highlights: {
                innovation: {
                    title: "Innovative Approach",
                    description: "We develop solutions that surpass existing limitations through original research methodologies combining cutting-edge neuroscience and artificial intelligence technologies."
                },
                clinical: {
                    title: "Clinical Application", 
                    description: "We aim to provide direct assistance to patients by applying our research results to actual clinical environments."
                },
                collaboration: {
                    title: "International Collaboration",
                    description: "We achieve global-level research outcomes through active collaboration with research institutions worldwide."
                }
            }
        },
        
        // Research Data Section
        researchData: {
            title: "Research Data and Achievements",
            subtitle: "Our research is conducted based on empirical data and quantitative results, demonstrating our research capabilities and commitment to excellence and innovation through the following achievements.",
            
            cards: {
                neuralInterface: {
                    label: "Neural Interface Testing",
                    description: "We conduct comprehensive testing of neural interface devices and brain-computer interface systems for vision restoration applications."
                },
                clinicalTrials: {
                    label: "Clinical Trials",
                    description: "We conduct clinical trials in the fields of vision rehabilitation, neural stimulation, visual prosthetics and assistive technologies."
                },
                expertise: {
                    label: "Experience and Expertise",
                    description: "Regular training and constant exchange with international experts guarantee the highest level of research quality and methodology."
                },
                certification: {
                    label: "Certified Staff",
                    description: "All team members are certified according to ICH & GCP guidelines ensuring compliance with international research standards."
                },
                education: {
                    label: "Education and Research",
                    description: "We conduct regular seminars and supervise high-quality research theses in vision rehabilitation and neural engineering fields."
                },
                database: {
                    label: "Patient Database",
                    description: "We maintain a large and diverse subject database through strong cooperation with vision rehabilitation centers in Seoul."
                },
                fastRealization: {
                    label: "Fast Realization",
                    description: "We are able to realize your research ideas and device development projects in short time with efficient project management."
                },
                communication: {
                    label: "Short Communication",
                    description: "Contact our experienced team directly - we respond within 24 hours and handle your requests quickly to your satisfaction."
                },
                internationality: {
                    label: "Internationality",
                    description: "We have customers and research cooperations all over the globe, particularly in vision rehabilitation and neural interface research."
                },
                experience: {
                    label: "10+ Years of Experience",
                    description: "Benefit from our years of experience in vision rehabilitation research and our international academic associations."
                },
                interdisciplinary: {
                    label: "Interdisciplinary",
                    description: "Take advantage of our extensive networking through proximity to universities and the medical device industry in Seoul."
                },
                highTech: {
                    label: "High-Tech",
                    description: "We work with precise and latest technology to provide optimal and reproducible results in vision rehabilitation research."
                }
            },
            
            certification: {
                title: "We are certified!",
                standard: "ISO 9001:2015",
                description: "Quality Management System for Research Excellence"
            }
        }
    }
};

// 언어 전환 기능 구현
let currentLanguage = 'ko'; // 기본값: 한국어

// 언어 전환 함수
function switchLanguage(lang) {
    console.log('언어 전환 시도:', lang); // 디버깅
    
    if (lang === currentLanguage) return; // 같은 언어면 변경하지 않음
    
    currentLanguage = lang;
    console.log('현재 언어 변경됨:', currentLanguage); // 디버깅
    
    // 브라우저 저장소에 언어 설정 저장
    localStorage.setItem('preferred-language', lang);
    
    // HTML lang 속성 변경
    document.documentElement.lang = lang;
    
    // 언어 버튼 활성화 상태 변경
    updateLanguageButtons();
    
    // 콘텐츠 업데이트
    updateContent();
}

// 언어 버튼 활성화 상태 업데이트
function updateLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

// 페이지 콘텐츠 업데이트
function updateContent() {
    const data = languageData[currentLanguage];
    
    // 네비게이션 메뉴 업데이트
    updateNavigation(data);
    
    // 히어로 섹션 업데이트
    updateHeroSection(data);
    
    // 연구 개요 섹션 업데이트
    updateResearchOverview(data);
    
    // 연구 데이터 섹션 업데이트
    updateResearchData(data);
}

// 네비게이션 메뉴 업데이트
function updateNavigation(data) {
    // 메인 네비게이션 업데이트
    const navItems = {
        'nav-home': data.nav.home,
        'nav-research': data.nav.research,
        'nav-publications': data.nav.publications,
        'nav-team': data.nav.team,
        'nav-partnership': data.nav.partnership,
        'nav-contact': data.nav.contact,
        'nav-tools': data.nav.tools
    };
    
    Object.keys(navItems).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = navItems[id];
        }
    });
    
    // 드롭다운 메뉴 업데이트
    const dropdownItems = {
        'dropdown-overview': data.dropdown.overview,
        'dropdown-neural': data.dropdown.neuralInterfaces,
        'dropdown-visual': data.dropdown.visualCognition,
        'dropdown-brain': data.dropdown.brainComputer,
        'dropdown-neuro': data.dropdown.neuroplasticity,
        'dropdown-clinical': data.dropdown.clinicalTrials,
        'dropdown-journal': data.dropdown.journalPapers,
        'dropdown-conference': data.dropdown.conferenceProceedings,
        'dropdown-patents': data.dropdown.patents,
        'dropdown-grants': data.dropdown.researchGrants,
        'dropdown-team': data.dropdown.researchTeam,
        'dropdown-leadership': data.dropdown.leadership,
        'dropdown-collaborators': data.dropdown.collaborators,
        'dropdown-students': data.dropdown.students,
        'dropdown-advisory': data.dropdown.advisoryBoard,
        'dropdown-investors': data.dropdown.forInvestors,
        'dropdown-industry': data.dropdown.forIndustry,
        'dropdown-licensing': data.dropdown.licensing,
        'dropdown-collaboration': data.dropdown.collaboration,
        'dropdown-lab': data.dropdown.labInfo,
        'dropdown-location': data.dropdown.location,
        'dropdown-careers': data.dropdown.careers,
        'dropdown-news': data.dropdown.newsUpdates
    };
    
    Object.keys(dropdownItems).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = dropdownItems[id];
        }
    });
}

// 히어로 섹션 업데이트
function updateHeroSection(data) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const primaryBtn = document.querySelector('.btn-research.primary');
    const secondaryBtn = document.querySelector('.btn-research.secondary');
    
    if (heroTitle) heroTitle.textContent = data.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
    if (primaryBtn) primaryBtn.textContent = data.hero.primaryBtn;
    if (secondaryBtn) secondaryBtn.textContent = data.hero.secondaryBtn;
}

// 연구 개요 섹션 업데이트
function updateResearchOverview(data) {
    const overviewTitle = document.querySelector('.research-overview .section-title');
    const overviewText = document.querySelector('.research-text');
    
    if (overviewTitle) overviewTitle.textContent = data.researchOverview.title;
    if (overviewText) overviewText.textContent = data.researchOverview.description;
    
    // 하이라이트 카드 업데이트
    const highlights = document.querySelectorAll('.highlight-card');
    const highlightKeys = ['innovation', 'clinical', 'collaboration'];
    
    highlights.forEach((card, index) => {
        if (highlightKeys[index] && data.researchOverview.highlights[highlightKeys[index]]) {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const highlight = data.researchOverview.highlights[highlightKeys[index]];
            
            if (title) title.textContent = highlight.title;
            if (description) description.textContent = highlight.description;
        }
    });
}

// 연구 데이터 섹션 업데이트
function updateResearchData(data) {
    const dataTitle = document.querySelector('.research-data h2');
    const dataSubtitle = document.querySelector('.research-data .section-subtitle');
    
    if (dataTitle) dataTitle.textContent = data.researchData.title;
    if (dataSubtitle) dataSubtitle.textContent = data.researchData.subtitle;
    
    // 데이터 카드 업데이트
    const dataCards = document.querySelectorAll('.data-card');
    const cardKeys = ['neuralInterface', 'clinicalTrials', 'expertise', 'certification', 'education', 'database', 'fastRealization', 'communication', 'internationality', 'experience', 'interdisciplinary', 'highTech'];
    
    dataCards.forEach((card, index) => {
        if (cardKeys[index] && data.researchData.cards[cardKeys[index]]) {
            const label = card.querySelector('.data-label');
            const description = card.querySelector('.data-description');
            const cardData = data.researchData.cards[cardKeys[index]];
            
            if (label) label.textContent = cardData.label;
            if (description) description.textContent = cardData.description;
        }
    });
    
    // 인증 섹션 업데이트
    const certTitle = document.querySelector('.certification-title');
    const certStandard = document.querySelector('.certification-standard');
    const certDescription = document.querySelector('.certification-description');
    
    if (certTitle) certTitle.textContent = data.researchData.certification.title;
    if (certStandard) certStandard.textContent = data.researchData.certification.standard;
    if (certDescription) certDescription.textContent = data.researchData.certification.description;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 저장된 언어 설정 확인
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languageData[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    
    // 초기 콘텐츠 업데이트
    updateLanguageButtons();
    updateContent();
});