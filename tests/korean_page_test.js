const { firefox } = require('playwright');

(async () => {
  console.log('🚀 한국어 페이지 모바일 메뉴 테스트 시작...');
  
  const browser = await firefox.launch({ 
    headless: false,
    timeout: 30000
  });
  
  const page = await browser.newPage();
  
  // 모바일 뷰포트 설정
  await page.setViewportSize({ width: 375, height: 812 });
  
  try {
    console.log('1. 한국어 페이지 접속...');
    await page.goto('https://myoung906.github.io/MasVisio_Research/ko/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('2. 한국어 페이지 로드 완료, 스크린샷 촬영...');
    await page.screenshot({ path: 'ko_mobile_view.png' });
    console.log('✅ 스크린샷 저장: ko_mobile_view.png');
    
    console.log('3. 한국어 페이지 햄버거 메뉴 찾기...');
    const hamburgerElement = await page.$('.mobile-menu-toggle');
    
    if (hamburgerElement) {
      console.log('✅ 한국어 페이지에서 햄버거 메뉴 발견!');
      
      console.log('4. 햄버거 메뉴 클릭 테스트...');
      await hamburgerElement.click();
      await page.waitForTimeout(2000);
      
      console.log('5. 메뉴 열림 상태 스크린샷 촬영...');
      await page.screenshot({ path: 'ko_menu_opened.png' });
      console.log('✅ 한국어 페이지 메뉴 열림 스크린샷: ko_menu_opened.png');
      
      console.log('6. 모바일 메뉴 내용 확인...');
      const mobileMenuContent = await page.$eval('#mobile-nav-menu', el => el.textContent);
      console.log('모바일 메뉴 내용:', mobileMenuContent.trim());
      
      console.log('7. 메뉴 닫기 테스트...');
      await hamburgerElement.click();
      await page.waitForTimeout(2000);
      
      console.log('8. 메뉴 닫힘 상태 스크린샷 촬영...');
      await page.screenshot({ path: 'ko_menu_closed.png' });
      console.log('✅ 한국어 페이지 메뉴 닫힘 스크린샷: ko_menu_closed.png');
      
    } else {
      console.log('❌ 한국어 페이지에서 햄버거 메뉴 버튼을 찾을 수 없습니다.');
      
      // 모든 가능한 메뉴 요소 찾기
      const menuElements = await page.$$eval('*[class*="menu"], *[class*="hamburger"], *[class*="nav"], button', elements => {
        return elements.map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          textContent: el.textContent?.trim().substring(0, 50) + '...'
        })).filter(el => el.className || el.id);
      });
      
      console.log('발견된 메뉴 관련 요소들:');
      menuElements.forEach((el, index) => {
        console.log(`  ${index + 1}. ${el.tagName} - class: "${el.className}" - id: "${el.id}"`);
      });
    }
    
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
  
  await browser.close();
  console.log('✅ 한국어 페이지 테스트 완료');
})();