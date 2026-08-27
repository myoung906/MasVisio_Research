# Optinex 광학·시각증강 회사 웹사이트 마스터 블루프린트

> 문서 버전: 1.0  
> 작성일: 2026-08-26 (개정 2026-08-27)  
> 개정 근거: 창업자 인터뷰 `conversation_2026-08-26_myoung906_interview.md`, 창업자 검토 회신 2026-08-27, 저장소 실측 감사  
> 기준 저장소: [`myoung906/MasVisio_Research`](https://github.com/myoung906/MasVisio_Research), `master@e1519d5`  
> 기준 공개 사이트: <https://myoung906.github.io/MasVisio_Research/ko/index.html?v=5.0>  
> 내부 연구 기반: `optinex-station:/home/jmseo/Documents/Optinex_Research`의 구조·운영 문서 및 사용자 인터뷰  
> 문서 성격: 회사 전략, 과학 커뮤니케이션, 정보구조, UX, 콘텐츠 모델, 개발 아키텍처를 하나로 묶은 구현 기준서

---

## 0. 이 문서가 내리는 핵심 결정

현재 사이트는 버릴 대상이 아니다. 실험 결과, 연구 사진, 논문·학술발표, 프로토타입, 주변부 시야에 관한 오랜 문제의식이 이미 축적되어 있다. 개편의 목적은 이 자산을 줄이는 것이 아니라 **하나의 회사 방향 아래 재배열하고, 각각의 근거 수준과 전략적 의미를 더 정확히 보여주는 것**이다.

### 0.1 결정의 3계층

이 문서의 모든 항목은 다음 세 등급 중 하나다. 등급을 섞어 읽으면 창업자의 확정 사항과 문서 작성자의 의견이 구분되지 않는다.

- **`[확정]`** — 창업자가 이미 결정했다. 이 문서는 실행 방법만 제안한다. 변경하려면 창업자 승인과 §26 의사결정 로그 기재가 필요하다.
- **`[제안]`** — 이 문서가 새로 제안한다. 승인 대기 상태이며 거부될 수 있다.
- **`[가설]`** — 아직 검증되지 않았다. 결정이 아니며, 공개 표현에서는 `Hypothesis` 배지를 붙인다.

### 0.2 `[확정]` — 창업자 결정 사항

출처: 인터뷰 2026-08-26, 검토 회신 2026-08-27.

| # | 확정 내용 | 확정일 |
|---|---|---|
| C1 | 목적지는 **(b) 정상 시각을 인간 표준 이상으로 끌어올리는 증강**이다. (a) 회복은 진입 발판이다. | 2026-08-26 |
| C2 | 북극성은 **주변부 망막 완전교정**이다. | 2026-08-26 |
| C3 | 1호 탐사선은 **주변부 프로그래머블 튜닝블렌즈 안경**이다(포트폴리오 9개 중 선택 완료). | 2026-08-26 |
| C4 | 조직은 **핵심 1인 + 본업 병행 파트너**다. 임상 기관 접근권은 이미 확보되어 있다. | 2026-08-26 |
| C5 | **장비를 직접 양산·판매하지 않는다.** 검증된 결과물이 나오면 **기술이전 또는 특허 보유**로 간다. SaaS·앱 형태를 병행 가능성으로 둔다. | 2026-08-27 |
| C6 | **현재 가용 자본은 0이다.** 자본 집약적 경쟁에 참여하지 않는 것을 전제로 모든 계획을 세운다. | 2026-08-27 |
| C7 | 웹사이트는 **Track A(기존 정적 사이트 유지·보수)**로 간다. Track B(전면 재구축)는 수익 발생 이후 검토한다. | 2026-08-27 |
| C8 | 상표는 **`Optinex Research`**로 하며 출원 시점은 **2027년경**이다. | 2026-08-27 |
| C9 | 논문·발표 저자는 본인이다. 민감정보 레코드(§22 구 24번)는 **공개 목록에서 삭제**한다. | 2026-08-27 |

C5는 인터뷰 시점의 답변(본선 = 자작 저가 장비 + 구독 SW)을 2026-08-27자로 갱신한 것이다. 하드웨어 역량은 여전히 해자이지만, **그 해자를 수익화하는 방식이 자체 양산이 아니라 IP 이전**으로 바뀌었다. 이 변경의 최대 파급은 §10이다. **기술이전 회사에서는 특허가 곧 제품이므로, 자기공지 감사(§10.0)가 이 문서 전체에서 가장 시급한 항목이 된다.**

### 0.3 `[제안]` — 이 문서가 제안하는 것

1. **Optinex의 범주를 `Adaptive Vision Platform`으로 정의한다.** 단순 연구소, AI 안질환 진단회사, 안경 판매회사 중 하나로 좁히지 않는다.
2. **`Optinex`와 `Optinex Research`를 구분한다.** Optinex는 회사·플랫폼 브랜드이고, Optinex Research는 그 주장을 만들어내고 검증하는 연구 엔진이다. (C8에 따라 대외 상표는 `Optinex Research`가 된다.)
3. **기존 연구결과는 보존한다.** 현재 데이터의 논문·학술발표와 도전과제의 내부 실험, 장치, 원본 결과 이미지를 근거 데이터베이스로 이관한다. 단 홈에 모두 펼치지 않고 프로그램·증거 단계·연도·유형으로 탐색하게 한다. **예외: 민감정보에 해당하는 레코드는 이관하지 않는다(§3.1, §22).**
4. **연구결과와 제품성능을 혼동하지 않는다.** 직접 수행한 내부 연구는 `Investigator-conducted study`로 당당하게 공개하되, 탐색 연구의 AUC나 정밀도가 상용 의료기기의 확정 성능처럼 읽히지 않도록 표본·프로토콜·검증 범위를 붙인다.
5. **`기술이전 가능 단위(licensable unit)`를 새 콘텐츠 타입으로 만든다.** C5에 따라 사이트의 1차 전환 목표가 기술이전 문의이므로, "무엇을 알아냈는가"(Evidence)와 별개로 "무엇을 가져갈 수 있는가"를 보여주는 페이지가 필요하다(§5.3).

### 0.4 `[가설]` — 검증 대상

- H1. 성인의 주변부 굴절을 능동 교정하면 **탐지 역치·저대비 해상·주변부 대비감도**가 개선된다. **주의: 고대비 해상시력은 망막 신경 샘플링 한계로 개선되지 않는다(§4.2).**
- H2. H1의 광학·지각 개선이 보행·탐색·반응시간 등 **기능 성능**으로 전이된다.
- H3. 개인별 wide-field 모델의 예측 오차가 실용 허용범위 안에 든다.

---

## 1. 회사의 거시적 그림

### 1.1 한 문장 정의

**Optinex는 개인의 눈, 시선, 환경을 측정해 시야 전체에 필요한 광학 상태를 모델링하고, 이를 적응형 광학계로 구현하려는 시각증강 플랫폼 회사다.**

짧은 표현은 다음 중 하나를 사용한다.

- 한국어: **시야 전체를 위한 적응형 광학 플랫폼**
- 영어: **Adaptive optics for the whole visual field**
- 비전 문구: **Vision, beyond correction.**

`Vision OS`는 투자자·연구자에게 장기 아키텍처를 설명하는 비유로는 강력하지만, 현재 출시된 운영체제처럼 오해될 수 있다. 따라서 대외 카테고리는 `Adaptive Vision Platform`, 장기 비전 설명 안에서만 `a personalized vision operating layer`를 사용한다.

#### 상표·도메인 실사 `[확정 C8 + 제안]`

대외 상표는 **`Optinex Research`**이며 출원 시점은 **2027년경**이다. 다만 **한국 상표법은 선출원주의**이므로, 먼저 사용했다는 사실은 타인의 선출원을 막지 못한다. 출원을 2027년으로 미루더라도 **조사와 도메인 확보는 지금 해야 한다.**

확인된 명칭 충돌(2026-08-27 기준): `OptiNex`(엔터프라이즈 SEO 에이전시), [`OPTINEX SYSTEM LTD`](https://find-and-update.company-information.service.gov.uk/company/16048596)(영국 법인), `OPTINEX DIGITAL LIMITED`. 모두 광학·의료 분야가 아니므로 아래 류(類)는 열려 있을 가능성이 있으나 실사가 필요하다.

| 항목 | 지금 (비용 거의 없음) | 2027년 |
|---|---|---|
| KIPRIS 선등록 조사 | 제9류(측정기기)·제10류(의료기기)·제42류(연구개발)·제44류(의료업) | — |
| 도메인 | `optinex.co.kr`, `optinexresearch.com` 등 **즉시 확보**(연 수만 원) | — |
| 상표 출원 | — | 조사 결과에 따라 류 선택 후 출원 |
| 대체안 | 충돌 발견 시 대체 후보 2개 미리 확보 | — |

`MasVisio`는 저장소·기존 학술 인용에 남아 있으므로 삭제하지 않고 **역사명(former name)**으로 처리한다(§12.7 URL 보존과 연동).

### 1.2 Optinex가 바꾸려는 문제의 정의

현재 일반적인 시력교정은 한 사람의 눈을 대체로 몇 개의 정적 숫자로 표현한다.

```text
SPH / CYL / AXIS / ADD
```

하지만 실제 시각은 다음 조건에 따라 계속 달라지는 시공간 함수다.

```text
필요 광학상태 P* = f(시야각 θ·φ, 주시거리 z, 동공 p, 파장 λ,
                    시간 t, 눈의 광학모델 E, 과제·사용자 의도 U)
```

Optinex가 제안하는 패러다임 전환은 다음과 같다.

| 기존 패러다임 | Optinex가 지향하는 패러다임 |
|---|---|
| 중심시 중심의 처방 | 중심과 주변부를 포함한 시야장 전체의 광학 프로파일 |
| 한 번 측정한 정적 도수 | 시간·주시거리·동공·과제에 적응하는 상태 |
| 평균 눈을 전제로 한 렌즈 | 개인별 형상과 수차를 반영한 눈 모델 |
| 선명도 하나의 최적화 | 대비, 탐지, 이동, 피로, 적응을 포함한 기능 최적화 |
| 장치 단품 | 측정–모델–구동–학습의 폐루프 플랫폼 |

### 1.3 회사의 핵심 루프

```mermaid
flowchart LR
    A[Measure<br/>눈·시선·환경 측정] --> B[Model<br/>개인별 시야장 모델]
    B --> C[Augment<br/>광학 상태 구동]
    C --> D[Learn<br/>기능 수행과 적응 학습]
    D --> A
```

이 루프는 사이트의 가장 중요한 시각 문법이자 제품 아키텍처가 되어야 한다.

### 1.4 브랜드 구조

| 이름 | 역할 | 웹에서의 위치 |
|---|---|---|
| **Optinex** | 회사·플랫폼·장기 비전 | 최상위 브랜드와 도메인 |
| **Optinex Research** | 논문, 내부 실험, 프로토타입, 방법론을 만드는 연구 엔진 | `/research`, `/evidence` |
| **Measure** | 주변부 굴절, 망막 형상, 동공, 대비감도, 안축·생체계측 | 플랫폼 1층 |
| **Model** | 개인별 wide-field eye model, retinal conjugate map, optical profile | 플랫폼 2층 |
| **Augment** | 가변초점·공간가변 광학, 시선추적, 제어 | 플랫폼 3층 |
| **Learn** | 종단 데이터, 사용자 적응, 기능 성능 최적화 | 플랫폼 4층 |

#### 1호 탐사선 `[확정 C3]`

가상의 제품 계층명을 만들지 않는다. 창업자는 9개 포트폴리오를 검토해 **4번을 이미 선택**했다.

> **주변부 프로그래머블 튜닝블렌즈 안경**
> 중심부 자동초점 + 주변부 링존 굴절력 앱 제어.
> 북극성(주변부 완전교정)을 **직접 탐사하는 유일한 장치**이며, 웨어러블 형태의 주변부 능동 교정 실험 플랫폼이다.
> 현재 단계: `Concept → Bench` (역설계 엔진 `ret_prof` 보유)

#### 백로그 — 선택되지 않았으나 부산물의 재료

| # | 계층 | 아이디어 |
|---|---|---|
| 1 | 측정 | 주변부 굴절 가정용 매트 — 하루 30초 RPRE 추적 |
| 2 | 측정 | melanopic 도즈미터 안경 클립 |
| 3 | 측정 | 수면 중 안축장 변화 리더기 |
| 5 | 제어 | 개인 melanopic 응답 기반 맞춤 스펙트럼 필터 코팅 엔진 |
| 6 | 제어 | 양안 비대칭 가변 디옵터 훈련 고글 |
| 7 | 출력 | 개인 눈 모델 기반 AR/VR 캘리브레이션 API |
| 8 | 출력 | 개인 조절력 곡선 피팅 노안 동적 독서 렌즈 처방 엔진(B2B) |
| 9 | 데이터 | 개인 시각 프로파일 플랫폼 |

백로그는 사이트에 제품으로 노출하지 않는다. §8.3 프로그램 페이지의 `해결되지 않은 문제`와 `실험 로드맵`에서만 언급한다.

#### 플랫폼 4층에 대응하는 실존 자산

Measure–Model–Augment–Learn은 미래형 구상이 아니다. **각 층에 이미 동작하는 코드가 있다.** 사이트는 이 대응을 명시해야 한다(§3.5 `Software artifact` 배지와 연동).

| 층 | 실존 저장소 | 상태 |
|---|---|---|
| Measure | `openaxis-biometer`(OCT DSP·안축장), `rtAR`(자작 자동굴절계), `pupil_dynamics`(동공 동역학) | 명세·코드 보유 |
| Model | `ret_prof`(광선추적·역설계, 테스트 102 통과), `Panretinal-Refractometer` | 엔진 동작 |
| Augment | `electronics`, `led_vision_tester` | 펌웨어·시제품 |
| Learn | `GaborPatch`(심리물리), `bino_rehab`(웹캠 양안시) | 검사 도구 동작 |

---

## 2. 현재 GitHub 사이트 구현 감사

### 2.1 어떻게 만들어져 있는가

2026-08-26 확인 기준 GitHub `master`의 최신 커밋은 `e1519d5df680d74d7786c755e4cc690836228076`이다.

| 항목 | 현재 상태 |
|---|---|
| 호스팅 | GitHub Pages용 정적 파일 |
| 프레임워크 | 없음. HTML, CSS, JavaScript 직접 작성 |
| 개발 서버 | `python3 -m http.server 8080` |
| 주요 스타일 | `assets/css/main.css`, `responsive.css`, `components.css`, `v2.css` |
| 주요 스크립트 | `assets/js/main.js`, `assets/js/v2.js` |
| 콘텐츠 데이터 | `assets/data/content_v5.json` 약 178 KB |
| 페이지 | HTML 27개, 한국어·영어 파일 병렬 복제 |
| 인라인 구현 | HTML 내 `style=` 142회, `<script>` 33개 |
| 테스트 | 브라우저를 눈으로 확인하는 Playwright 스크립트 3개. 자동 assertion·CI 게이트 없음 |
| 버전 무효화 | `?v=4.0`, `?v=5.0`가 파일마다 혼재 |

현재 구조의 장점은 서버 없이 배포가 쉽고, 실제 연구자가 직접 빠르게 내용을 추가할 수 있다는 점이다. 단점은 같은 수정이 한국어·영어·여러 페이지에 반복되고, 데이터 JSON과 하드코딩 HTML 중 어느 쪽이 정본인지 불분명해졌다는 점이다.

### 2.2 현재 사이트의 강점

- 연구실·기기·실험 결과를 보여주는 실제 자산이 있다.
- 어두운 계측실, 망막 좌표, reticle, 모노스페이스 수치로 이어지는 시각 언어가 광학 회사와 잘 맞는다.
- 2009–2025년에 걸친 논문·학술발표 59건이 이미 구조화되어 있다.
- 주변부 망막, 대비감도, 동공반응, 안구 형상, 저시력 재활, 자동굴절계, 프로토타입이 한 연구자의 장기 궤적을 보여준다.
- 한국어와 영어를 모두 제공하고 기본 반응형 레이아웃이 있다.
- 단순 콘셉트 회사가 아니라 “직접 측정하고 장치를 만들어온 연구자”라는 진정성이 있다.

### 2.3 지금 가장 큰 구조적 문제

#### 문제 A — 하나의 큰 질문보다 프로젝트 목록이 먼저 보인다

현재 방문자는 정밀 계측, AI 바이오마커, 개인맞춤 솔루션을 각각 별도 사업으로 인식하기 쉽다. 사이트가 답해야 할 첫 질문은 “무엇을 많이 연구했는가?”가 아니라 “이 모든 연구가 어떤 하나의 미래를 만들기 위해 연결되는가?”다.

대비감도 연구는 주변부 기능 최적화의 기반이고, 동공 연구는 눈 상태 센싱의 기반이며, 망막 형상과 자동굴절계는 개인별 눈 모델의 기반이고, 시제품 연구는 광학 개입의 기반이다. 이 연결을 먼저 보여주어야 한다.

#### 문제 B — `연구 단계`와 `연구 프로그램`이 혼재한다

현재 도전과제의 “시각 신경과학 → 시광학 계측 → 시제품 → AI·소프트웨어”는 순차적인 Phase라기보다 병행되는 역량 축이다. 이를 네 개의 연구 프로그램으로 바꾸고, 각 프로그램 안에서 실제 성숙 단계를 별도로 표시해야 한다.

권장 성숙 단계:

```text
Concept → Bench → Simulation → Internal Study → External Replication
        → Clinical Study → Regulatory → Deployed
```

#### 문제 C — 직접 수행 연구와 상용 제품 주장의 경계가 약하다

사용자가 직접 수행한 연구결과는 삭제할 이유가 없다. 다만 다음과 같이 표현의 주어를 명확히 해야 한다.

- 좋은 표현: “성인 36명을 대상으로 수행한 내부 탐색 연구에서 이 프로토콜을 평가했다.”
- 좋은 표현: “이 연구에서는 47개의 후보 특징을 계산했다.”
- 좋은 표현: “내부 데이터셋의 해당 분석에서 AUC 0.92를 관찰했다.”
- 피해야 할 표현: “Optinex는 질환을 90% 이상 정확도로 진단한다.”

앞의 문장들은 실제 연구를 강하게 보여준다. 마지막 문장은 외부검증·임상 사용범위·규제 상태가 생략되어 제품 성능으로 읽힌다.

#### 문제 D — 연구결과 원본과 장식 이미지의 출처가 구분되지 않는다

사용자 확인에 따라 도전과제의 대비감도 등 결과 이미지는 직접 실험한 원본 자산이다. 따라서 전면 활용한다. 동시에 모든 이미지에 다음 메타데이터를 붙여 출처 혼동을 원천적으로 막는다.

```yaml
asset_id: result-motion-csf-2025-01
asset_type: experimental_result
study_id: study-motion-csf-2025
caption_ko: "속도 조건별 대비감도 결과"
caption_en: "Contrast sensitivity by motion condition"
created_by: "Optinex Research"
source_file: "..."
public_permission: true
personally_identifiable: false
alterations: "crop only"
```

허용 `asset_type`:

- `experimental_result`
- `apparatus_photo`
- `prototype_photo`
- `simulation_output`
- `scientific_diagram`
- `concept_illustration`

#### 문제 E — 유지보수와 품질 게이트가 약하다

- 한국어·영어 HTML이 중복되어 한쪽만 수정될 위험이 있다.
- 동일한 내비게이션과 footer가 여러 파일에 복사되어 있다.
- 스타일과 스크립트가 페이지 안에 많이 들어가 있다.
- 현재 테스트는 `headless: false`로 스크린샷과 로그를 확인하는 방식이며 실패를 자동 판정하지 않는다.
- route가 27개이고 dashboard v1/v2/v3가 공개 트리에 함께 남아 사용자·검색엔진이 어느 것이 정본인지 알기 어렵다.
- Google Fonts와 외부 파트너 로고 hotlink는 개인정보·성능·가용성 측면에서 불필요한 외부 의존성이다.

### 2.4 즉시 해결할 접근성 문제

`ko/research/overview.html`의 시간주파수 데모는 1–30 Hz를 자동 순환하며 `main.js`가 `requestAnimationFrame`으로 깜빡임을 계속 구동한다. 시각을 다루는 회사 사이트에서 자동 flicker는 특히 엄격하게 관리해야 한다.

조치:

1. 자동 실행을 즉시 중지한다.
2. 정적 썸네일과 `데모 시작` 버튼을 기본으로 둔다.
3. 사용자 시작 전 광과민성 경고를 제공한다.
4. 3 flashes 기준을 넘는 공개 데모는 웹에 직접 재생하지 않고 영상 설명·주파수 그래프로 대체한다.
5. `prefers-reduced-motion: reduce`에서 모든 비필수 애니메이션을 제거한다.
6. 접근성 floating widget보다 먼저 기본 HTML, 대비, 키보드 탐색, motion safety를 해결한다.

근거: [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [WCAG 2.2 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html).

---

## 3. 연구 자산 보존·재구성 원칙

### 3.1 “모두 포함”의 의미

모든 연구를 홈 화면에 같은 크기로 나열하는 것은 보존이 아니라 맥락 상실이다. 권장 방식은 다음과 같다.

- **홈:** 회사를 설명하는 대표 연구 4–6개
- **Research Programs:** 회사의 핵심 기술축으로 재배열한 연구
- **Evidence Library:** 현재 59건 전체와 내부 연구·프로토타입 전체
- **개별 Study 페이지:** 방법, 장치, 표본, 결과, 한계, 다음 실험
- **Journal:** 진행 과정과 실패·교정 기록

따라서 어떤 연구도 지우지 않되, “회사 핵심축과의 관련성”에 따라 노출 깊이를 달리한다.

**단, 전량 보존 원칙보다 민감정보 예외가 우선한다.** 개인정보 보호법 제23조상 민감정보(사상·신념, 건강, **성생활 등에 관한 정보**, 유전정보, 범죄경력, 생체인식정보)에 해당하는 연구주제는 연구 자체의 정당성과 무관하게 회사 웹사이트 공개 대상에서 제외한다. 사유는 두 가지다.

1. 소표본 연구에서 민감 속성이 공개되면 **참여자 재식별 위험**이 생긴다.
2. 학술대회 발표 동의와 **영리법인의 상시 대외 홍보물 게재 동의는 같은 동의가 아니다.**

해당 레코드는 `publicability: excluded_sensitive`로 표시하고 내부 `study_id`만 보존한다. §22 부록에서 실제로 1건이 이 규칙으로 제외되었다.

### 3.2 기존 59건 연구성과의 이관 규칙

현재 `content_v5.json`에는 다음과 같은 자산이 있다.

- 동료심사·학술지 성과: 시각 정책, 임상 시기능, 저시력, 대비감도, 양안시, 콘택트렌즈, 시재활, 시제품 등
- 학술발표: 주변부 망막, 망막 곡률, 초평면, 근시교정, 동공반응, 대비감도, 안굴절계, 3D scanner, 반맹 재활 등
- 총 레코드: 59건

#### 실측 베이스라인 (2026-08-27, `content_v5.json` 직접 파싱)

수용기준을 세우기 전에 현재 데이터의 실제 상태를 기록한다. 문서 초안의 `59 == 59` 기준은 아래 사실 때문에 **성립할 수 없었다.**

| 항목 | 실측값 |
|---|---|
| `ko.publications` / `en.publications` 레코드 수 | 59 / 59 |
| DOI 또는 KCI 링크 보유 | **21 / 59 (35.6%)** |
| 초록(abstract) 보유 | **22 / 59 (37.3%)** |
| 중복 제목 | **1건** — `경남 차상위계층의 시각적 삶의 실태 연구`가 #1(정책 논문)·#36(학술발표)로 이중 등재 |
| 민감정보 제외 대상 | **1건** (§3.1, §22) |
| 확인된 오탈자 | #38 `시각졍로`, #25 `조기 스크리팅` |

같은 연구의 논문과 학술발표가 함께 있을 수 있으므로 삭제하지 않고 `study_id`로 연결한다. **그런데 연결하면 공개 항목 수가 59보다 줄어든다.** 따라서 개수 일치가 아니라 **유실 0**을 기준으로 삼는다.

```text
Acceptance criteria (개정)

1. 원본 59개 레코드 전부가 새 시스템에서 ID를 갖는다.        loss == 0
2. 공개 목록 수 = 59 - (중복 병합 1) - (민감정보 제외 1) = 57
   병합·제외 각각에 사유와 승인자를 기록한다.
3. 모든 레코드가 검증 상태를 갖는다.
     verified_doi | verified_kci | conference_abstract_no_doi | unverifiable
4. `unverifiable` 레코드는 "총 N건" 같은 집계 주장에 산입하지 않는다.
5. "총 N건"이라는 표현 자체가 정량 주장이므로 CLM-COUNT-001로
   claim registry(§9.1)에 등록하고 자동 검증한다.
```

5번은 문서 초안의 자기모순을 교정한 것이다. §9.1에서 모든 정량 주장을 레지스트리로 관리하라고 규정해 놓고, 정작 문서가 반복해서 쓰는 "59건"에는 그 규칙을 적용하지 않았다.

### 3.3 네 개의 연구 프로그램으로 재배열

#### Program 1 — Wide-field Eye Modeling

개인별 망막 형상, 주변부 굴절, 경선별 곡률, 사광선의 초점, 안구 생체계측을 하나의 시야장 모델로 연결한다.

포함 자산:

- 전체망막 완전교정과 근시억제
- 굴절이상에 따른 주변부 망막의 경선별 변화
- 경선별 주변부 망막 교정을 위한 구면굴절력·각막곡률반경 연구
- 망막 초평면 profile 알고리즘
- 안광학계 광선추적
- 근시억제용 렌즈의 개인맞춤 가입도 설계
- 망막 곡률반경과 나이·굴절이상·각막굴절력 연구
- 공막 프로파일 3D scanner와 영상처리
- 자동안굴절계·검영법·기계학습 기반 측정

#### Program 2 — Visual Neuroperformance

광학적 선명도만이 아니라 실제 사람이 탐지하고 움직이고 적응하는 능력을 측정한다.

포함 자산:

- 좌우 시각경로의 모션 대비감도
- 주변시야 대비감도와 중심외주시 훈련
- 주변부 망막의 공간·시간 합산
- 입체시각의 시간 특성
- 버전스와 눈–손 협응
- 동체시각, 운동 자극, 반구·시각경로 비대칭
- 칼라필터·콘택트렌즈와 대비감도
- 저시력 환자의 기능·삶의 질·시보조기구

이 프로그램은 장기적으로 Adaptive Runtime의 목적함수를 정의한다. “PSF가 좋아졌는가?”만 묻지 않고 “주변부 탐지율, 보행, 대비, 반응시간, 피로가 좋아졌는가?”를 묻는다.

#### Program 3 — Adaptive Optical Systems

측정한 시야장 프로파일을 실제 광학 개입과 장치로 변환한다.

포함 자산:

- 동측성 반맹 재활용 시분할 장치와 shutter glasses
- 중심외주시 훈련 시스템
- 맞춤형 주변부 교정 렌즈 설계
- 근시억제용 광학 개입
- 자동안굴절계·LED 시각검사·구조화광 장치
- 향후 가변초점 렌즈, 시선·거리 추정, 공간가변 광학 제어

#### Program 4 — Longitudinal Eye Intelligence

동공·대비·행동·환경 데이터를 시간에 따라 분석해 눈의 상태와 기능 변화를 추적한다.

포함 자산:

- 동공 광반사 동역학
- 휘도·주시거리·조절랙·동공중심 이동
- 라이프스타일과 동공반응
- 통합 바이오메트릭 후보 특징 47개
- 내부 탐색 데이터의 질환·상태 분류 분석
- AI·소프트웨어 파이프라인과 대시보드

이 프로그램의 공개 표현은 `질환 진단 플랫폼`보다 `exploratory ocular signal research`와 `longitudinal eye-state modeling`을 우선한다. 진단 가능성을 숨기지는 않되, 임상 검증 단계와 연구 범위를 함께 표시한다.

### 3.4 개별 연구 페이지 표준

모든 Study 페이지는 같은 질문에 답해야 한다.

1. **Question** — 무엇을 알고 싶었는가?
2. **Why it matters** — Optinex의 장기 비전에 왜 필요한가?
3. **Study status** — 논문, 학술발표, 내부 연구, 파일럿, 시뮬레이션 중 무엇인가?
4. **Method** — 표본, 포함·제외, 장비, 자극, 프로토콜, 분석법
5. **Result** — 효과크기, 분산·신뢰구간, 통계, 원본 figure
6. **Interpretation** — 무엇을 의미하고 무엇을 의미하지 않는가?
7. **Limitations** — 표본·설계·외부타당도·재현성
8. **Next falsification test** — 다음에 어떤 조건이면 가설을 버리거나 수정할 것인가?
9. **Artifacts** — 논문, 초록, DOI, 데이터 사전, 코드, 장치 사진
10. **Contribution** — Measure / Model / Augment / Learn 중 어디에 연결되는가?

### 3.5 연구 상태 배지

| 배지 | 의미 | 사용 예 |
|---|---|---|
| `Peer-reviewed` | 동료심사 논문 출판 | DOI/KCI 링크 필수 |
| `Conference` | 학술대회 발표 | 학회·연도·초록 또는 프로그램 |
| `Investigator study` | 연구자가 직접 수행한 내부 연구 | 프로토콜·표본·분석 범위 공개 |
| `Validated prototype` | 정해진 시험을 통과한 프로토타입 | 시험 조건과 로그 |
| `Simulation` | 계산·광선추적·가상 실험 | 모델 가정과 파라미터 |
| `Hypothesis` | 아직 검증 전인 과학 가설 | 검증 계획 |
| `Roadmap` | 미래 제품·기능 | 현재 이용 불가 명시 |

`Internal`은 “가짜”나 “낮은 수준”을 뜻하지 않는다. 연구의 검증 범위와 재현 단계가 다르다는 뜻이다.

#### 3.5.1 소프트웨어·엔지니어링 자산 배지

**1인 딥테크 연구소가 가진 가장 강한 증거는 논문이 아니라 동작하는 코드다.** 위 7개 배지에는 이 자산을 담을 타입이 없어, §13.2가 권고한 `SoftwareSourceCode` 구조화 데이터를 붙일 대상 자체가 존재하지 않았다. 다음을 추가한다.

| 배지 | 의미 | 필수 첨부 | 해당 자산 예 |
|---|---|---|---|
| `Software artifact` | 공개 저장소의 동작 코드 | repo URL, 커밋 해시, 테스트 통과 수, 라이선스 | `ret_prof` (테스트 102 통과, JSON Schema 6종 데이터 계약, 오차예산·민감도 모듈) |
| `Engineering spec` | 성능지표·오차예산이 문서화된 설계 | 목표 사양, 검증 방법, **미달 항목 명시** | `openaxis-biometer` (PRD → Sw ≤ 0.02 mm, Bland–Altman LoA ±0.06 mm → BOM → WP/DoD) |
| `Bench validation` | 모델안·테스트렌즈 등 물리 검증 | 캘리브레이션 조건, 원본 로그 | `rtAR` 모델안·테스트렌즈 캘리브레이션 |
| `Dataset` | 공개 가능한 비식별 데이터 | 데이터 사전, 라이선스, 동의 범위 | 추후 |

이 배지들은 **기술이전 상대에게 논문보다 설득력이 크다.** 제조사 기술기획 담당자가 확인하려는 것은 "발표를 했는가"가 아니라 "재현 가능한 규율로 만들어졌는가"이기 때문이다. 미달 항목을 숨기지 않고 적는 것이 오히려 신뢰를 만든다.

---

## 4. 과학·공학 기반과 웹사이트에서의 설명 방식

### 4.1 필요한 도메인 지식

| 영역 | 핵심 지식 | Optinex에서의 역할 | 사이트에 보여줄 증거 |
|---|---|---|---|
| 기하광학·안광학 | 사광선, 비점수차, field curvature, pupil, retinal conjugacy | wide-field prescription | ray trace, 경선별 맵, 광학식 |
| 파면광학 | Zernike, PSF, MTF, HOA, wavefront sensing | 개인 수차 모델과 보정 한계 | wavefront/MTF 비교 |
| 시각신경과학 | 주변부 샘플링, crowding, 대비감도, 시간주파수 | 기능 목적함수 | 직접 수행 대비감도 연구 |
| 검안·임상 | 굴절, 조절, 양안시, 저시력, 근시관리 | 프로토콜과 사용자 안전 | 논문·검사 흐름 |
| 생체계측 | 안축장, 각막, 동공, 망막 형상, eye tracking | 개인 모델 입력 | 장비·반복성·오차 |
| 계산광학 | inverse optics, optimization, differentiable rendering | 측정→모델→처방 | 시뮬레이션과 코드 산출 |
| 제어공학 | 상태추정, latency, stability, fail-safe | 가변 렌즈 폐루프 | 제어 블록도·응답시간 |
| 임베디드·웨어러블 | 센서 동기, 전력, 열, 무게, calibration | 실제 안경형 구현 | prototype·BOM·test |
| HCI·인간공학 | 적응, 멀미, 시선전환, 과제 의존성 | 증강이 방해가 되지 않게 함 | 사용자 과제·기능 평가 |
| 데이터·ML | personalized model, uncertainty, longitudinal learning | 개인화와 추적 | 데이터 흐름·불확실성 |
| 규제·품질 | 위험관리, 소프트웨어 생명주기, 광방사 안전 | 제품화 경계 | stage·governance |

### 4.2 과학적 가능성과 아직 남은 불확실성

사이트는 과학적 야심을 약화시키지 않으면서도 다음을 정직하게 설명해야 한다.

- 주변부 굴절·수차는 중심부와 다르고 개인차가 크며, wide-field 측정과 모델링은 분명한 연구 가치가 있다. [Peripheral ocular aberrations review](https://pmc.ncbi.nlm.nih.gov/articles/PMC6973144/)
- 주변부 고위수차 보정이 특정 조건에서 대비와 탐지 성능을 높였다는 연구가 있지만, 모든 과제·편심도·피험자에서 시력 향상이 보장되는 것은 아니다. [PubMed 31044955](https://pubmed.ncbi.nlm.nih.gov/31044955/)
- 주변부 굴절과 근시 진행의 인과 관계는 임상적으로 완전히 확정된 단일 메커니즘이 아니다. 따라서 “완전교정이 근시를 차단한다”는 제품 확정문보다 검증 중인 가설과 실험 로드맵으로 표현한다. [IMI Clinical Management Guidelines](https://myopiainstitute.org/wp-content/uploads/2020/09/Clinical-Management-Guidelines-IMI.pdf)
- eye tracking, depth sensing, focus-tunable lens를 결합한 autofocus eyewear는 이미 기술적으로 시연되었지만 지연, 시선오차, FOV, 무게, 적응이 실제 제품의 병목이다. [Autofocals prototype](https://pmc.ncbi.nlm.nih.gov/articles/PMC6598771/)
- 디지털 트윈은 안과에서 떠오르는 개념이지만 아직 표준화된 성숙 제품 범주가 아니다. 현재 단계에서는 `digital eye profile` 또는 `personalized eye model`을 쓰고, 종단 데이터로 지속 갱신되며 실제 시스템과 양방향 연결될 때만 `twin`이라 부른다. [Digital twins in ophthalmology](https://pubmed.ncbi.nlm.nih.gov/40378962/)
- 동공반응은 신경계 상태와 관련된 유망 신호지만 프로토콜 이질성, 약물·조도·나이·피로 등의 교란이 크다. 내부 연구는 이 가능성을 탐색한 중요한 자산이며, 외부 임상검증과는 구분한다. [PLR and Parkinson's systematic review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12071770/), [Chromatic pupillometry meta-analysis](https://pubmed.ncbi.nlm.nih.gov/38443213/)

#### 4.2.1 북극성의 물리적 상한 — 가장 중요한 과학적 경계

**주변부 완전교정으로 얻을 수 있는 것과 얻을 수 없는 것은 문헌상 이미 갈려 있다.** 이 경계를 문서와 사이트에 명시하지 않으면, 잘못된 종점으로 실험을 설계해 반드시 실패하게 된다.

> 건강한 눈에서 **탐지 역치(detection acuity)와 저대비 해상은 주변부 광학에 좌우되지만, 고대비 해상시력(resolution acuity)은 망막 신경 샘플링에 의해 제한된다.** 즉 주변부 굴절을 완전히 교정해도 고대비 해상시력은 원리적으로 개선되지 않는다.
> — [Atchison 2013](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0000000000000033), [Lundström 2007](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0b013e318159aa7a), [Lewis 2014](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0000000000000301), [Wang·Thibos·Bradley 1997](https://pubmed.ncbi.nlm.nih.gov/9331277/)

이것은 북극성(§0.2 C2)을 부정하지 않는다. **오히려 반증 가능한 가설로 만들어 준다.**

| | 종점 설정 | 결과 |
|---|---|---|
| ❌ 잘못된 북극성 | "주변부를 완전교정하면 더 잘 보인다" — 고대비 시표로 측정 | 신경 샘플링 한계로 **반드시 실패** |
| ✅ 올바른 북극성 | 탐지 역치 · 저대비 해상 · 주변부 대비감도 · 시간주파수 응답 · 반응시간 | 광학 개입이 실제로 움직이는 지표 |

그리고 이 측정계는 **이미 보유 중이다** — 주변시야 대비감도 연구, 주변부 망막 공간·시간 합산, 좌우 시각경로 모션 대비감도, 그리고 `GaborPatch` 심리물리 플랫폼. §4.3의 성능 사다리와 정확히 맞물린다.

또한 [Atchison 2013](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0000000000000033)은 **성인 대상 주변부 굴절 교정의 시기능 효과를 직접 시험한 선행연구**다. "아무도 해보지 않은 발견의 영역"이라는 서술에 대한 가장 가까운 반례이므로, §8.3 프로그램 페이지의 **첫 항목을 "무엇이 이미 시험되었고 무엇이 남았는가"**로 두어 선행연구를 먼저 정리한 뒤 남은 공백을 제시한다. 이 순서가 뒤집히면 사이트가 선행연구를 모르는 것처럼 읽힌다.

### 4.3 기능 성능을 최종 목표로 둔다

Optinex의 성능 계층은 다음 순서를 따라야 한다.

```text
광학 성능     PSF / MTF / RMS wavefront error
    ↓
지각 성능     contrast threshold / detection / crowding / motion
    ↓
행동 성능     reading / search / mobility / reaction time
    ↓
경험 성능     comfort / fatigue / adaptation / preference
    ↓
생활 성능     safety / participation / task success
```

웹사이트도 광학 맵만 아름답게 보여주는 데서 끝나지 않고, 직접 수행한 대비감도·저시력·재활 연구가 왜 이 성능 사다리에 필요한지 설명해야 한다.

---

## 5. 타깃 방문자와 전환 목표

### 5.1 우선순위 `[확정 C5 반영]`

사이트의 1차 전환 목표는 **기술이전·라이선싱 문의**다. 문서 초안은 `공동연구 제안`을 1순위로 두었으나, 창업자는 임상 기관 접근권을 **이미 확보**하고 있다(§0.2 C4). 해결된 병목에 사이트 최상단을 배정할 이유가 없다.

| 우선 | 방문자 | 알고 싶은 것 | 기본 CTA | 도달 페이지 |
|---:|---|---|---|---|
| 1 | 렌즈·광학 제조사, 안과기기사, XR 기업의 **기술기획·오픈이노베이션** | 무엇을 가져갈 수 있는가, IP 상태는 어떤가 | `기술이전·라이선싱 문의` | 기술요약 1p + NDA 데이터룸 |
| 2 | 공동검증 임상·연구 기관 | 어떤 가설을 함께 반증할 수 있는가 | `공동검증 제안` | Research Program |
| 3 | 앱·SaaS 초기 사용자, 검안 현장 | 지금 써볼 수 있는 것이 있는가 | `베타 참여` | 앱 랜딩 (준비 전에는 비노출) |
| 4 | 정부과제·초기 투자 | 장기 비전과 단계적 de-risking | `기술 로드맵 요청` | 비공개 |
| 5 | 일반 대중 | 왜 시야 전체가 중요한가 | `비전 알아보기` | Vision |

현재 상용 의료제품이 없으므로 환자 유입이나 진단 신청을 CTA로 두지 않는다. 마찬가지로 **자체 제품 구매·사전예약 CTA도 두지 않는다.** 양산하지 않기 때문이다(§0.2 C5).

### 5.2 방문자가 30초 안에 이해해야 하는 것

1. Optinex는 시야 전체를 개인화해 다루는 회사다.
2. 주변부 시야는 장식적 배경이 아니라 핵심 연구대상이다.
3. 연구자는 수년간 대비감도·주변부 망막·동공·장치를 직접 연구했다.
4. 현재는 연구·프로토타입 단계이며 공동검증 파트너를 찾는다.
5. 장기적으로 측정–모델–동적광학–학습을 하나의 플랫폼으로 연결한다.

---

### 5.3 `기술이전 가능 단위` — 신규 콘텐츠 타입 `[제안]`

C5에 따라 사이트가 반드시 답해야 하는 질문이 하나 늘었다. Evidence Library가 **"무엇을 알아냈는가"**라면, 이 타입은 **"무엇을 가져갈 수 있는가"**를 답한다. 이것이 없으면 제조사 담당자가 논문 59건을 읽고 스스로 판단해야 하는데, 실무에서 그런 일은 일어나지 않는다.

```yaml
id: LU-PERIPHERAL-PROFILE-001
title_ko: 경선·편심도별 주변부 처방장 산출 방법
what_it_does: 개인 안구 형상·굴절 실측에서 시야 전체의 목표 광학상태를 계산
applicable_to: [주변부 교정 렌즈 설계, 근시관리 렌즈 개인화, AR/VR 개인 캘리브레이션]
maturity: bench            # concept | bench | simulation | internal_study | external
underlying_evidence: [STUDY-..., ret_prof]
ip_status: 자기공지 감사 중   # §10.0 완료 전에는 이 값을 확정하지 않는다
what_partner_gets: 알고리즘 명세, 검증 프로토콜, 오차예산
what_partner_must_bring: 양산 공정, 인허가, 임상 검증 규모
disclosure_level: teaser_only   # 상세는 NDA 후
```

**주의: `ip_status`가 미확정인 상태에서 이 페이지를 공개하면 안 된다.** 자기공지 감사(§10.0) 완료가 이 콘텐츠 타입의 선행조건이다.

## 6. 권장 정보구조

```text
/
├── /ko/                         한국어 홈
├── /en/                         영어 홈
├── /[lang]/vision/              왜 시야 전체인가
├── /[lang]/platform/            Measure–Model–Augment–Learn
│   ├── /measure/
│   ├── /model/
│   ├── /augment/
│   └── /learn/
├── /[lang]/research/            4개 연구 프로그램
│   └── /[program-slug]/
├── /[lang]/evidence/            전체 근거 라이브러리
│   └── /[study-or-publication]/
├── /[lang]/collaborate/         공동연구·기술검증
├── /[lang]/company/             설립자·팀·연혁·원칙
├── /[lang]/journal/             실험·개발 노트
├── /[lang]/governance/          claims, privacy, research ethics
└── /[lang]/contact/
```

기존 `Research / Publications / Gallery / Services / Partners`를 단순히 이름만 바꾸지 않는다.

- Gallery의 연구사진은 해당 Study와 Program 안으로 이동한다.
- Publications는 Evidence Library가 흡수한다.
- Services는 현재 가능한 협력 범위와 미래 플랫폼을 분리한다.
- Partners는 법적·홍보 동의가 확인된 관계만 공개한다.
- dashboard v1/v2/v3는 Evidence의 prototype archive로 옮기거나 비공개 preview로 둔다.

---

## 7. 홈 페이지 상세 명세

### 7.1 Hero

권장 한국어 카피:

> **교정은 중심시에서 멈췄습니다.  
> 우리는 시야 전체를 모델링합니다.**
>
> Optinex는 개인의 눈·시선·환경을 측정하고, 주변부까지 필요한 광학 상태를 계산해 적응형 광학계로 연결하는 시각증강 플랫폼을 연구합니다.

영문:

> **Correction stops at central vision.  
> We model the whole visual field.**
>
> Optinex is building an adaptive vision platform that measures the eye, models the field, and explores how personalized optics can augment human vision.

CTA:

- Primary: `플랫폼 아키텍처 보기`
- Secondary: `공동연구 제안`
- Tertiary: `연구 근거 탐색`

상태 문구:

> Research-stage platform. No commercial medical product is currently available.

### 7.2 Hero 인터랙션

랜덤한 3D 눈이나 AI 신경망 대신, 실제 회사 가설을 설명하는 **시야장 광학 지도**를 사용한다.

세 가지 토글:

1. `Conventional` — 중심 처방만 적용된 단순 맵
2. `Personalized field` — 개인별 주변부 굴절·수차 분포
3. `Adaptive` — 주시거리와 시선에 따라 보정장이 변화

필수 표기:

- `Conceptual simulation` 또는 실제 데이터면 `De-identified study data`
- 색상 범례와 단위
- 키보드 조작
- 정적 대체 이미지
- 자동 애니메이션 금지

### 7.3 Paradigm section

짧은 문장:

> 안경은 하나의 도수입니다. 시각은 하나의 장(field)입니다.

두 열 비교로 중심처방과 wide-field profile을 설명한다. 이 섹션에서 회사의 기술범주가 결정된다.

### 7.4 Measure–Model–Augment–Learn

각 단계에 기존 연구자산을 연결한다.

| 단계 | 설명 | 연결할 실제 자산 |
|---|---|---|
| Measure | 눈의 형상·굴절·동공·기능을 측정 | 자동굴절계, 망막 형상, PLR, CSF |
| Model | 개인별 retinal optical field를 계산 | 초평면, 광선추적, 주변부 곡률 |
| Augment | 렌즈·디스플레이·장치가 상태를 구현 | 반맹 장치, 맞춤형 렌즈, 시제품 |
| Learn | 사용자의 성능과 적응으로 모델을 갱신 | 대비감도, 반응시간, 종단 데이터 |

### 7.5 Research lineage

현재 연구를 “서로 다른 네 분야”가 아니라 다음 계보로 보여준다.

```text
Peripheral vision & rehabilitation
        ↓
Contrast and motion performance
        ↓
Wide-field retinal measurement
        ↓
Personalized optical modeling
        ↓
Adaptive optical augmentation
```

여기서 2009–2025 연구 연혁의 대표 6–8개를 노출하고 `전체 59건 보기`로 연결한다.

### 7.6 Evidence spotlight

홈에는 다음 네 사례를 추천한다.

1. 주변부 망막 곡률·초평면 연구
2. 좌우 시각경로 모션 대비감도 연구
3. 중심외주시·반맹 재활 연구와 시분할 프로토타입
4. 동공 동역학·통합 바이오메트릭 탐색 연구

각 카드에는 수치보다 질문·방법·단계를 먼저 둔다.

### 7.7 Collaboration

공개 가능한 협력 유형:

- wide-field optical measurement 공동연구
- 특수렌즈·주변부 광학 설계 검증
- eye tracking·tunable lens 통합 prototype
- 대비감도·주변부 기능평가 프로토콜
- 비식별 연구데이터 분석과 시각화

`진단 API 판매`처럼 제품상태를 앞지르는 표현은 현재 제공 가능성과 분리한다.

---

## 8. 하위 페이지 상세 명세

### 8.1 Vision — 왜 시야 전체인가

목적: 일반인과 투자자에게 기술을 물리학부터 설명한다.

모듈:

1. 중심시 처방이 압축하는 정보
2. 주변부에서 달라지는 굴절·수차·신경 샘플링
3. “더 선명함”과 “더 잘 봄”의 차이
4. 직접 수행한 주변부 대비감도·재활 연구
5. 장기 시나리오: 작업·거리·시선에 맞는 개인화 시야
6. 과학적 불확실성과 검증 질문

### 8.2 Platform — Measure / Model / Augment / Learn

목적: 회사가 무엇을 만드는지 시스템으로 설명한다.

각 레이어는 반드시 다음을 가진다.

- Inputs
- Core computation
- Outputs
- Current assets
- Missing capability
- Validation metric
- Current stage

예:

| Layer | Inputs | Output | 현재 자산 | 다음 검증 |
|---|---|---|---|---|
| Measure | 경선별 굴절, pupil, eye geometry | field profile | 주변부·망막·굴절 연구 | 반복성·재현성 |
| Model | geometry + wavefront + gaze | personalized optical map | ray tracing·초평면 | 실측과 model error |
| Augment | map + target distance + task | lens/control command | prototype lineage | latency·stability·FOV |
| Learn | functional result + comfort | updated profile/policy | CSF·행동 연구 | longitudinal benefit |

### 8.3 Research

네 프로그램을 큰 카드로 보여주고, 각 페이지에는 관련 연구를 자동 집계한다. `Phase 1–4` 표기는 없앤다.

프로그램 페이지 구성:

- 대표 질문
- 핵심 가설
- 수행한 연구
- 현재 보유 장치·데이터
- 해결되지 않은 문제
- 12–24개월 실험 로드맵
- 협력 요청

### 8.4 Evidence Library

필터:

- Type: peer-reviewed / conference / investigator study / prototype / simulation
- Program: 4개 프로그램
- Contribution: Measure / Model / Augment / Learn
- Year
- Status
- Author
- 공개자료 유무: paper / figure / code / data dictionary / demo

리스트 카드에는 제목, 연도, 상태 배지, 한 문장 결과, 회사 아키텍처와의 연결, DOI를 표시한다.

### 8.5 Company

연구자의 이력 나열보다 “왜 이 문제를 10년 이상 따라왔는가”를 이야기한다.

권장 설립자 서사:

> 저시력과 주변시야 재활을 연구하면서, 중심시력 하나가 사람의 실제 시각 능력을 설명하지 못한다는 문제를 보았다. 대비감도와 운동시각, 동공반응, 주변부 망막 형상, 자동굴절계와 시제품을 차례로 연구한 이유는 서로 다른 주제를 수집하기 위해서가 아니었다. 개인이 실제로 보는 시야 전체를 측정하고, 필요한 광학 상태를 계산하고, 다시 장치로 구현하기 위한 기술 조각을 축적하기 위해서였다.

팀·파트너는 역할과 공개 동의를 확인한 사람·기관만 싣는다. 과거 협업은 `Past collaboration`, 현재 계약·공동과제는 `Active collaboration`으로 구분한다.

### 8.6 Governance

최소 네 페이지:

- `Evidence & claims policy`
- `Research ethics & participant privacy`
- `Product and regulatory status`
- `Privacy policy`

이 페이지는 약점을 고백하는 곳이 아니라 deep-tech 회사의 신뢰 인프라다.

---

## 9. 콘텐츠·주장 거버넌스

### 9.1 Claim registry

모든 정량 주장과 진단·치료·예측 표현을 중앙 레지스트리에서 관리한다.

```yaml
claim_id: CLM-PLR-001
statement_ko: "내부 탐색 연구에서 47개의 동공·대비 관련 후보 특징을 분석했다."
statement_en: "An investigator-conducted exploratory study analyzed 47 candidate pupil and contrast-related features."
status: approved_with_context
evidence_type: investigator_study
study_id: STUDY-PLR-2025-01
population: "20–30대 성인 36명"
validation: internal
allowed_pages:
  - evidence
  - research
not_allowed:
  - product_hero
required_context: "표본, 프로토콜, 내부검증임을 함께 표시"
owner: research_lead
copyright_clearance: redrawn_from_own_data   # 아래 9.1.1 참조
author_list_shown: true                     # 공저자 전원 원문 표기 (필수)
last_reviewed: 2026-08-26
```

#### 9.1.1 저작권·공저자 규칙 (경량)

창업자 본인이 투고·게재한 결과물이므로 저작자 문제는 없다. 다만 국내 학회지는 통상 게재 시 저작권 이양 동의를 받으므로, **저작자인 것과 재사용권을 보유한 것은 별개**다. 학회와 협의하는 절차 자체를 없애는 우회로를 기본값으로 둔다.

| 값 | 의미 | 사용 상황 |
|---|---|---|
| **`redrawn_from_own_data`** | **원 데이터에서 figure를 새로 그림 — 기본값** | 대부분. 원 데이터는 명백히 본인 것이고 새 그림은 새 저작물이다. §11 디자인 시스템(범례·단위·불확실성 밴드)에 맞춰 다시 그리면 학회지 흑백 figure보다 나은 자산이 된다 |
| `author_retained` | 저자 재사용권이 명시적으로 확인됨 | 학회 정책 확인 후 |
| `publisher_permission_obtained` | 학회 서면 허락 취득 | 원본 스캔을 꼭 써야 할 때만 |
| `pending` | 미확인 | **공개 차단** |

공저자 규칙은 하나뿐이다. **모든 Evidence 카드에 저자 전원을 원문 순서 그대로 표기한다.** 저자를 생략하고 "Optinex Research 수행"으로만 쓰면, 의도와 무관하게 공저자(특히 학생)의 기여를 지운 것으로 읽힌다.

특허는 논문과 다르다. 발명이 기관 시설·과제비로 이루어졌다면 **직무발명으로 기관 귀속**일 수 있다. §10.0 자기공지 감사 때 변리사에게 함께 확인한다.

### 9.2 숫자를 지우는 대신 문맥을 추가한다

현재 사이트의 `47 biomarkers`, `90%+`, AUC 값, `±1 μm`, `100% correction` 같은 수치는 다음 절차로 다룬다.

1. 원 연구의 분석 코드·표·초록·발표자료와 연결한다.
2. 수치의 정확한 정의를 적는다.
3. 표본과 분석 단위를 적는다.
4. training / validation / test 구분을 적는다.
5. 내부·외부 검증 여부를 적는다.
6. 장비 사양인지 실제 시스템 반복성인지 구분한다.
7. 제품 페이지 사용 가능 여부를 승인한다.

근거가 확인된 수치는 Evidence 페이지에 그대로 남긴다. 홈·제품 페이지에서는 대표 수치만 맥락과 함께 사용한다.

### 9.3 표현 규칙 — 금지어가 아니라 획득 사다리

문서 초안은 `digital twin`과 `완전교정`을 금지어로 지정했다. **그런데 이 둘은 창업자가 확정한 해자 서사(눈의 디지털 트윈)와 북극성(주변부 망막 완전교정) 그 자체다.** 금지하면 문서가 채택되지 않고, 채택되어도 회사의 언어가 사라진다. 금지 대신 **조건을 충족하면 그 단어를 획득하는 사다리**로 바꾼다.

#### 9.3.1 획득 사다리

**"눈의 디지털 트윈"**

```text
현재 허용 표현:  personalized eye model / digital eye profile / 개인별 눈 모델

`digital twin` 승급 조건 — 셋 다 충족 시 사용 허가
  ① 동일 개인의 종단 데이터를 N회 이상, M개월 이상 갱신한 실적
  ② 모델 → 실제 광학 구동으로 이어지는 양방향 연결 실증
  ③ 모델 예측 대 실측 오차의 공개된 검증 지표

→ "지금은 쓰면 안 된다"가 아니라 "여기까지 하면 그 단어를 얻는다"
```

**"주변부 망막 완전교정"**

금지하지 않는다. `Hypothesis` 배지 + 정의 고정으로 사용한다.

```text
정의(사이트에서 항상 함께 노출):
  전 시야에서 잔여 구면대응치가 목표 허용범위 안에 들도록
  경선별·편심도별 굴절 상태를 능동 제어하는 것

측정 종점(§4.2.1):
  ✅ 탐지 역치 · 저대비 해상 · 주변부 대비감도 · 반응시간
  ❌ 고대비 해상시력 — 신경 샘플링 한계로 개선되지 않음

금지 대상은 단어가 아니라 결과 확정 표현:
  "100%" · "차단한다" · "완치" · "보장"
```

`전체망막 완전교정`은 창업자가 만든 개념이므로 검색 경쟁자가 없는 **유일한 고유 자산**이다. 폐기하지 않고 학술 검색어와 연결해 키운다(§13.1).

#### 9.3.2 실제로 피해야 할 표현

- `HIPAA certified`, `HIPAA secure` — HIPAA는 **한국 법인에 적용되지 않는 미국법**이며, 적용 주체·관계·BAA와 실제 통제가 필요한 제도지 인증 배지가 아니다. 한국에서 실제로 적용되는 것은 **개인정보 보호법**이다(§12.6). 현재 저장소에 `HIPAA` 문자열이 8회 존재하므로 전량 교체한다. [HHS covered entities](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html), [HHS self-certification FAQ](https://www.hhs.gov/hipaa/for-professionals/faq/237/can-business-associates-self-certify/index.html)
- `조기 진단`, `스크리닝` — 임상 진단 성능이 외부검증·규제 범위 없이 단정되는 경우
- `실시간` — end-to-end latency 측정 없이 사용 (저장소 내 34회 사용 중, 전수 점검 필요)
- `마이크로미터 정밀도` — 센서 픽셀·제조 스펙과 시스템 정확도·반복성을 혼동하는 경우
- 확정 표현 `100%`, `차단`, `보장` — 개념적 목표와 임상 결과의 혼동

### 9.4 Evidence page에 반드시 남길 것

- 실제 원본 figure
- 실험장치 사진
- sample size
- 실험 조건
- 주요 분석 방법
- effect size와 uncertainty
- preregistration 여부
- 발표·논문·DOI
- 한계
- 데이터·코드 공개 가능 범위

---

## 10. 특허·경쟁 지형과 웹 표현

> 아래는 2026-08-26 기준 예비 지형조사다. 특허 자유실시(FTO)나 법률의견이 아니며, 출원·제품 결정 전 변리사 검토가 필요하다.

### 10.0 `[최우선]` 자기공지 감사 — 이 문서 전체에서 가장 시급한 항목

**기술이전 회사에서는 특허가 곧 제품이다(§0.2 C5). 따라서 이 절은 재고 실사에 해당한다.**

문서 초안은 "웹사이트에 미출원 방법을 자세히 쓰지 말라"고 했다. 방향이 반대다. **공개는 웹이 아니라 학회에서 이미 일어났다.** §22 부록 목록 자체가 공지(公知) 이력이다.

| # | 연도 | 발표 내용 | 대응 자산 |
|---|---:|---|---|
| 28 | 2024 | 망막 초평면 profile 알고리즘 설계를 위한 안광학계 광선추적 | `ret_prof` 코어 |
| 27 | 2024 | 경선별 주변부 교정을 위한 구면굴절력·각막곡률반경 상관관계 | 처방장 산출 |
| 34 | 2023 | 근시억제용 SCL 맞춤형 가입도 설계를 위한 전체망막 형상 계산 | 렌즈 역설계 |
| 33 | 2023 | 전체망막 완전교정을 위한 망막 초평면 pilot | 북극성 핵심 |
| 31·32 | 2023 | 검영법 기반 / 기계학습 기반 자동안굴절계 설계 | `rtAR` |
| 26 | 2025 | 굴절이상에 따른 주변부 망막의 경선별 변화 | 측정 프로토콜 |

**국가별 공지예외(grace period) 실태:**

| 관할 | 기간 | 통상 학회발표 구제 여부 |
|---|---|---|
| **한국** | 12개월 (출원 시 주장 + 30일 내 증명서류) | ✅ 가능 — [특허청 공지예외주장 제도](https://www.kipo.go.kr/ko/kpoContentView.do?menuCd=SCD0200239) |
| **미국** | 12개월 | ✅ 가능 |
| **유럽(EPO)** | 6개월, 사유가 **명백한 남용 또는 국제박람회로 한정** | ❌ **통상 학회발표는 구제 불가** |
| **중국** | 6개월, 지정 학술회의 한정 | △ 조건부 |

즉 **2023·2024년 발표분은 한국·미국의 12개월 창구도 이미 도과**했을 가능성이 높고, 유럽은 애초에 구제 대상이 아니다. §10.3의 차별화 후보 중 최소 3개가 이미 신규성을 상실했을 수 있다.

```text
[긴급] 변리사 의뢰 — 2주 내 착수, 비용은 이 문서의 다른 어떤 항목보다 우선

1. 59건 각각의 최초 공개일과 발표자료의 실제 개시 수준
   (초록 한 장인지, 청구항을 지지할 만큼 상세한지 — 이 차이가 결론을 바꾼다)
2. 2025년 발표분(#23·#25·#26)의 12개월 잔여 창구 확인 → 우선 출원 판단
3. EP/CN 진입 포기 vs KR/US 한정 전략 결정
4. 직무발명 여부 — 기관 시설·과제비 사용 시 기관 귀속 가능성 (§9.1.1)
5. 위 결과로 "남은 미공개 영역 = 실제 특허 가능 영역"을 재정의

산출물: §5.3 기술이전 가능 단위의 `ip_status` 확정
→ 이 감사가 끝나기 전에는 기술이전 페이지를 공개하지 않는다.
```

**이 감사가 왜 웹사이트 문서에 들어가는가:** 감사 결과가 사이트에서 무엇을 얼마나 상세히 말할 수 있는지를 결정하기 때문이다. 이미 공지된 것은 숨길 이유가 없고(오히려 기술이전 홍보 자산이다), 아직 공지되지 않은 것은 출원 전까지 `approval_required`로 묶어야 한다. **지금은 둘을 구분할 수 없는 상태다.**


### 10.1 경쟁 범주

| 범주 | 예 | 핵심 | Optinex가 달라야 하는 지점 |
|---|---|---|---|
| 정적 근시제어 렌즈 | DIMS/HAL/CARE 계열 | 주변부 defocus 구조 | 개인별 실측 field와 동적 업데이트 |
| Autofocus eyewear | [IXI](https://ixieyewear.com/), [Laclarée](https://www.laclaree-vision.com/) | 시선·거리 기반 초점 조정 | 단일 초점이 아닌 공간적 wide-field prescription |
| AR/varifocal | 대형 XR 기업 | vergence–accommodation, foveation | 실제 세계 시각과 개인 눈 모델의 폐루프 |
| 시각재활 디지털 장치 | field-loss assistive systems | 탐지·보행 보조 | 광학 모델과 기능훈련의 통합 |
| **적응광학 시각 시뮬레이션·IOL** | **[Voptica S.L.](https://voptica.com/about-voptica/) (스페인 무르시아, Pablo Artal 창업)** | **Hartmann–Shack 파면센서 + 액정 소자 기반 상용 적응광학 시각 시뮬레이터 `VAO`, 그리고 주변부 품질을 명시 표방하는 `ArtIOLs®`** | **가장 가까운 경쟁자. 측정→시뮬레이션까지 상용화됨. Optinex는 안경형 능동 제어와 종단 학습으로 구분** |

Optinex의 백색공간은 `autofocus glasses`라는 말만으로는 확보되지 않는다. 다음 세 요소의 결합이 핵심이다.

1. 개인별 whole-field optical model
2. 주변부를 포함한 공간적 광학 제어
3. 기능 성능으로 다시 학습하는 longitudinal closed loop

#### 10.1.1 자원 비대칭 — `internal_only`, 공개 사이트 게재 금지

| 경쟁자 | 자금 | 인력 | 출구 |
|---|---|---|---|
| IXI (핀란드) | 시리즈 A **$36.5M**, 누적 $40M+ (Amazon 참여) | **75명** | 자체 양산·판매 |
| Laclarée (프랑스) | 비공개 | — | 자체 양산 |
| Voptica (스페인) | 대학 스핀오프 | — | 자체 장비 판매 |
| **Optinex Research** | **0원** | **핵심 1인 + 본업 병행 파트너** | **IP 이전** |

**이 표는 내부 전략 문서에만 둔다. 공개 사이트에 자금 비교를 넣지 않는다.**

자본이 없는 것은 약점이 아니라 **출구 전략이 다르다는 사실의 결과**다. 양산 경쟁에 참여하지 않기 때문에 양산 자본이 필요 없다(§0.2 C5·C6). 대외적으로는 자금이 아니라 **축**을 다르게 잡는다.

| | IXI · Laclarée | Voptica | **Optinex Research** |
|---|---|---|---|
| 대상 | 중심시 노안 | 중심시 수차 시뮬레이션 | **주변부 시야장** |
| 광학 상태 | 단일 초점면 실시간 전환 | 진단·시뮬레이션 | **경선·편심도별 공간 분포** |
| 출구 | 자체 양산·판매 | 자체 장비 판매 | **측정·모델 IP 이전** |

공개 카피 권장:

> Optinex Research는 장비를 양산하지 않습니다. 시야 전체의 광학 상태를 측정하고 모델링하는 방법을 만들고, 그것을 구현할 제조사에 이전합니다.

또한 [무르시아대 Artal 그룹](https://voptica.com/about-voptica/)은 가장 가까운 **과학적** 경쟁자인 동시에 잠재 협력처다. §5.1의 2순위(공동검증) 대상으로 관리한다.


### 10.2 관련 특허 예비 지도

| 권리자·문헌 | 관련 범위 | 전략적 의미 |
|---|---|---|
| Apple [US11086143B1](https://patents.google.com/patent/US11086143B1/en) — *Tunable and Foveated Lens Systems*, 출원 2019-06-10 / 등록 2021-08-10 | 액정 렌즈에서 **시선 영역과 주변 영역의 광학 굴절력을 다르게** 제어 | **원문 확인 결과 청구 구조는 foveated다.** 시선 영역의 액정을 제어하고 주변부는 `optically unmodulated`로 두거나 `less spatially varied`로 처리한다 → §10.3-1 참조 |
| Dolby [US12326570B2](https://patents.google.com/patent/US12326570B2/en) | gaze/vergence와 focus-tunable lens | 시선+가변초점의 일반 결합은 차별화가 약함 |
| Focure [US20170123234A1](https://patents.google.com/patent/US20170123234A1/en) | structured light depth, gaze, tunable lens control | 거리추정 기반 autofocus 선행기술 |
| Hoya [US20240168313A1](https://patents.google.com/patent/US20240168313A1/en) | peripheral defocus region spectacle design | 주변부 영역 설계 자체도 혼잡함 |
| Zeiss [EP4006624B1](https://patents.google.com/patent/EP4006624B1/en) | ring-shaped focusing structures | 근시제어용 정적 구조와 구분 필요 |

### 10.3 특허 차별화 후보

> **선행조건: §10.0 자기공지 감사 완료 전에는 아래 항목의 출원 가능성을 확정할 수 없다.** 이미 발표된 것과 아직 발표되지 않은 것을 구분한 뒤에야 이 목록이 의미를 갖는다.

**1. `[최우선]` 주변부 능동 구동 — 대형 선행기술이 비워 둔 공간**

Apple US11086143B1을 원문 확인한 결과, 청구는 **foveated** 구조다. 시선 영역의 액정을 제어하고 **주변부는 광학적으로 변조하지 않거나(`optically unmodulated`) 공간 변화를 줄인다.** 창업자의 1호 탐사선(§1.4)은 **정확히 그 반대** — 중심부 자동초점 + **주변부 링존 능동 제어**다.

즉 문서 초안이 "foveated·공간가변 렌즈 청구가 혼잡함"이라고 요약하고 넘어간 그 특허가, 실제로는 **주변부 능동 구동이 대형 선행기술의 청구 범위 밖에 남아 있다는 증거**다. 이 대비를 변리사 검토의 첫 항목으로 올린다.

**2. 이하 후보 (자기공지 감사 후 재평가)**

- 개인별 처방장 `P(θ, φ, z, p, λ, t)`을 생성하는 측정·최적화 방법 ← **#27·#28·#33·#34로 이미 공지 가능성 높음**
- 주변부 retinal conjugate map과 실물 광학 구동기의 calibration
- 사카드·주시전환을 예측하는 지연 보상
- optical metric가 아니라 **기능 metric**로 제어 정책을 업데이트하는 방법 ← §4.2.1의 올바른 종점과 직결. 미공개 영역일 가능성이 높다
- 사용자의 적응 상태와 안전한 fallback을 포함한 제어
- 측정 불확실성을 반영해 보정량을 제한하는 방법
- 실험 프로토콜에서 wearable command로 이어지는 end-to-end traceability

**3. 국내(KR) 지형 조사 부재**

현재 인용 특허 5건이 모두 US/EP다. **한국 법인의 1차 관할은 KR**이므로 [KIPRIS](https://www.kipris.or.kr/)에서 주변부 디포커스·가변초점 안경렌즈·경선별 굴절 교정의 KR 등록·출원과, Essilor·Hoya·Zeiss의 **KR 패밀리**를 조사해야 한다. 상표 조사(§1.1)와 같은 세션에서 처리하면 비용이 절약된다.


웹사이트는 공개 전 특허 검토가 필요한 unpublished method를 자세히 설명하지 않는다. 원리는 공개하되 구현 파라미터·캘리브레이션 핵심은 `approval_required`로 관리한다.

---

## 11. 시각 디자인 시스템

### 11.1 디자인 원칙

1. **Instrument, not sci-fi.** 미래적이되 실제 계측기처럼 단위·범례·불확실성이 있어야 한다.
2. **Evidence before spectacle.** 장식용 눈보다 연구 figure가 더 중요한 시각 자산이다.
3. **Peripheral by design.** 화면 중심만 강조하지 않고 주변부에 정보의 흔적·field coordinate를 둔다.
4. **Darkroom with readable light.** 어두운 실험실 감성은 유지하되 본문 가독성과 대비를 희생하지 않는다.
5. **Motion must explain.** 움직임은 주시 이동·초점 변화·field update를 설명할 때만 쓴다.
6. **A vision company must be exemplary in accessibility.** 확대, 키보드, screen reader, motion safety를 기본 설계로 해결한다.

### 11.2 권장 시각 어휘

- retinal field map
- meridional contour
- wavefront phase map
- ray bundle and focal lines
- gaze vector
- confidence interval band
- calibration grid
- apparatus silhouette
- 실제 실험 figure와 장치 사진

피할 것:

- 출처 없는 뇌 신경망 렌더
- 가짜 실시간 숫자가 도는 HUD
- 임상 지표처럼 보이는 장식용 gauge
- 의미 없는 glowing particles
- 실제 연구결과처럼 보이는 AI 생성 chart

### 11.3 컬러 토큰 초안

```css
--surface-0: #071014;
--surface-1: #0b171d;
--surface-2: #11232b;
--text-strong: #f3f8fa;
--text-body: #c5d3d9;
--text-muted: #8fa4ad;
--line: #29414b;
--field-cyan: #62d6e8;
--optics-blue: #79aef8;
--retina-amber: #f1b35b;
--evidence-green: #72d49b;
--warning: #f3c56b;
--risk: #ef7d7d;
```

색만으로 상태를 표시하지 않는다. 모든 상태에는 텍스트·아이콘·패턴을 함께 쓴다.

### 11.4 타이포그래피

- 본문: 로컬 호스팅 가변 sans. 한국어는 Pretendard 또는 Noto Sans KR의 라이선스·용량을 검토해 subset 제공
- 수치·단위·좌표: IBM Plex Mono 또는 유사 mono
- display: 지나치게 SF풍인 폰트보다 기술문서와 연구기기의 중간
- 본문 최소 16 px, 기본 17–18 px 권장
- 긴 한국어 문단의 양쪽정렬 금지
- 영문 대문자 tracking 남용 금지

### 11.5 레이아웃

- 데스크톱: 최대 본문 1200–1320 px, 읽기 열은 680–760 px
- 모바일: 상단 compact header, 로고 높이 28–34 px
- 현재 280 px 고정 sidebar는 research tool 느낌은 강하지만 콘텐츠 사이트의 탐색과 모바일 일관성을 해친다. 상단 global nav + 페이지 내부 sticky subnav를 권장한다.
- 연구 figure는 작은 card thumbnail로만 소비하지 않고 확대, 캡션, 범례를 제공한다.

---

## 12. 기술 아키텍처

### 12.1 권장 스택

**Astro + TypeScript + MDX + Content Collections**를 권장한다.

이유:

- 대부분의 페이지는 정적 콘텐츠라 JavaScript를 거의 보내지 않아도 된다.
- field map 같은 인터랙션만 island로 분리할 수 있다.
- Markdown/MDX로 연구자가 내용을 수정하기 쉽다.
- 한국어·영어 스키마를 빌드 시 검증할 수 있다.
- GitHub Pages에 정적 출력이 가능하다.

Next.js는 로그인·대시보드·서버 액션이 핵심이 될 때 별도 app으로 사용한다. 회사 마케팅·연구 사이트까지 처음부터 서버 프레임워크로 만들 필요는 없다.

### 12.2 권장 디렉터리

```text
src/
├── components/
│   ├── global/
│   ├── evidence/
│   ├── optics/
│   └── accessibility/
├── content/
│   ├── studies/
│   ├── publications/
│   ├── prototypes/
│   ├── programs/
│   ├── people/
│   ├── partners/
│   ├── journal/
│   └── claims/
├── data/
│   ├── asset-manifest.yaml
│   └── navigation.yaml
├── layouts/
├── pages/
│   └── [lang]/
├── styles/
└── lib/
    ├── i18n.ts
    ├── evidence.ts
    ├── claims.ts
    └── seo.ts
public/
├── fonts/
├── images/
│   ├── studies/
│   ├── apparatus/
│   ├── prototypes/
│   └── brand/
└── downloads/
```

### 12.3 다국어 모델

한국어와 영어가 같은 `content_id`를 공유해야 한다.

```yaml
id: STUDY-MOTION-CSF-2025
slug: motion-contrast-visual-pathways
title:
  ko: 좌우 시각경로에서 모션 대비감도의 비교
  en: Motion contrast sensitivity across visual pathways
summary:
  ko: ...
  en: ...
```

번역이 없는 항목은 숨기지 말고 원문과 `Translation pending`을 표시할 수 있다. 내용이 다른 한국어·영어 페이지 두 벌을 유지하는 것보다 정직하다.

### 12.4 콘텐츠 스키마 예시

```yaml
id: STUDY-MOTION-CSF-2025
kind: investigator_study
programs: [visual-neuroperformance]
contributes_to: [learn, model]
stage: internal_study
year: 2025
authors: [seo-jaemyung]
question: ...
sample:
  n: 24
  population: 정상 시력 성인
method:
  stimulus: 1 cpd Gabor
  eccentricity_deg: 20
  speed_conditions_cm_s: [0, 10, 30]
results:
  - metric: contrast_sensitivity
    statement: 속도 증가에 따라 유의하게 감소
    p_value: "<.001"
limitations: ...
assets:
  - result-motion-csf-plot
links:
  conference: ...
publicability: public
last_reviewed: 2026-08-26
```

### 12.5 내부 Research → 공개 웹 흐름

스테이션 운영 경계를 유지한다.

```mermaid
flowchart LR
    A[Optinex Research<br/>실험·논문·프로토타입] --> B[research_artifact_ready<br/>공개범위·claim 포함]
    B --> C[Business review<br/>과학·IP·개인정보 검토]
    C --> D[Website content PR]
    D --> E[CI validation]
    E --> F[Public website]
```

Research 에이전트가 공개 사이트를 자동 수정하지 않는다. `public / teaser_only / approval_required / confidential` 등급을 전달하고, 사람이 승인한 콘텐츠만 PR로 들어간다.

### 12.6 폼·데이터·분석 — 개인정보 보호법(PIPA) 기준

문서 초안은 HIPAA를 비판하면서 **정작 실제로 적용되는 한국 법을 한 번도 언급하지 않았다.** 한국 법인·연구소에 적용되는 것은 **개인정보 보호법**이며, 웹사이트 운영에는 다음이 직접 걸린다.

| 조항 | 의무 | 이 사이트에서의 조치 |
|---|---|---|
| **제30조** | 개인정보처리방침 수립 및 **웹사이트 상시 게재** | 현재 링크는 있으나 내용이 실제 처리 현황과 일치하는지 검증 (Track A P0) |
| **제23조** | **민감정보**(사상·신념, 건강, 성생활, 유전, 범죄경력, 생체인식) 처리 제한 | 연구 데이터 파이프라인 전체에 적용. §3.1·§22 레코드 제외의 근거 |
| **제15·17·22조** | 수집·이용·제3자 제공 동의, 만 14세 미만 법정대리인 동의 | 문의 폼 동의 항목 정비 |
| **제28조의8** | 개인정보 **국외 이전** 고지·동의 | §12.7에서 Cloudflare·Vercel 이전 시 반드시 검토 |
| 정보통신망법 제50조의2 | 이메일 주소 무단수집 거부 문구 | footer에 명시 |

운영 규칙:

- 연락 폼에는 환자정보·건강정보를 받지 않는다.
- 명시: `환자 또는 연구참여자의 개인정보·의료정보를 제출하지 마십시오.`
- 연구 참여 모집이 필요하면 별도의 IRB 승인된 시스템을 사용한다.
- 분석은 Plausible 또는 Cloudflare Web Analytics를 쓴다. 이유는 "최소수집"이 아니라 **쿠키리스라서 PIPA 동의 트리거 자체가 발생하지 않기 때문**이다. 이 근거를 개인정보처리방침에 적어 둔다.
- 세션 replay와 keystroke 수집은 사용하지 않는다.
- 이메일은 서버리스 relay 또는 별도 비즈니스 메일로 전달한다.
- 개발 preview에는 검색엔진 차단과 접근제어를 적용한다.

### 12.7 호스팅 — GitHub Pages의 구조적 제약

**중요: GitHub Pages는 서버 사이드 301/302 리다이렉트를 지원하지 않는다.** 가능한 것은 `<meta http-equiv="refresh">`와 404 페이지 트릭뿐이며 둘 다 SEO 신호 이전이 불완전하다. 따라서 문서 초안의 두 서술은 양립하지 않았다.

- §12.7 "1단계: GitHub Pages 유지 가능"
- §17 Phase 3 / §13.3 "기존 URL redirect", "redirect map으로 기존 URL 보존"

27개 기존 URL의 링크 자산을 온전히 보존하려면 **커스텀 도메인 + Cloudflare Pages(`_redirects`) 이전이 재구축의 선행조건**이다.

또 하나의 함정: 저장소 기반 Pages는 `https://<user>.github.io/MasVisio_Research/` 하위경로로 서빙된다. **Astro `base` 설정 없이는 모든 절대경로 링크와 에셋이 깨지고, 커스텀 도메인으로 전환하는 순간 `base`를 되돌려야 한다.** 그러므로 **도메인 결정은 Phase 3이 아니라 Phase 0에서** 내려야 한다(§1.1 도메인 즉시 확보와 연동).

Track A(현행 유지) 기준 조치:

- 1단계: GitHub Pages 유지. **단 URL 구조를 지금 바꾸지 않는다.** 재구축 시점에 한 번만 바꾼다.
- 커스텀 도메인은 지금 확보하되(§1.1), 연결 시점은 Track B 착수와 맞춘다.
- `?v=4.0` / `?v=5.0` 혼재를 하나로 통일한다(Track A P0).
- 대용량 연구 영상·데이터는 Git 저장소가 아니라 승인된 object storage를 쓴다.
- 폼, preview auth, 보안 header가 필요해지는 시점이 곧 Cloudflare Pages 이전 시점이다. **이때 PIPA 제28조의8 국외 이전 검토가 발생한다**(§12.6).


## 13. SEO·구조화 데이터

### 13.1 검색 의도

핵심 주제 클러스터:

- peripheral vision optics
- wide-field eye model
- peripheral refraction measurement
- adaptive vision / tunable lens
- contrast sensitivity research
- pupil dynamics
- vision rehabilitation
- personalized optical correction

#### 13.1.1 고유어 전략 — 폐기가 아니라 육성

문서 초안은 `전체망막 완전교정`을 "고유어로만 밀지 말라"고 했는데, **방향이 반쯤 뒤집혀 있었다.**

- `전체망막 완전교정` / `주변부 망막 완전교정`은 **창업자가 만든 개념**이므로 정의상 검색 경쟁자가 0이다. 이 회사가 카테고리를 정의하려면 이 용어를 검색 가능한 자산으로 **키워야** 한다.
- 반대로 §1.1이 새로 제안한 `Adaptive Vision Platform`은 **검색량이 사실상 0인 조어**다. 조어를 밀면서 실존 고유어를 버리는 것은 순서가 반대다.

권장 구조 — **고유어를 허브로, 학술어를 스포크로:**

```text
허브 페이지 (고유어, 경쟁 0)
  "전체망막 완전교정이란 무엇인가"  ← 정의 + Hypothesis 배지 + §4.2.1 경계
      ↑ 내부링크 ↑
스포크 페이지 (학술·산업 검색어, 경쟁 있음)
  주변부 굴절 · 주변부 망막 곡률 · 시야장 · 대비감도 · 시재활
  peripheral refraction · wide-field eye model · tunable lens
```

**아직 없는 것: 실제 키워드 리서치.** 현재 8개 영어 클러스터에는 검색량 데이터가 한 건도 없고, 1차 독자가 한국어인데 한국어 키워드 조사가 없다. Track A 범위에서 무료 도구(네이버 검색광고 키워드도구, Google Keyword Planner)로 **한국어 20개 · 영어 20개의 실제 검색량을 측정해 이 절에 기입**한 뒤에야 SEO 계획이 계획이 된다.


### 13.2 구조화 데이터

- Organization
- Person
- ScholarlyArticle
- Dataset — 실제 공개 데이터가 있을 때만
- SoftwareSourceCode — 공개 repo가 있을 때
- BreadcrumbList

MedicalDevice/Product schema는 실제 제품 상태·판매 가능성이 갖춰지기 전 사용하지 않는다.

### 13.3 기본 SEO 요건

- 언어별 canonical과 hreflang 자동 생성
- sitemap에서 구버전 dashboard와 중복 publications 제외
- OpenGraph 이미지 로컬 제공
- favicon과 web manifest
- 모든 연구 figure에 의미 있는 alt와 긴 설명
- DOI·KCI 링크 유효성 정기 검사
- redirect map으로 기존 URL 보존

---

## 14. 접근성·안전·규제

### 14.1 웹 접근성 승인 기준

**국제 기준 (설계 기준)**

- WCAG 2.2 AA
- 키보드만으로 모든 인터랙션 사용
- 200% text zoom에서 기능 손실 없음
- 400% reflow에서 수평 스크롤 최소화
- focus indicator 명확
- canvas에는 동등한 텍스트·표 제공
- 색각 이상 시에도 field map 판독 가능
- `prefers-reduced-motion` 완전 지원
- 자동 깜빡임 금지
- 자동 음성안내 금지

#### 14.1.1 국내 법정 기준 `[장기 실행]`

문서 초안은 국제 기준만 인용했다. **한국에서는 이것이 권장이 아니라 법적 의무가 되는 시점이 있다.**

- **장애인차별금지법 제21조 제1항 + 시행령 제14조** — 웹 접근성 준수 의무자에 **법인**이 포함된다. 즉 Optinex가 법인화하는 순간 의무 대상이 된다. [관련 해설](https://www.nepla.net/post/%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%B0%A8%EB%B3%84%EA%B8%88%EC%A7%80%EB%B2%95%EA%B3%BC-%EC%9B%B9%EC%A0%91%EA%B7%BC%EC%84%B1-%EC%A4%80%EC%88%98-%EC%9D%98%EB%AC%B4)
- **[KWCAG 2.2](https://a11ykr.github.io/kwcag22/)** — 국내 기준. 4원칙 / 14지침 / **33개 검사항목**. 특히 **광과민성 발작 예방 항목이 명시**되어 있어 §2.4의 1–30 Hz 자동 flicker 문제에 직접 적용된다.
- **웹 접근성 품질인증(WA 인증)** — 디지털포용법 제21조 근거, 과기정통부 지정기관 심사. [한국디지털접근성진흥원](http://www.kwacc.or.kr/Accessibility/Certification)

**실행 계획 (자원 현실 반영):**

| 시점 | 범위 |
|---|---|
| **Track A 즉시** | flicker 정지 + `prefers-reduced-motion`만 (§16). **이 둘은 KWCAG 광과민성 항목이자 시각 회사의 최소 자격이므로 미룰 수 없다** |
| Track A 점진 | alt 텍스트, 키보드 탐색, 대비비 — 페이지 손댈 때마다 하나씩 |
| 법인화 이후 | KWCAG 2.2 33개 항목 자체 점검 |
| 수익 발생 이후 | WA 인증 취득 |

**WA 인증은 시각 회사에게 컴플라이언스가 아니라 마케팅 자산이다.** 그리고 §11.1 원칙 6번("시각 회사는 접근성에서 모범이어야 한다")을 실제로 지키려면 스크린리더 자동 검사만으로는 부족하다. **15년간 연구해 온 저시력·반맹 당사자를 사이트 사용성 테스트에 참여시키는 것**이 이 회사가 할 수 있는 가장 설득력 있는 접근성 실천이다. 문서 초안에는 이 제안이 한 줄도 없었다.

### 14.2 규제 — 기술이전 모델에서의 위치 `[확정 C5 반영]`

**전제가 바뀌었다.** 창업자는 장치를 직접 양산·판매하지 않고, 검증된 결과물이 나오면 **기술이전 또는 특허 보유**로 간다(§0.2 C5). 따라서 "우리가 의료기기 인허가를 받는다"는 시나리오는 계획에서 빠진다. 그러나 **모델과 무관하게 남는 두 가지**가 있다.

#### 14.2.1 남는 것 1 — 사람에게 빛을 쬐는 순간의 안전과 윤리

기술이전 모델이어도 **데이터는 직접 만든다.** 자작 장비(`openaxis-biometer` 1060 nm OCT, `rtAR` 자동굴절계, 동공 rig)를 사람 눈에 대는 행위는 사업 모델과 무관하게 다음을 요구한다.

- **IRB 승인** — 연구 목적 인체 대상 연구. 자작 장비일수록 심의에서 안전 근거를 더 요구한다.
- **[ISO 15004-2](https://www.iso.org/standard/72616.html) 광방사 안전** — 자작 광원의 노출량 계산과 근거 문서. 창업자가 `openaxis-biometer`에서 광안전을 WP-25 최우선으로 둔 것은 정확한 판단이다.
- **측정 결과를 참여자에게 임상 소견으로 반환하지 않는다** — 반환하는 순간 연구가 아니라 진료·진단 행위로 성격이 바뀐다.
- 참고: **의료기사 등에 관한 법률 시행령 제2조** — 안경사의 시력검사 업무범위에서 *자동굴절검사기기를 사용하지 않는 타각적 굴절검사*는 제외된다. 어떤 자격으로 어떤 장비를 쓰는지가 업무범위와 직결된다.

#### 14.2.2 남는 것 2 — 규제 문서 자체가 기술이전의 가격이다

**여기서 규제 표준의 의미가 뒤집힌다.** 우리가 인허가를 받지 않더라도, **기술을 이전받는 제조사는 반드시 인허가를 받아야 한다.** 그 제조사가 가장 먼저 묻는 것은 "성능이 좋은가"가 아니라 **"이걸 우리 품질시스템에 넣을 수 있는가"**다.

| 표준 | 우리가 하는 일 | 기술이전 시 효과 |
|---|---|---|
| [ISO 14971:2019](https://www.iso.org/standard/72704.html) 위험관리 | 위험 분석 표를 지금부터 남긴다 | 수취인이 처음부터 다시 하지 않아도 됨 |
| [IEC 62304](https://committee.iso.org/standard/38421.html) SW 생명주기 | 요구사항 → 설계 → 테스트 추적성 유지 | `ret_prof`의 테스트 102개·JSON Schema가 이미 그 형태다 |
| [ISO 15004-1](https://www.iso.org/standard/72616.html) 안과기기 일반 | 측정 조건·정확도 명세 | `openaxis` PRD가 이미 그 형태다 |
| ISO 15004-2 광방사 안전 | 노출량 계산 근거 | 없으면 이전 자체가 막힌다 |

즉 **이 표준들은 "미래 제품 개발에서 추적할 것"이 아니라 지금 만드는 산출물의 형식**이다. 문서를 표준 형식으로 남기면 기술이전 가격이 오르고, 남기지 않으면 상대가 처음부터 다시 만들어야 하므로 가격이 내려간다. 이미 `openaxis-biometer`의 PRD→성능지표→BOM→WP/DoD 구조가 이 방향이므로, 남은 일은 **그 규율을 나머지 저장소로 확장하는 것**이다.

#### 14.2.3 웹 카피에서의 규칙

- **웹 카피가 intended use를 사실상 결정한다.** 규제 검토 없이 `diagnose` / `treat` / `prevent` / `진단` / `치료` / `예방`을 쓰지 않는다.
- 참고: 「디지털의료제품법」 하위규정 시행에 따라 식약처는 2025-05-07 「디지털의료기기소프트웨어 허가·심사 가이드라인」을 신규 제정하고 「인공지능기술이 적용된 디지털의료기기 허가·심사 가이드라인」 등 5종을 개정했다. 동공 바이오마커 알고리즘류를 **진단 목적으로 표방하는 순간** 이 체계의 대상이 된다. [개요](https://www.lexology.com/library/detail.aspx?g=516ed348-16f2-48f0-9545-dc8a061790d5)
- 사이트 표기는 `exploratory research` / `investigator-conducted study`로 유지한다. 이것은 방어가 아니라 **사실 그대로의 서술**이다.

---


## 15. 테스트·품질 게이트

> **`[보류]` — 2026-08-27 창업자 결정.** 이 절 전체는 **Track B(전면 재구축)에 종속**된다. Track A(기존 정적 사이트 유지)에서는 CI 파이프라인을 구축하지 않는다.
>
> 다만 §15.2의 테스트 목록 중 **하나만은 Track A에서도 필요하다**: `publicability: excluded_sensitive` 또는 `BLOCKED`로 표시된 레코드가 배포 산출물에 등장하지 않는지 확인하는 것. 이것은 CI 없이 배포 전 `grep` 한 줄로도 가능하다(§16 참조). 문서 초안의 12개 테스트 목록에는 정작 이 검사가 빠져 있었다.

### 15.1 CI 파이프라인

모든 PR에서 다음을 자동 실행한다.

```text
format
→ lint
→ typecheck
→ content schema validation
→ claim registry validation
→ build
→ broken-link/DOI check
→ Playwright functional tests
→ axe accessibility tests
→ visual regression
→ Lighthouse CI
```

### 15.2 필수 자동 테스트

- 한국어·영어 route가 모두 빌드되는가
- 언어 전환이 대응 페이지로 가는가
- 59개 기존 publication이 모두 이관되었는가
- Evidence filter가 키보드와 screen reader로 동작하는가
- 모든 image asset에 provenance와 alt가 있는가
- `experimental_result` figure가 `concept_illustration`으로 잘못 표시되지 않았는가
- 승인되지 않은 claim이 제품·홈 page에 등장하지 않는가
- `Roadmap` 항목에 현재 이용 불가 문구가 있는가
- 외부 hotlink가 없는가
- 320, 375, 768, 1024, 1440 px에서 navigation이 동작하는가
- reduced motion에서 animation loop가 실행되지 않는가
- flash 위험 패턴이 자동 시작하지 않는가

### 15.3 성능 예산

초기 권장 예산:

- 홈 initial JS: gzip 80 KB 이하 목표
- interactive island별 JS: gzip 40 KB 이하
- LCP image: 250 KB 이하 권장
- 페이지당 총 이미지: 일반 route 1.5 MB 이하, Evidence figure page는 예외 허용
- LCP < 2.5 s, INP < 200 ms, CLS < 0.1 목표
- 폰트는 필요한 subset만 로컬 제공

연구 figure는 정보가 우선이므로 원본 다운로드는 별도 링크로 제공하고, 화면 표시용 AVIF/WebP derivative를 생성한다.

---

## 16. Track A — 기존 사이트에서 지금 할 일 `[확정 C7]`

재구축(Track B) 없이 현재 정적 사이트에서 처리한다. 순서는 **법적 노출 → 안전 → 정확성 → 정리** 순이다.

### 16.1 P0 — 법적·안전 (지금, 총 3~5시간)

| # | 조치 | 근거 |
|---:|---|---|
| 1 | **민감정보 레코드 삭제** — §22 구 24번(성적 지향성 관련)을 `content_v5.json`의 ko/en `publications`에서 제거. 내부 `study_id`만 보존 | 개인정보 보호법 제23조 · §3.1 |
| 2 | **시간주파수 1–30 Hz 자동 flicker 정지** → 정적 썸네일 + 사용자 시작 버튼 + 광과민성 경고 | WCAG 2.2 / KWCAG 2.2 광과민성 |
| 3 | `prefers-reduced-motion: reduce` 적용 | 동일 |
| 4 | **`HIPAA` 문자열 8곳 전량 제거·교체** — 한국 법인에 적용되지 않는 미국법 | §9.3.2 |
| 5 | 개인정보처리방침이 **실제 처리 현황과 일치하는지** 점검 (분석도구·문의폼 포함) | 개인정보 보호법 제30조 |
| 6 | 모든 문의 폼에 `환자 또는 연구참여자의 개인정보·의료정보를 제출하지 마십시오.` 문구 추가 | §12.6 |
| 7 | footer에 이메일 무단수집 거부 문구 추가 | 정보통신망법 제50조의2 |

배포 전 확인 (CI 대신 명령 한 줄):

```bash
grep -ri "HIPAA\|성적 지향" --include="*.html" --include="*.json" . && echo "차단: 미처리 항목 존재"
```

### 16.2 P1 — 주장의 정확성 (수주 내)

1. `진단`(24회) · `실시간`(34회) · `완전교정`(4회) 전수 점검 후 §9.3 규칙에 맞게 수정
2. 직접 수행한 연구 이미지에 캡션·연구명·연도·출처 추가
3. 내부 연구 수치에 표본·검증범위·연구상태 표시
4. `90%` 등 정량 표현에 §9.1 claim registry 최소 항목(표본·검증범위) 부착
5. 팀·파트너의 현재 역할과 공개 동의 확인
6. Evidence 표기에 **저자 전원 원문 표기** 규칙 적용 (§9.1.1)

### 16.3 P2 — 정리·정합성 (여유 있을 때)

1. 모바일 헤더 크기와 floating 접근성 컨트롤의 콘텐츠 가림 해결
2. favicon 추가
3. 외부 폰트·로고 hotlink 제거
4. `dashboard_v1/v2/v3`와 중복 publications route를 sitemap에서 제외
5. `?v=4.0` / `?v=5.0` 혼재를 하나로 통일
6. 중복 레코드(#1/#36) 병합 표기
7. 오탈자 수정 — #38 `시각졍로` → `시각경로`, #25 `스크리팅` → `스크리닝`
8. 홈의 세 기둥(PX-01/02/03)을 Measure–Model–Augment–Learn으로 재서술
9. 한국어·영어 키워드 실제 검색량 측정 후 §13.1에 기입

**P0의 1번을 제외하면 연구 결과를 삭제하지 않는다. 맥락과 상태를 추가한다.**

---


## 17. 로드맵 — 2트랙 `[확정 C7]`

문서 초안은 Phase 0–5를 **8–12주**로 산정했다. 그러나 창업자는 **본업 병행 1인**이다(§0.2 C4). 주당 가용 8–12시간을 가정하면 같은 분량은 실제로 **6–9개월**이며, 그 기간의 시간은 웹사이트가 아니라 **1호 탐사선과 자기공지 감사(§10.0)**에 들어가야 한다.

**더 근본적인 문제는 순서였다. 담을 내용이 확정되기 전에 그릇부터 바꾸고 있었다.**

### 17.1 Track A — 지금 (기존 사이트 유지)

| 항목 | 소요 | 산출물 |
|---|---|---|
| §16.1 P0 법적·안전 | 3~5시간 | 민감정보 제거, flicker 정지, HIPAA 제거, PIPA 정합 |
| §10.0 **자기공지 감사** | 변리사 의뢰, 2주 | IP 재고 확정 — **모든 항목 중 최우선** |
| §1.1 상표·도메인 조사 | 반나절 | KIPRIS 조사 + 도메인 확보 |
| §16.2 P1 주장 정확성 | 수주, 점진 | claim 맥락 부착 |
| §16.3 P2 정리 | 여유 시 | 중복·오탈자·sitemap |

Track A는 **일정이 아니라 우선순위 목록**이다. 마감을 두지 않는다. 1인 부업 체제에서 마감이 있는 계획은 지켜지지 않고, 지켜지지 않은 계획은 문서 전체의 신뢰를 깎는다.

### 17.2 Track B — 전면 재구축 (Astro) `[보류]`

**착수 시점은 일정이 아니라 트리거로 정한다.** 아래 중 하나가 발생하기 전에는 시작하지 않는다.

```text
트리거 (하나 이상 충족 시 착수 검토)
  ① 수익 발생 — 기술이전·라이선싱·SaaS 중 어느 것이든 첫 매출
  ② 웹 담당 인력 합류 또는 외주 예산 확보
  ③ 1호 탐사선의 bench 결과가 나와, 공개할 새 콘텐츠가 실제로 생김
  ④ §10.0 감사 완료로 기술이전 페이지(§5.3)를 공개할 수 있게 됨
```

트리거 전에 재구축하면 **새 그릇에 옛 내용을 그대로 옮기는 작업**이 된다. 사이트의 문제는 기술 스택이 아니라 서사와 근거 표기였고, 그 둘은 Track A에서 고칠 수 있다.

착수 시 §12(기술 아키텍처)·§15(품질 게이트)의 기존 내용을 적용하되, 다음 두 가지는 **Phase 0으로 앞당긴다**(§12.7).

- 커스텀 도메인 확정 — Astro `base` 설정과 URL redirect 전략이 여기에 달려 있다
- 호스팅 이전 여부 확정 — GitHub Pages는 서버 리다이렉트가 불가능하다

### 17.3 운영 (Track 무관, 최소한)

- 분기 1회: 링크·DOI 점검, roadmap 상태 갱신
- 반기 1회: claim review, competitor·patent landscape 갱신
- 월 1회 리뷰는 1인 체제에서 지켜지지 않으므로 설정하지 않는다

---


## 18. 성공 지표 — `internal_only` (대외 노출 보류)

**이 절은 유지하되 사이트에 게시하지 않는다.** 삭제하지 않는 이유는 기술이전 모델에서도 "이 사이트가 일을 하고 있는가"를 판단할 최소한의 근거가 필요하기 때문이고, 게시하지 않는 이유는 자본·트래픽 규모가 경쟁자와 비교될 이유가 없기 때문이다(§10.1.1).

문서 초안의 KPI 12개는 **현재값·목표값·측정도구가 하나도 없었다.** §18.3에서 "근거 없는 300% 증가 예상"을 허영 지표로 정확히 비판해 놓고, 형태만 바꿔 같은 오류를 반복한 것이다. 그리고 확정된 모델이 기술이전인데 그에 대응하는 지표가 없었다.

### 18.1 베이스라인 — 측정 전에는 목표를 세우지 않는다

**미측정 상태로 이 문서를 확정하지 않는다.** 아래 표를 채우는 것이 이 절의 첫 작업이다.

| 항목 | 현재값 | 측정 도구 |
|---|---|---|
| 월 방문 | `__` | Plausible (설치 필요) |
| 문의 건수 / 그중 적합 건수 | `__ / __` | 메일함 수기 |
| DOI·원문 클릭 | `__` | 이벤트 |
| KO : EN 방문 비율 | `__` | Plausible |

기지값(2026-08-27 실측):

| 항목 | 현재값 |
|---|---|
| 검증 링크 보유 레코드 | **21 / 59 (35.6%)** |
| 초록 보유 레코드 | **22 / 59 (37.3%)** |
| 공개 저장소 수 | **18개** |
| 그중 사이트에 문서화된 것 | **0개** |

### 18.2 결과 지표 — 기술이전 모델 기준 (연 단위, 내부)

숫자 목표는 창업자가 확정한다. 항목만 고정한다.

- **IP** — 출원 건수, §10.0 감사 결과 확보된 출원 가능 항목 수
- **기술이전 파이프라인** — NDA 체결 수, 데이터룸 요청 수, 유효 접촉 제조사 수
- **자원** — 주당 투입 시간 변화, 자금·과제 확보 여부 (§0.2 C6 해소 진척)
- **검증** — 공동검증 착수 건수

### 18.3 품질 지표 — 사이트 자체의 위생 (자동 판정 가능)

- `HIPAA` 등 부적절 문구 잔존 **0건**
- 자동 flash/flicker **0건**
- 민감정보 제외 레코드의 산출물 노출 **0건**
- provenance·저자 표기 없는 연구 이미지 **0건**
- 검증 링크 보유율: 21/59 → 목표 `__`/57
- 공개 저장소 문서화: 0/18 → 목표 `__`/18

### 18.4 피해야 할 허영 지표

- 근거 없는 체류시간·트래픽 증가 예상
- 상용화 전 시장점유율·ROI 보장
- 진행률 95% 같은 주관적 bar
- 임상시험과 연결되지 않은 `clinical success rate`
- **경쟁자 대비 자금·인력 규모** — 비교 축이 아니다(§10.1.1)

---


## 19. 공개 전에 확인할 설립자 인터뷰 항목

이 항목은 문서 작성을 막지 않지만 실제 카피와 공개범위를 결정한다.

1. 최상위 회사명은 `Optinex`로 확정하는가, 법인·연구소 명칭은 무엇인가?
2. `MasVisio Research`라는 저장소명과 공개 URL은 역사명으로 남길 것인가?
3. 현재 외부에 제공 가능한 것은 공동연구, 검증, 자문, 소프트웨어 demo 중 어디까지인가?
4. 59건 중 각 성과에서 본인의 역할과 공동저자 표기 원칙은 무엇인가?
5. 내부 대비감도·동공·주변부 연구의 원 프로토콜, 분석표, 발표자료를 어디까지 공개할 수 있는가?
6. 47개 후보 특징과 AUC 결과의 training/validation 구조, 표본, 교차검증 방식은 무엇인가?
7. 원본 연구이미지 중 참여자 얼굴·눈 영상·식별정보가 포함된 것은 무엇인가?
8. 현재 공개 가능한 팀원과 파트너, active/past 관계는 무엇인가?
9. 아직 출원 전이어서 공개하면 안 되는 광학 설계·캘리브레이션은 무엇인가?
10. 첫 12개월 동안 가장 원하는 협력 3가지는 무엇인가?
11. 투자자, 연구자, 기업 파트너 중 첫 홈의 제1 독자는 누구인가?
12. custom domain과 공식 이메일을 언제 전환할 것인가?

---

## 20. 제안하는 최종 메시지 체계

### Level 1 — 5초

> **교정은 중심시에서 멈췄습니다. 우리는 시야 전체를 모델링합니다.**

### Level 2 — 20초

> Optinex는 눈과 주변부 시야를 측정하고, 개인별 광학 프로파일을 만들고, 이를 적응형 광학계로 구현하려는 회사입니다.

### Level 3 — 1분

> 이 비전은 갑자기 만들어진 슬로건이 아닙니다. 저시력과 주변시야 재활, 대비감도와 운동시각, 동공 동역학, 망막 형상과 주변부 굴절, 자동굴절계와 시제품 연구를 직접 수행하며 축적한 결과가 Measure–Model–Augment–Learn이라는 하나의 기술 루프로 연결되었습니다.

### Level 4 — 전문가

> 개인별 wide-field eye model을 구축하고 시야각, 주시거리, 동공, 시간, 사용자 과제에 따라 필요한 광학 상태를 계산하며, optical quality와 functional vision을 함께 최적화하는 closed-loop adaptive vision platform을 지향합니다.

---

## 21. 참고 근거

### 현재 구현

- [MasVisio Research GitHub repository](https://github.com/myoung906/MasVisio_Research)
- [현재 한국어 홈](https://myoung906.github.io/MasVisio_Research/ko/index.html?v=5.0)

### 과학·기술

- [Peripheral refraction and higher-order aberrations review](https://pmc.ncbi.nlm.nih.gov/articles/PMC6973144/)
- [Peripheral higher-order aberration correction and visual performance](https://pubmed.ncbi.nlm.nih.gov/31044955/)
- [IMI instrumentation for myopia management](https://pmc.ncbi.nlm.nih.gov/articles/PMC12227030/)
- [Autofocals: gaze- and depth-aware tunable-lens eyewear](https://pmc.ncbi.nlm.nih.gov/articles/PMC6598771/)
- [IlluminatedFocus: spatially varying real-world defocus](https://pubmed.ncbi.nlm.nih.gov/32078550/)
- [AR digital spectacles for peripheral visual field loss](https://pmc.ncbi.nlm.nih.gov/articles/PMC7556490/)
- [Personalized eye model](https://pmc.ncbi.nlm.nih.gov/articles/PMC6534604/)
- [Wide-field schematic eye model](https://doi.org/10.1364/OPTICA.2.000124)
- [Ocular wavefront tomography](https://pubmed.ncbi.nlm.nih.gov/19065188/)
- [Digital twins in ophthalmology](https://pubmed.ncbi.nlm.nih.gov/40378962/)
- [ipRGCs and refractive error](https://pmc.ncbi.nlm.nih.gov/articles/PMC9068560/)
- [Atchison 2013 — Visual Performance with Lenses Correcting Peripheral Refractive Errors](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0000000000000033) — **성인 주변부 굴절 교정의 시기능 효과를 직접 시험한 선행연구. §4.2.1 필독**
- [Lundström 2007 — Vision Evaluation of Eccentric Refractive Correction](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0b013e318159aa7a)
- [Lewis 2014 — Objectively Determined Refraction Improves Peripheral Vision](https://onlinelibrary.wiley.com/doi/10.1097/OPX.0000000000000301)
- [Effects of refractive error on detection acuity and resolution acuity in peripheral vision](https://pubmed.ncbi.nlm.nih.gov/9331277/) — 탐지 대 해상의 분리
- [Clinical adaptive optics visual simulator (Voptica VAO)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6320260/)

### 공중보건·규제·접근성

- [WHO: Blindness and vision impairment](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment)
- [WHO: Refractive errors](https://www.who.int/news-room/questions-and-answers/item/blindness-and-vision-impairment-refractive-errors)
- [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)
- [WCAG 2.2 Three Flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html)
- [ISO 14971:2019](https://www.iso.org/standard/72704.html)
- [IEC 62304](https://committee.iso.org/standard/38421.html)
- [ISO 15004-1:2020](https://www.iso.org/standard/72616.html)

### 국내 법령·제도

- [개인정보 보호법](https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%B2%95) — 제23조 민감정보, 제30조 처리방침, 제28조의8 국외이전
- [개인정보 처리 제한 해설](https://www.easylaw.go.kr/CSP/CnpClsMainBtr.laf?popMenu=ov&csmSeq=1257&ccfNo=2&cciNo=3&cnpClsNo=1)
- [식약처 디지털의료기기 가이드라인 6종 제·개정 (2025-05-07)](https://www.lexology.com/library/detail.aspx?g=516ed348-16f2-48f0-9545-dc8a061790d5)
- [의료기사 등에 관한 법률 시행령 제2조 — 안경사 업무범위](https://lawnb.com/Info/ContentView?sid=L000004481_2_20160203)
- [KWCAG 2.2 한국형 웹 콘텐츠 접근성 지침](https://a11ykr.github.io/kwcag22/)
- [웹 접근성 품질인증 — 한국디지털접근성진흥원](http://www.kwacc.or.kr/Accessibility/Certification)
- [장애인차별금지법 제21조와 웹접근성 준수 의무](https://www.nepla.net/post/%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%B0%A8%EB%B3%84%EA%B8%88%EC%A7%80%EB%B2%95%EA%B3%BC-%EC%9B%B9%EC%A0%91%EA%B7%BC%EC%84%B1-%EC%A4%80%EC%88%98-%EC%9D%98%EB%AC%B4)

### 지식재산

- [특허청 공지예외주장 제도](https://www.kipo.go.kr/ko/kpoContentView.do?menuCd=SCD0200239)
- [자기공지에 의한 특허권 상실](http://www.hitnews.co.kr/news/articleView.html?idxno=31735)
- [KIPRIS 특허·상표 검색](https://www.kipris.or.kr/)
- [Apple US11086143B1 — Tunable and Foveated Lens Systems](https://patents.google.com/patent/US11086143B1/en)

### 경쟁 지형

- [Voptica S.L.](https://voptica.com/about-voptica/) — VAO 적응광학 시각 시뮬레이터, ArtIOLs
- [IXI 시리즈 A $36.5M](https://ixieyewear.com/articles/ixi-raises-365-million-series-a-to-develop-autofocus-eyewear-that-will-transform-how-humanity-sees-)

---

## 22. 부록 — 기존 연구성과 이관 레지스트리

아래 목록은 `assets/data/content_v5.json`의 한국어 연구성과 59건에서 추출한 migration baseline이다. 제목을 임의로 삭제·합치지 않고, 새 사이트에서 관련 `study_id`와 4개 Research Program을 추가로 연결한다. 오탈자·공식 영문명·중복 발표 여부는 원 발표자료와 대조한 뒤 정정하되 원 레코드도 보존한다.

**공개 목록 산정 (§3.2 수용기준):**

```text
원본 레코드            59
- 민감정보 제외         1   (구 24번, 개인정보 보호법 제23조)
- 중복 병합             1   (#1 정책 논문 ≡ #36 학술발표, study_id로 연결)
────────────────────────
공개 목록              57
```

### 22.1 제외 레코드 `[확정 C9]`

```yaml
record_id: LEGACY-024
original_index: 24
year: 2025
publicability: excluded_sensitive
reason: 개인정보 보호법 제23조 민감정보(성생활·성적 지향)에 해당
decision: 공개 목록에서 삭제. 제목·저자·초록 모두 비공개
retained: 내부 study_id만 보존 (연구 자체의 정당성과는 무관한 조치)
approver: 서재명
decided: 2026-08-27
```

**조치:** `content_v5.json`의 `ko.publications` / `en.publications` 양쪽에서 제거한다(§16.1 P0-1). 배포 전 `grep`으로 잔존 여부를 확인한다.

### 22.2 목록

아래 번호는 원본 인덱스를 보존한다. **24번은 §22.1에 따라 제외되어 결번**이다.

| # | 연도 | 기존 분류 | 제목 |
|---:|---:|---|---|
| 1 | 2022 | 정책 | 경남 차상위계층의 시각적 삶의 실태 연구 |
| 2 | 2022 | 정책 | 해외 시교정 보정용구 전자상거래 현황과 한국의 정책적 방향성 고찰 (1) - 유럽연합과 영국을 중심으로 |
| 3 | 2021 | 정책 | 시력보정용안경의 온라인 판매를 위한 계획서의 문제점들에 대한 연구 |
| 4 | 2020 | 정책 | 우수한 안경사 교육과 양성을 위한 정책 제안 |
| 5 | 2020 | 정책 | 과학기술 발달에 따른 한국 안경계 미래에 관한 고찰 II: 4차 산업혁명 시대의 안경광학과 교과목의 발전 방향에 대한 예비 연구 |
| 6 | 2019 | 정책 | 독일의 마이스터와 검안사 교육시스템에 관한 연구 I |
| 7 | 2019 | 임상 | 습윤제가 흡착된 콘택트렌즈가 대비감도함수에 영향을 주는 효과 |
| 8 | 2018 | 임상 | 안구의 버전스 기능이 눈과 손 협응에 미치는 영향 |
| 9 | 2018 | 임상 | 입체시각의 시간적 특징 |
| 10 | 2018 | 임상 | 독일식과 영미식 주시시차에 대한 방법론적 분석 |
| 11 | 2017 | 정책 | 한국 안경사 양성기관의 교육과정에 관한 연구 |
| 12 | 2017 | 임상 | 저시력 환자용 광학적 시보조기구의 계산배율과 처방배율에 관한 연구 |
| 13 | 2016 | 임상 | 칼라필터 렌즈에 따른 대비감도의 변화 |
| 14 | 2015 | 정책 | 과학기술 발달에 따른 한국 안경계 미래에 관한 고찰 I: 안경 산업의 예측과 정책 제안 |
| 15 | 2015 | 정책 | 안경사제도의 변화 필요성에 대하여 |
| 16 | 2014 | 시제품 | 동측성 반맹시 환자의 재활치료용 시분할 장치 개발에 관한 연구 |
| 17 | 2014 | 시제품 | 아이트래커를 이용한 모니터 글자 색상에 따른 가독성에 대한 연구 |
| 18 | 2014 | 임상 | 중심외주시 훈련 후 망막 외망상층에서의 신경 재조직화 |
| 19 | 2014 | 임상 | 중심외주시 훈련 후 주변시야에서의 대비감도 변화 |
| 20 | 2013 | 임상 | 중심외주시 훈련용 주변부 망막의 생리적 가중에 관한 연구 |
| 21 | 2009 | 임상 | 대비감도를 사용한 캐나다 내 저시력 환자와 정상인의 시기능 분석 |
| 22 | 2009 | 임상 | 저시력 환자의 삶의 질과 일상에 영향을 주는 병인에 관한 연구 |
| 23 | 2025 | 학술발표 | 좌우 시각경로에서 모션 대비감도의 비교 연구 |
| 25 | 2025 | 학술발표 | 비침습적 동공 바이오마커를 활용한 다중 신경학적 질환 조기 스크리닝 알고리즘 개발 *(원문 오탈자 `스크리팅`)* |
| 26 | 2025 | 학술발표 | 굴절이상에 따른 주변부 망막의 경선별 변화 |
| 27 | 2024 | 학술발표 | 경선별 주변부 망막 교정을 위한 구면굴절력과 각막곡률반경의 상관관계 연구 |
| 28 | 2024 | 학술발표 | 망막 초평면 profile 알고리즘 설계를 위한 안광학계 광선추적에 관한 연구 |
| 29 | 2024 | 학술발표 | 근시억제용 망막 주변부 교정을 위한 방법 고찰 |
| 30 | 2023 | 학술발표 | 기계학습의 확률분포로 추정하는 구면굴절력 측정값의 타당성 검증 |
| 31 | 2023 | 학술발표 | 검영법을 기반으로 한 구면 자동안굴절계 설계에 관한 연구 |
| 32 | 2023 | 학술발표 | 기계학습 기반의 실시간 자동안굴절계 설계 연구 |
| 33 | 2023 | 학술발표 | 전체망막 완전교정을 위한 망막 초평면에 관한 pilot연구 |
| 34 | 2023 | 학술발표 | 근시억제용 소프트콘택트렌즈의 맞춤형 가입도 디자인 설계를 위한 전체망막 형상 계산에 관한 연구 |
| 35 | 2023 | 학술발표 | 동공간거리와 굴절이상이 입체시에 미치는 영향 |
| 36 | 2022 | 학술발표 | 경남 차상위계층의 시각적 삶의 실태 연구 ← **#1과 중복, `study_id`로 병합** |
| 37 | 2022 | 학술발표 | 황색필터에 대한 이측과 비측 망막의 동체시각 반응 |
| 38 | 2022 | 학술발표 | 우세안이 좌우 시각경로(원문 오탈자 `시각졍로`)의 시기능에 미치는 영향 |
| 39 | 2022 | 학술발표 | 축성근시의 Pattern VEP 변화에 대한 pilot 연구 |
| 40 | 2022 | 학술발표 | 축성근시에서 굴절이상과 주변부 망막만곡도의 상관관계에 대한 pilot연구 |
| 41 | 2022 | 학술발표 | 야간에 주시하는 전자매체의 휘도와 굴절이상이 홍채 순응시간에 미치는 영향 |
| 42 | 2022 | 학술발표 | 공막 프로파일 분석을 위한 실시간 3D scanner 제작 전 영상처리 기법 |
| 43 | 2021 | 학술발표 | 시기능 보정용구에 대한 해외의 온라인 판매 |
| 44 | 2021 | 학술발표 | 나이, 구면굴절도와 망막곡률반경의 상관관계 |
| 45 | 2021 | 학술발표 | 스포츠비젼에서 좌우 시각전달로의 질적 기능 연구 |
| 46 | 2021 | 학술발표 | 휘도와 주시거리가 동공반응에 미치는 영향 |
| 47 | 2021 | 학술발표 | 휘도와 주시거리가 조절랙에 미치는 영향 |
| 48 | 2021 | 학술발표 | 움직이는 사물과 정지된 사물에 대한 시각적 인지 비교 |
| 49 | 2021 | 학술발표 | 굴절성난시와 중심와난시의 상관관계 |
| 50 | 2020 | 학술발표 | 나이와 각막굴절력에 따른 동공중심의 이동량 분석 |
| 51 | 2020 | 학술발표 | 성별과 동공중심의 상관관계 분석 |
| 52 | 2020 | 학술발표 | 나이에 따른 각막 전면 형상 변화도 |
| 53 | 2020 | 학술발표 | 망막의 주경선별 곡률반경에 관한 pilot 연구 |
| 54 | 2018 | 학술발표 | Einfluss unterschiedlicher Kopfhaltung auf die Stabilisierung weicher torischen Kontaktlinsen bei kaukasischen und asiatischen Augen |
| 55 | 2017 | 학술발표 | A pilot study of alternating field device for homonymous hemianopia |
| 56 | 2016 | 학술발표 | Neural re-organisation of peripheral retina after eccentric viewing training |
| 57 | 2015 | 학술발표 | Use of shutter glasses as the rehabilitation for homonymous hemianopia |
| 58 | 2013 | 학술발표 | Spatial and temporal summation in peripheral retina |
| 59 | 2011 | 학술발표 | The association between visual function and perceived disability for near and distance tasks |

이 목록 외에 도전과제 페이지의 내부 실험, 장치, 시뮬레이션, 원본 figure는 별도 `Study/Asset Registry`로 추가한다. **또한 §3.5.1에 따라 공개 저장소 18개의 코드·엔지니어링 자산도 별도 레지스트리로 등록한다** — 현재 사이트에 문서화된 저장소는 0개이며, 이는 이 회사가 보유한 가장 강한 미활용 증거다.

즉 57건은 전체 자산 수가 아니라 현재 publications JSON에서 보장해야 하는 최소 이관 수다.

---

## 23. 결론

Optinex의 웹사이트는 “연구를 많이 한 사람의 포트폴리오”에서 멈추면 안 된다. 동시에 연구를 줄여 미래 비전만 외치는 콘셉트 사이트가 되어서도 안 된다.

가장 강한 구조는 다음과 같다.

```text
큰 질문: 시야 전체를 개인화하고 증강할 수 있는가?
    ↓
장기 시스템: Measure → Model → Augment → Learn
    ↓
실제 기반: 주변부 망막 · 대비감도 · 동공 · 시재활 · 계측 · 시제품
    ↓
증거: 논문 · 학술발표 · 직접 수행 내부 연구 · 원본 figure · prototype
    ↓
현재 요청: 기술을 가져가 구현할 제조사 · 공동검증할 연구자·임상 파트너
```

이 구조라면 기존 연구결과는 부속물이 아니라 회사의 기원과 기술적 해자를 증명한다. 그리고 아직 실현되지 않은 시각증강의 미래도 과장된 예언이 아니라, 오랜 연구 궤적에서 자연스럽게 도출되는 다음 단계로 보이게 된다.

---

## 24. 리스크 레지스터

문서 초안에 없던 절이다. 이 문서의 계획이 실패하는 경로를 명시한다.

| ID | 리스크 | 확률 | 영향 | 완화 | 소유자 | 기한 |
|---|---|---|---|---|---|---|
| R1 | **자기공지로 핵심 방법의 신규성 상실** — 2023·2024 학술발표가 KR/US 12개월 창구를 도과, EP는 애초에 구제 불가 | **높음** | **치명** — 기술이전 모델에서 팔 물건이 사라짐 | §10.0 변리사 감사 즉시 | 서재명 | 2주 내 착수 |
| R2 | 민감정보 레코드 공개 지속 | 확실(현재 노출 중) | 높음 | §16.1 P0-1 삭제 | 서재명 | 즉시 |
| R3 | **1인 버스팩터** — 핵심 인물 1인, 본업 병행 | 높음 | 치명 | 문서화 규율 유지(`ret_prof` 수준을 전 저장소로), 인수인계 가능한 형태로 축적 | 서재명 | 상시 |
| R4 | 상표 `Optinex Research` 선점당함 — 출원 2027, 선출원주의 | 중 | 중 | KIPRIS 조사 즉시 + 도메인 선확보 + 대체안 2개 | 서재명 | 1개월 |
| R5 | 자작 장비 인체 사용의 IRB·광안전 미비 | 중 | 높음 | §14.2.1 — 데이터 수집 착수 전 IRB, 광방사 노출량 근거 문서 | 서재명 | 데이터 수집 전 |
| R6 | **북극성이 잘못된 종점으로 설계됨** — 고대비 해상시력으로 측정하면 반드시 실패 | 중 | 높음 | §4.2.1 종점 고정, 선행연구(Atchison 2013) 먼저 정리 | 서재명 | 실험 설계 시 |
| R7 | 직무발명 귀속 분쟁 — 기관 시설·과제비 사용 시 | 낮음~중 | 중 | R1 감사 시 함께 확인 | 변리사 | R1과 동시 |
| R8 | 저작권 — 학회지 figure 재게재 | 낮음 | 낮음 | `redrawn_from_own_data` 기본값(§9.1.1) | 서재명 | 이미지 사용 시 |
| R9 | Track B 조기 착수로 시간 소진 | 중 | 중 | §17.2 트리거 전 착수 금지 | 서재명 | 상시 |

**R1이 단독 1순위다.** 다른 모든 항목은 R1 결과에 따라 우선순위가 바뀔 수 있다.

---

## 25. 자원 현실과 하지 않을 것

문서 초안에 없던 절이다. **명시하지 않으면 §17의 "하지 않는다"가 근거를 갖지 못한다.**

### 25.1 현재 자원 `[확정 C4·C6]`

| 항목 | 현재 상태 |
|---|---|
| 가용 자본 | **0원** |
| 핵심 인력 | **1인** (본업 별도) |
| 주당 가용 시간 | **8~12시간 추정** — 실측 후 기입 필요 |
| 파트너 | 국내외 다수, **전원 본업 병행** |
| 임상 기관 접근 | **확보됨** (병목 아님) |
| 연간 현금 지출 여력 | 도메인·호스팅 수준. **변리사 비용은 별도 조달 필요** |

### 25.2 하지 않을 것

자원 현실에서 직접 도출되는 결정이다. 각 항목은 "나중에"가 아니라 **"이 조건이 충족되기 전에는"**이다.

| 하지 않는다 | 조건 |
|---|---|
| 장비 양산·판매 | 영구 (§0.2 C5 — 출구가 IP 이전) |
| 웹사이트 전면 재구축(Track B) | §17.2 트리거 충족 전 |
| CI 파이프라인 구축 | Track B와 동시 |
| WA 접근성 인증 취득 | 수익 발생 후 |
| 월 단위 정기 리뷰 운영 | 1인 체제에서 지켜지지 않음 → 분기·반기로 |
| 환자·소비자 대상 진단 서비스 | 규제 검토 전 영구 |
| 자금·인력 규모 경쟁 | 영구 (§10.1.1 — 경쟁 축이 다름) |

### 25.3 자원을 쓸 곳 (우선순위 고정)

```text
1. §10.0 자기공지 감사 — 변리사 비용. 이 문서에서 유일하게 돈을 써야 하는 항목
2. §16.1 P0 — 시간 3~5시간
3. §1.1 상표 조사 + 도메인 — 반나절 + 연 수만 원
4. 나머지 전부 — 여유 시간에 점진적으로
```

---

## 26. 의사결정 로그

문서 초안에 없던 절이다. **이 문서에서 실제로 사고가 났던 지점이다** — 0.9 초안이 창업자의 확정 사항 5개를 무시하거나 뒤집었는데, 누가 언제 왜 그렇게 했는지 추적할 방법이 없었다.

이 절은 **append-only**다. 항목을 수정하지 않고 새 항목을 추가해 덮어쓴다.

| 일자 | ID | 결정 | 근거 | 결정자 | 뒤집은 것 |
|---|---|---|---|---|---|
| 2026-08-26 | D-001 | 목적지 = (b) 표준 초과 증강, (a)는 발판 | 인터뷰 | 서재명 | — |
| 2026-08-26 | D-002 | 북극성 = 주변부 망막 완전교정 | 인터뷰 | 서재명 | — |
| 2026-08-26 | D-003 | 1호 탐사선 = 주변부 프로그래머블 튜닝블렌즈 안경 | 인터뷰, 9개 포트폴리오 중 선택 | 서재명 | — |
| 2026-08-26 | D-004 | 비즈니스 본선 = 자작 저가 장비 + 구독 SW | 인터뷰 | 서재명 | — |
| 2026-08-27 | D-005 | **비즈니스 = 기술이전·특허 보유 중심. SaaS·앱 병행 가능성** | 창업자 검토 회신 | 서재명 | **D-004 갱신** |
| 2026-08-27 | D-006 | 가용 자본 0을 전제로 모든 계획 수립 | 창업자 검토 회신 | 서재명 | — |
| 2026-08-27 | D-007 | 웹사이트는 Track A. Track B는 수익 이후 | 창업자 검토 회신 | 서재명 | 초안 §17 8–12주 계획 폐기 |
| 2026-08-27 | D-008 | 상표 = `Optinex Research`, 출원 2027년경 | 창업자 검토 회신 | 서재명 | 초안 §1.4 브랜드 2원 구조 조정 |
| 2026-08-27 | D-009 | §22 구 24번 민감정보 레코드 삭제 | 개인정보 보호법 제23조 | 서재명 | 초안 "전량 이관" 원칙에 예외 신설 |
| 2026-08-27 | D-010 | 가상 제품명 4종(FieldScan 등) 폐기, D-003으로 대체 | 창업자 확정 사항 반영 | 서재명 | 초안 §1.4 |
| 2026-08-27 | D-011 | `digital twin`·`완전교정` 금지 → 획득 사다리로 전환 | 창업자 서사 보존 | 서재명 | 초안 §9.3 |
| 2026-08-27 | D-012 | §15 CI 파이프라인 보류 | 1인 유지 불가 | 서재명 | 초안 §15 |
| 2026-08-27 | D-013 | §18 성공지표 유지하되 `internal_only` | 창업자 검토 회신 | 서재명 | 초안 §18 |
| 2026-08-27 | D-014 | 국내 접근성 기준(KWCAG·WA)은 장기 실행 | 창업자 검토 회신 | 서재명 | — |

**기재 규칙:** `[확정]` 등급 항목을 변경할 때는 반드시 이 표에 행을 추가하고, 무엇을 뒤집었는지 명시한다.

