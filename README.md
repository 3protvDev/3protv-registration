# 3PRO TV — AI 툴 사용 현황 조사 프로토타입

## 📐 데이터 모델

한 명의 직원이 최대 6개 툴(Vrew · Cutback · Genspark · Gemini · Claude · ChatGPT)에 대해
각각 다음 필드를 응답합니다.

### 응답자 공통 필드
| 필드 | 타입 | 비고 |
|---|---|---|
| 응답자 이름 | text | 필수 |
| 소속 팀/부서 | text | 필수 |
| 이메일 | email | 필수 |
| 제출 일시 | auto | 서버측 timestamp |

### 툴별 반복 필드 (6개 × 6필드 = 36칸)
| 필드 | 타입 | 값 |
|---|---|---|
| 사용 여부 | radio | 사용중 / 사용 안 함 |
| 계정 소유 | radio | 개인 계정 / 법인 계정 |
| 결제 카드 | radio | 개인 카드 / 법인 카드 / 무료 사용 |
| 플랜명 | text | Pro, Team, Enterprise, Free 등 |
| 월 결제 금액 (원) | number | 예: 29000 |
| 비고 | text | 선택 |

## 🔗 Google Forms 연동 (No-redirect 방식)

### 원리
1. Google Forms를 &ldquo;36칸의 필드를 담는 물통&rdquo;처럼 사용 (사용자에게 노출 X)
2. HTML 폼은 form action에 Google Form의 `formResponse` URL을 지정
3. `target="hidden_iframe"`으로 응답 후 페이지 리다이렉트를 방지
4. 응답 데이터는 자동으로 Form 연결된 스프레드시트에 로우로 추가됨

### 셋업 절차 (관리자 1회)
1. **Google Form 생성**
   - 폼 이름: `3PRO TV AI 툴 현황`
   - 응답자 공통 필드 4개 + 툴별 필드를 &ldquo;단답형&rdquo;/&ldquo;객관식&rdquo;으로 생성
   - 각 툴은 별도 섹션(페이지)로 나눠도 되고, 한 페이지에 몰아도 됨

2. **entry ID 추출**
   - 생성된 Form의 &ldquo;미리 채워진 링크 가져오기&rdquo; 클릭
   - 각 필드에 임의값 입력 후 링크 복사
   - URL 안의 `entry.XXXXXXXXX=값` 부분에서 XXX가 각 필드의 ID
   - 이 ID들을 아래 HTML의 `NAME_MAP`에 그대로 붙여넣기

3. **Form URL 추출**
   - 정식 링크가 `.../viewform`이면 → `.../formResponse`로 바꿔서 사용

4. **응답 시트 연결**
   - Form &gt; 응답 탭 &gt; 스프레드시트 아이콘 클릭
   - 자동으로 연결된 시트가 생성됨
   - 컬럼 순서는 Form의 필드 순서와 동일

## 🎨 디자인 시스템

- 배경: `#000000` (순검정)
- 카드/구획: `#0A0A0A` ~ `#141414` (뉘앙스 블랙)
- 포인트: `#2E6BFF` (3PRO 로고 블루)
- 텍스트: `#FFFFFF` / `#8A8A8A` (보조)
- 폰트: Pretendard Variable
- 톤: 3PRO TV의 유튜브 채널 감성 (검정 대시보드 · 스튜디오 UI)
