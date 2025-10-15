const { chromium, firefox, webkit } = require('playwright');

async function testMobileMenu() {
  console.log('🚀 모바일 메뉴 테스트 시작...');
  
  // Firefox 사용 (macOS Catalina에서 가장 안정적)
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X 크기
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('1. GitHub Pages 웹사이트 접속 중...');
    await page.goto('https://myoung906.github.io/MasVisio_Research/');
    await page.waitForLoadState('networkidle');
    
    console.log('2. 페이지 스크린샷 촬영...');
    await page.screenshot({ path: 'main_page_mobile.png', fullPage: true });
    
    console.log('3. 햄버거 메뉴 버튼 찾기...');
    const hamburgerButton = await page.locator('.hamburger-menu, .menu-toggle, #menu-toggle, [class*="hamburger"], [class*="menu-button"]').first();
    
    if (await hamburgerButton.count() > 0) {
      console.log('✅ 햄버거 메뉴 버튼 발견!');
      console.log('4. 햄버거 메뉴 클릭 테스트...');
      
      await hamburgerButton.click();
      await page.waitForTimeout(1000);
      
      console.log('5. 메뉴 열림 상태 스크린샷...');
      await page.screenshot({ path: 'menu_opened_mobile.png', fullPage: true });
      
      console.log('6. 메뉴 닫기 테스트...');
      await hamburgerButton.click();
      await page.waitForTimeout(1000);
      
      console.log('7. 메뉴 닫힘 상태 스크린샷...');
      await page.screenshot({ path: 'menu_closed_mobile.png', fullPage: true });
      
    } else {
      console.log('❌ 햄버거 메뉴 버튼을 찾을 수 없습니다.');
      console.log('4. 모든 버튼 요소 찾기...');
      const allButtons = await page.locator('button, [onclick], [class*="menu"], [class*="nav"]').all();
      console.log(`발견된 버튼/메뉴 요소 수: ${allButtons.length}`);
    }
    
    console.log('8. 한국어 서브페이지 테스트...');
    const koLink = await page.locator('a[href*="ko"]').first();
    if (await koLink.count() > 0) {
      await koLink.click();
      await page.waitForLoadState('networkidle');
      
      console.log('9. 한국어 페이지 햄버거 메뉴 테스트...');
      const koHamburgerButton = await page.locator('.hamburger-menu, .menu-toggle, #menu-toggle, [class*="hamburger"], [class*="menu-button"]').first();
      
      if (await koHamburgerButton.count() > 0) {
        console.log('✅ 한국어 페이지 햄버거 메뉴 발견!');
        await koHamburgerButton.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'ko_menu_opened_mobile.png', fullPage: true });
      } else {
        console.log('❌ 한국어 페이지에서 햄버거 메뉴를 찾을 수 없습니다.');
      }
    } else {
      await page.goto('https://myoung906.github.io/MasVisio_Research/ko/');
      await page.waitForLoadState('networkidle');
      
      const koHamburgerButton = await page.locator('.hamburger-menu, .menu-toggle, #menu-toggle, [class*="hamburger"], [class*="menu-button"]').first();
      
      if (await koHamburgerButton.count() > 0) {
        console.log('✅ 한국어 페이지 햄버거 메뉴 발견!');
        await koHamburgerButton.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'ko_menu_opened_mobile.png', fullPage: true });
      } else {
        console.log('❌ 한국어 페이지에서 햄버거 메뉴를 찾을 수 없습니다.');
      }
    }
    
    console.log('✅ 모바일 메뉴 테스트 완료!');
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error.message);
  } finally {
    await browser.close();
  }
}

testMobileMenu();