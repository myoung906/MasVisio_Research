const { firefox } = require('playwright');

(async () => {
  console.log('🚀 간단한 모바일 메뉴 테스트 시작...');
  
  const browser = await firefox.launch({ 
    headless: false,
    timeout: 30000
  });
  
  const page = await browser.newPage();
  
  // 모바일 뷰포트 설정
  await page.setViewportSize({ width: 375, height: 812 });
  
  try {
    console.log('1. 웹사이트 접속...');
    await page.goto('https://myoung906.github.io/MasVisio_Research/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('2. 페이지 로드 완료, 스크린샷 촬영...');
    await page.screenshot({ path: 'mobile_view.png' });
    console.log('✅ 스크린샷 저장: mobile_view.png');
    
    console.log('3. DOM 구조 분석...');
    const menuElements = await page.$$eval('*[class*="menu"], *[class*="hamburger"], *[class*="nav"], button', elements => {
      return elements.map(el => ({
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        textContent: el.textContent?.trim()
      })).filter(el => el.className || el.id || el.textContent);
    });
    
    console.log('발견된 메뉴 관련 요소들:');
    menuElements.forEach((el, index) => {
      console.log(`  ${index + 1}. ${el.tagName} - class: "${el.className}" - id: "${el.id}" - text: "${el.textContent}"`);
    });
    
    console.log('4. 햄버거 메뉴 버튼 찾기...');
    const hamburgerSelectors = [
      '.hamburger-menu',
      '.menu-toggle', 
      '#menu-toggle',
      '.mobile-menu-toggle',
      '.nav-toggle',
      'button[class*="menu"]',
      '[onclick*="menu"]'
    ];
    
    let menuFound = false;
    for (const selector of hamburgerSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`✅ 햄버거 메뉴 발견: ${selector}`);
          
          // 클릭 테스트
          await element.click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'menu_clicked.png' });
          console.log('✅ 메뉴 클릭 후 스크린샷: menu_clicked.png');
          
          menuFound = true;
          break;
        }
      } catch (error) {
        // 다음 셀렉터 시도
      }
    }
    
    if (!menuFound) {
      console.log('❌ 햄버거 메뉴 버튼을 찾을 수 없습니다.');
    }
    
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
  
  await browser.close();
  console.log('✅ 테스트 완료');
})();